export interface Env {
  RESEND_API_KEY: string;
  TO_EMAIL: string;
  FROM_EMAIL: string;
  ALLOWED_ORIGIN: string;
}

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

    // Honeypot — silently succeed so bots don't retry.
    if (payload.botcheck) {
      return json({ success: true }, 200, corsHeaders);
    }

    const name = str(payload.name);
    const email = str(payload.email);
    const project = str(payload.project);
    const budget = str(payload.budget);
    const timeline = str(payload.timeline);
    const utm_source = str(payload.utm_source);

    if (!name || !email || !project) {
      return json({ success: false, error: 'missing required fields' }, 400, corsHeaders);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ success: false, error: 'invalid email' }, 400, corsHeaders);
    }
    if (project.length < 20) {
      return json({ success: false, error: 'project description too short' }, 400, corsHeaders);
    }
    if (name.length > 200 || email.length > 320 || project.length > 5000) {
      return json({ success: false, error: 'field too long' }, 400, corsHeaders);
    }

    const subject = `New project enquiry — ${name}`;

    const lines: string[] = [
      `Name: ${name}`,
      `Email: ${email}`,
    ];
    if (budget) lines.push(`Budget: ${budget}`);
    if (timeline) lines.push(`Timeline: ${timeline}`);
    if (utm_source) lines.push(`UTM source: ${utm_source}`);
    lines.push('', 'Project:', project);
    const text = lines.join('\n');

    const html = `<div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6">
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      ${budget ? `<p><strong>Budget:</strong> ${esc(budget)}</p>` : ''}
      ${timeline ? `<p><strong>Timeline:</strong> ${esc(timeline)}</p>` : ''}
      ${utm_source ? `<p><strong>UTM source:</strong> ${esc(utm_source)}</p>` : ''}
      <hr style="border:none;border-top:1px solid #ddd;margin:1.25rem 0">
      <p><strong>Project:</strong></p>
      <p style="white-space: pre-wrap">${esc(project)}</p>
    </div>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: env.TO_EMAIL,
        reply_to: email,
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
