"use strict";(()=>{var e={};e.id=7936,e.ids=[7936],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},33231:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>m,patchFetch:()=>h,requestAsyncStorage:()=>x,routeModule:()=>g,serverHooks:()=>f,staticGenerationAsyncStorage:()=>u});var a={};o.r(a),o.d(a,{GET:()=>c});var i=o(49303),n=o(88716),r=o(60670),s=o(67721),p=o(71615),d=o(87070),l=o(20471);async function c(e){let{searchParams:t,origin:o}=new URL(e.url),a=t.get("code"),i=t.get("type");if(a){let e=await (0,p.cookies)(),t=(0,s.createServerClient)("https://pmhybixfrspmmspipfhi.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtaHliaXhmcnNwbW1zcGlwZmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MDUwNTQsImV4cCI6MjA4ODE4MTA1NH0.3eCxd3y6M0PNOcpTFqiPgsk3ABjttqxWAC_3ZxPBcPE",{cookies:{getAll:()=>e.getAll(),setAll:t=>{t.forEach(({name:t,value:o,options:a})=>e.set(t,o,a))}}}),{data:n,error:r}=await t.auth.exchangeCodeForSession(a);if(!r&&n.session){if("recovery"===i)return d.NextResponse.redirect(`${o}/auth/reset-password`);let{data:e}=await t.from("profiles").select("onboarding_completed, onboarding_step, full_name").eq("id",n.session.user.id).single();!e?.onboarding_completed&&(e?.onboarding_step??0)===0&&n.session.user.email&&(0,l.Pi)(n.session.user.email,e?.full_name??"").catch(e=>{console.error("[OCTOPILOT] Welcome email failed:",e)});let a=e?.onboarding_completed?"/dashboard":"/onboarding";return d.NextResponse.redirect(`${o}${a}`)}}return d.NextResponse.redirect(`${o}/login?error=auth_callback_failed`)}let g=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/auth/callback/route",pathname:"/auth/callback",filename:"route",bundlePath:"app/auth/callback/route"},resolvedPagePath:"/home/runner/workspace/src/app/auth/callback/route.ts",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:x,staticGenerationAsyncStorage:u,serverHooks:f}=g,m="/auth/callback/route";function h(){return(0,r.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:u})}},20471:(e,t,o)=>{o.d(t,{Pi:()=>p,g4:()=>s,sI:()=>d});var a=o(82591);function i(){let e=process.env.RESEND_API_KEY;if(!e)throw Error("RESEND_API_KEY is not set");return new a.R(e)}let n=process.env.RESEND_FROM_EMAIL??"OCTOPILOT <noreply@octopilot.app>",r="http://localhost:5000";async function s(e,t){let o="high"===t.intent_level?"#ef4444":"medium"===t.intent_level?"#f59e0b":"#6b7280",a=`${r}/dashboard?signal=${t.id}`,s=`
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
        <span style="background:rgba(124,58,237,0.15);color:#a78bfa;font-size:12px;padding:3px 10px;border-radius:20px;border:1px solid rgba(124,58,237,0.3);">${t.platform.toUpperCase()}</span>
        <span style="background:rgba(255,255,255,0.05);color:${o};font-size:12px;padding:3px 10px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);">${t.intent_level.toUpperCase()} INTENT</span>
        <span style="background:rgba(255,255,255,0.05);color:#a1a1aa;font-size:12px;padding:3px 10px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);">Confidence: ${Math.round(100*t.confidence_score)}%</span>
      </div>

      <p style="font-size:14px;color:#d4d4d8;margin:0 0 12px;line-height:1.6;"><strong style="color:#fff;">AI Summary:</strong><br>${t.ai_summary}</p>

      ${t.suggested_opener?`<div style="background:rgba(124,58,237,0.08);border-left:3px solid #7C3AED;padding:10px 14px;border-radius:0 6px 6px 0;margin-top:12px;">
        <p style="font-size:12px;color:#a1a1aa;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Suggested Opener</p>
        <p style="font-size:13px;color:#d4d4d8;margin:0;line-height:1.5;">${t.suggested_opener}</p>
      </div>`:""}
    </div>

    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <a href="${a}" style="background:#7C3AED;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;">View Signal</a>
      <a href="${a}" style="background:rgba(255,255,255,0.05);color:#d4d4d8;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;border:1px solid rgba(255,255,255,0.1);margin-right:8px;">Push to HubSpot</a>
      <a href="${r}/dashboard?signal=${t.id}&inject_sf=${t.id}" style="background:#00A1E0;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;">Push to Salesforce</a>
    </div>

    <p style="color:#52525b;font-size:12px;margin-top:32px;">You're receiving this because you enabled email alerts in OCTOPILOT. <a href="${r}/settings/alerts" style="color:#7C3AED;">Manage alerts</a></p>
  </div>
</body>
</html>
  `.trim();await i().emails.send({from:n,to:e,subject:`🎯 New ${t.intent_level} intent signal on ${t.platform}`,html:s})}async function p(e,t){let o=`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="background:#0B0D0F;color:#e4e4e7;font-family:system-ui,sans-serif;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;">
    <div style="margin-bottom:24px;">
      <span style="background:#7C3AED;color:#fff;font-weight:700;font-size:13px;padding:4px 12px;border-radius:6px;letter-spacing:0.05em;">OCTOPILOT</span>
    </div>
    <h1 style="font-size:22px;font-weight:700;margin:0 0 8px;">Welcome to OCTOPILOT${t?`, ${t}`:""}!</h1>
    <p style="color:#a1a1aa;font-size:15px;line-height:1.6;margin:0 0 20px;">
      You're now set up to capture real-time B2B buying signals from Reddit and Hacker News — before your competitors even know they exist.
    </p>
    <p style="color:#d4d4d8;font-size:14px;line-height:1.6;margin:0 0 24px;">
      <strong>What to do next:</strong><br>
      1. Set up your first tracker with keywords and competitors to monitor<br>
      2. Connect your HubSpot CRM to auto-inject signals<br>
      3. Configure your alert thresholds so you only get notified on high-confidence signals
    </p>
    <a href="${r}/dashboard" style="background:#7C3AED;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;display:inline-block;">Go to Dashboard</a>
    <p style="color:#52525b;font-size:12px;margin-top:32px;">OCTOPILOT — Revenue Signal Intelligence for B2B Sales Teams</p>
  </div>
</body>
</html>
  `.trim();await i().emails.send({from:n,to:e,subject:"Welcome to OCTOPILOT — Your B2B signal radar is live",html:o})}async function d(e,t,o,a){let r=`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="background:#0B0D0F;color:#e4e4e7;font-family:system-ui,sans-serif;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;">
    <div style="margin-bottom:24px;">
      <span style="background:#7C3AED;color:#fff;font-weight:700;font-size:13px;padding:4px 12px;border-radius:6px;letter-spacing:0.05em;">OCTOPILOT</span>
    </div>
    <h1 style="font-size:20px;font-weight:700;margin:0 0 8px;">You've been invited to join ${o}</h1>
    <p style="color:#a1a1aa;font-size:15px;line-height:1.6;margin:0 0 20px;">
      <strong style="color:#d4d4d8;">${t}</strong> has invited you to collaborate on OCTOPILOT — a real-time B2B revenue signal intelligence platform.
    </p>
    <a href="${a}" style="background:#7C3AED;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;display:inline-block;">Accept Invitation</a>
    <p style="color:#52525b;font-size:12px;margin-top:32px;">If you didn't expect this invitation, you can safely ignore this email.</p>
  </div>
</body>
</html>
  `.trim();await i().emails.send({from:n,to:e,subject:`${t} invited you to ${o} on OCTOPILOT`,html:r})}}};var t=require("../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),a=t.X(0,[9276,5972,7857,9702,2591],()=>o(33231));module.exports=a})();