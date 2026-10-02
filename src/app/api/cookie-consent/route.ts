import nodemailer from "nodemailer";

export const runtime = "nodejs";

const RECIPIENT = "marketing@sarhatenergy.com";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return Response.json({ ok: false, error: "Mail is not configured" }, { status: 503 });
  }

  let body: { choice?: unknown; preferences?: unknown; page?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const choice = body.choice === "all" ? "Allow All Cookies" : "Custom Preferences";
  const prefs =
    body.preferences && typeof body.preferences === "object"
      ? Object.entries(body.preferences as Record<string, unknown>)
      : [];
  const page = typeof body.page === "string" ? body.page.slice(0, 300) : "-";
  const ua = (request.headers.get("user-agent") ?? "-").slice(0, 300);
  const when = new Date().toISOString();

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows = [
    ["Consent", choice],
    ...prefs.map(([k, v]) => [k, v ? "Enabled" : "Disabled"]),
    ["Page", page],
    ["Browser", ua],
    ["Time (UTC)", when],
  ];

  try {
    await transporter.sendMail({
      from: SMTP_FROM ?? SMTP_USER,
      to: RECIPIENT,
      subject: `Cookie consent: ${choice}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
        .map(([k, v]) => `<tr><td><b>${esc(String(k))}</b></td><td>${esc(String(v))}</td></tr>`)
        .join("")}</table>`,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Failed to send" }, { status: 502 });
  }
}
