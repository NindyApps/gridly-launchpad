import type { IntentSignal, Workspace } from '@/types/app';
import { sendSignalAlertEmail } from './email';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://octopilot.app';

export async function sendSlackAlert(webhookUrl: string, signal: IntentSignal): Promise<void> {
  const intentEmoji = signal.intent_level === 'high' ? '🔴' : signal.intent_level === 'medium' ? '🟡' : '🟢';
  const viewUrl = `${APP_URL}/dashboard?signal=${signal.id}`;

  const payload = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `🎯 New ${signal.intent_level.toUpperCase()} Intent Signal`,
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Platform:*\n${signal.platform.charAt(0).toUpperCase() + signal.platform.slice(1)}` },
          { type: 'mrkdwn', text: `*Intent Level:*\n${intentEmoji} ${signal.intent_level.toUpperCase()}` },
          { type: 'mrkdwn', text: `*Category:*\n${signal.intent_category.replace('_', ' ')}` },
          { type: 'mrkdwn', text: `*Confidence:*\n${Math.round(signal.confidence_score * 100)}%` },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*AI Summary:*\n${signal.ai_summary}`,
        },
      },
      ...(signal.suggested_opener
        ? [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Suggested Opener:*\n_${signal.suggested_opener}_`,
              },
            },
          ]
        : []),
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'View Signal', emoji: true },
            url: viewUrl,
            style: 'primary',
          },
          {
            type: 'button',
            text: { type: 'plain_text', text: 'Push to HubSpot', emoji: true },
            url: `${APP_URL}/dashboard?signal=${signal.id}&action=inject`,
          },
        ],
      },
      { type: 'divider' },
    ],
  };

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Slack webhook error: ${res.status}`);
  }
}

export async function sendAlertNotification(
  signal: IntentSignal,
  workspace: Workspace,
  userEmail?: string
): Promise<void> {
  if (signal.confidence_score < (workspace.alert_confidence_threshold ?? 0.7)) {
    return;
  }

  const prefs = (workspace as unknown as { notification_prefs?: { email?: boolean; slack?: boolean } }).notification_prefs;
  const emailEnabled = prefs?.email ?? true;
  const slackEnabled = prefs?.slack ?? false;

  const tasks: Promise<void>[] = [];

  if (slackEnabled && workspace.slack_webhook_url) {
    tasks.push(
      sendSlackAlert(workspace.slack_webhook_url, signal).catch((err) => {
        console.error('[OCTOPILOT] Slack alert failed:', err);
      })
    );
  }

  if (emailEnabled && userEmail) {
    tasks.push(
      sendSignalAlertEmail(userEmail, signal).catch((err) => {
        console.error('[OCTOPILOT] Email alert failed:', err);
      })
    );
  }

  await Promise.all(tasks);
}
