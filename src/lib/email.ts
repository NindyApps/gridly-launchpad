import { Resend } from 'resend';
import type { IntentSignal } from '@/types/app';

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');
  return new Resend(apiKey);
}

const FROM = process.env.RESEND_FROM_EMAIL ?? 'OCTOPILOT <noreply@octopilot.app>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://octopilot.app';

export async function sendSignalAlertEmail(to: string, signal: IntentSignal): Promise<void> {
  const intentColor = signal.intent_level === 'high' ? '#ef4444' : signal.intent_level === 'medium' ? '#f59e0b' : '#6b7280';
  const viewUrl = `${APP_URL}/dashboard?signal=${signal.id}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="background:#0B0D0F;color:#e4e4e7;font-family:system-ui,sans-serif;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;">
    <div style="margin-bottom:24px;">
      <span style="background:#7C3AED;color:#fff;font-weight:700;font-size:13px;padding:4px 12px;border-radius:6px;letter-spacing:0.05em;">OCTOPILOT</span>
    </div>
    <h1 style="font-size:20px;font-weight:700;margin:0 0 8px;">New High-Intent Signal Detected</h1>
    <p style="color:#a1a1aa;margin:0 0 24px;font-size:14px;">A new buying signal matching your tracker was found.</p>

    <div style="background:#11151A;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;margin-bottom:16px;">
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
        <span style="background:rgba(124,58,237,0.15);color:#a78bfa;font-size:12px;padding:3px 10px;border-radius:20px;border:1px solid rgba(124,58,237,0.3);">${signal.platform.toUpperCase()}</span>
        <span style="background:rgba(255,255,255,0.05);color:${intentColor};font-size:12px;padding:3px 10px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);">${signal.intent_level.toUpperCase()} INTENT</span>
        <span style="background:rgba(255,255,255,0.05);color:#a1a1aa;font-size:12px;padding:3px 10px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);">Confidence: ${Math.round(signal.confidence_score * 100)}%</span>
      </div>

      <p style="font-size:14px;color:#d4d4d8;margin:0 0 12px;line-height:1.6;"><strong style="color:#fff;">AI Summary:</strong><br>${signal.ai_summary}</p>

      ${signal.suggested_opener ? `<div style="background:rgba(124,58,237,0.08);border-left:3px solid #7C3AED;padding:10px 14px;border-radius:0 6px 6px 0;margin-top:12px;">
        <p style="font-size:12px;color:#a1a1aa;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Suggested Opener</p>
        <p style="font-size:13px;color:#d4d4d8;margin:0;line-height:1.5;">${signal.suggested_opener}</p>
      </div>` : ''}
    </div>

    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <a href="${viewUrl}" style="background:#7C3AED;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;">View Signal</a>
      <a href="${viewUrl}" style="background:rgba(255,255,255,0.05);color:#d4d4d8;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;border:1px solid rgba(255,255,255,0.1);margin-right:8px;">Push to HubSpot</a>
      <a href="${APP_URL}/dashboard?signal=${signal.id}&inject_sf=${signal.id}" style="background:#00A1E0;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;">Push to Salesforce</a>
    </div>

    <p style="color:#52525b;font-size:12px;margin-top:32px;">You're receiving this because you enabled email alerts in OCTOPILOT. <a href="${APP_URL}/settings/alerts" style="color:#7C3AED;">Manage alerts</a></p>
  </div>
</body>
</html>
  `.trim();

  await getResend().emails.send({
    from: FROM,
    to,
    subject: `🎯 New ${signal.intent_level} intent signal on ${signal.platform}`,
    html,
  });
}

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="background:#0B0D0F;color:#e4e4e7;font-family:system-ui,sans-serif;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;">
    <div style="margin-bottom:24px;">
      <span style="background:#7C3AED;color:#fff;font-weight:700;font-size:13px;padding:4px 12px;border-radius:6px;letter-spacing:0.05em;">OCTOPILOT</span>
    </div>
    <h1 style="font-size:22px;font-weight:700;margin:0 0 8px;">Welcome to OCTOPILOT${name ? `, ${name}` : ''}!</h1>
    <p style="color:#a1a1aa;font-size:15px;line-height:1.6;margin:0 0 20px;">
      You're now set up to capture real-time B2B buying signals from Reddit and Hacker News — before your competitors even know they exist.
    </p>
    <p style="color:#d4d4d8;font-size:14px;line-height:1.6;margin:0 0 24px;">
      <strong>What to do next:</strong><br>
      1. Set up your first tracker with keywords and competitors to monitor<br>
      2. Connect your HubSpot CRM to auto-inject signals<br>
      3. Configure your alert thresholds so you only get notified on high-confidence signals
    </p>
    <a href="${APP_URL}/dashboard" style="background:#7C3AED;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;display:inline-block;">Go to Dashboard</a>
    <p style="color:#52525b;font-size:12px;margin-top:32px;">OCTOPILOT — Revenue Signal Intelligence for B2B Sales Teams</p>
  </div>
</body>
</html>
  `.trim();

  await getResend().emails.send({
    from: FROM,
    to,
    subject: 'Welcome to OCTOPILOT — Your B2B signal radar is live',
    html,
  });
}

export async function sendInviteEmail(
  to: string,
  inviterName: string,
  workspaceName: string,
  inviteUrl: string
): Promise<void> {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="background:#0B0D0F;color:#e4e4e7;font-family:system-ui,sans-serif;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;">
    <div style="margin-bottom:24px;">
      <span style="background:#7C3AED;color:#fff;font-weight:700;font-size:13px;padding:4px 12px;border-radius:6px;letter-spacing:0.05em;">OCTOPILOT</span>
    </div>
    <h1 style="font-size:20px;font-weight:700;margin:0 0 8px;">You've been invited to join ${workspaceName}</h1>
    <p style="color:#a1a1aa;font-size:15px;line-height:1.6;margin:0 0 20px;">
      <strong style="color:#d4d4d8;">${inviterName}</strong> has invited you to collaborate on OCTOPILOT — a real-time B2B revenue signal intelligence platform.
    </p>
    <a href="${inviteUrl}" style="background:#7C3AED;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;display:inline-block;">Accept Invitation</a>
    <p style="color:#52525b;font-size:12px;margin-top:32px;">If you didn't expect this invitation, you can safely ignore this email.</p>
  </div>
</body>
</html>
  `.trim();

  await getResend().emails.send({
    from: FROM,
    to,
    subject: `${inviterName} invited you to ${workspaceName} on OCTOPILOT`,
    html,
  });
}
