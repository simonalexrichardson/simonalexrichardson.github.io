export interface Env {
  RESEND_API_KEY: string;
  TO_EMAIL: string;
  FROM_EMAIL: string;
  ALLOWED_ORIGIN: string;
  /** Only set when testing locally against a stub. */
  RESEND_API_BASE?: string;
}

const LIMITS: Record<string, number> = {
  name: 200,
  email: 320,
  business: 200,
  website: 500,
  message: 5000,
  utm_source: 200,
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return json({ success: false, error: 'method not allowed' }, 405, corsHeaders);
    }

    const origin = request.headers.get('Origin') ?? '';
    if (origin !== env.ALLOWED_ORIGIN) {
      return json({ success: false, error: 'forbidden' }, 403, corsHeaders);
    }

    let payload: Record<string, FormDataEntryValue>;
    try {
      const formData = await request.formData();
      payload = Object.fromEntries(formData.entries());
    } catch {
      return json({ success: false, error: 'invalid form data' }, 400, corsHeaders);
    }

    // Honeypot: silently succeed so bots don't retry.
    if (payload.botcheck) {
      return json({ success: true }, 200, corsHeaders);
    }

    const fields = {
      name: str(payload.name),
      email: str(payload.email),
      business: str(payload.business),
      website: str(payload.website),
      // `project` is what the previous contact form sent. Keeping it means the Worker can be
      // deployed before the new site without breaking the form that's live at that moment.
      message: str(payload.message) || str(payload.project),
      utm_source: str(payload.utm_source),
    };

    if (!fields.name || !fields.email || !fields.message) {
      return json({ success: false, error: 'missing required fields' }, 400, corsHeaders);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      return json({ success: false, error: 'invalid email' }, 400, corsHeaders);
    }
    for (const [key, value] of Object.entries(fields)) {
      if (value.length > LIMITS[key]) {
        return json({ success: false, error: 'field too long' }, 400, corsHeaders);
      }
    }

    const oneLineName = fields.name.replace(/\s+/g, ' ');
    // A website on the enquiry means they want the free review too, so make it easy to spot.
    const subject = fields.website ? `New enquiry, with a site to review: ${oneLineName}` : `New enquiry: ${oneLineName}`;

    const rows: [string, string][] = [
      ['Name', fields.name],
      ['Email', fields.email],
      ['Business', fields.business],
      ['Website', fields.website],
      ['UTM source', fields.utm_source],
    ];
    const present = rows.filter(([, value]) => value);

    const text = [...present.map(([k, v]) => `${k}: ${v}`), '', 'Message:', fields.message].join('\n');
    const html = `<div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6">
      ${present.map(([k, v]) => `<p><strong>${k}:</strong> ${esc(v)}</p>`).join('\n')}
      <hr style="border:none;border-top:1px solid #ddd;margin:1.25rem 0">
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap">${esc(fields.message)}</p>
    </div>`;

    const res = await fetch(`${env.RESEND_API_BASE ?? 'https://api.resend.com'}/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: env.TO_EMAIL,
        reply_to: fields.email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('Resend error:', res.status, errBody);
      return json({ success: false, error: 'send failed' }, 502, corsHeaders);
    }

    return json({ success: true }, 200, corsHeaders);
  },
};

function str(v: FormDataEntryValue | undefined): string {
  return typeof v === 'string' ? v.trim() : '';
}

function json(body: unknown, status: number, extraHeaders: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...extraHeaders, 'Content-Type': 'application/json' },
  });
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
