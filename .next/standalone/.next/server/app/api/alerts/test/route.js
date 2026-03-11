"use strict";(()=>{var e={};e.id=8520,e.ids=[8520],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},49116:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>b,patchFetch:()=>w,requestAsyncStorage:()=>x,routeModule:()=>f,serverHooks:()=>y,staticGenerationAsyncStorage:()=>h});var i={};o.r(i),o.d(i,{POST:()=>m});var r=o(49303),a=o(88716),n=o(60670),s=o(87070),p=o(67721),l=o(37857),d=o(71615),c=o(93304),u=o(20471);let g={platform:"reddit",post_url:"https://reddit.com/r/example/comments/test",author_handle:"u/test_user",post_timestamp:new Date().toISOString(),intent_category:"vendor_switch",intent_level:"high",confidence_score:.92,pain_domain:"CRM Pricing",ai_summary:"This is a test notification from OCTOPILOT. If you see this, your alert configuration is working correctly.",suggested_opener:"Hi there! This is your OCTOPILOT test signal — your alerts are live.",urgency_tag:"urgent",crm_injected:!1,crm_task_id:null,dismissed:!1,sf_injected_at:null,sf_record_id:null,sf_record_url:null};async function m(){let e=await (0,d.cookies)(),t=(0,p.createServerClient)("https://pmhybixfrspmmspipfhi.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtaHliaXhmcnNwbW1zcGlwZmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MDUwNTQsImV4cCI6MjA4ODE4MTA1NH0.3eCxd3y6M0PNOcpTFqiPgsk3ABjttqxWAC_3ZxPBcPE",{cookies:{getAll:()=>e.getAll(),setAll:()=>{}}}),{data:{user:o}}=await t.auth.getUser();if(!o)return s.NextResponse.json({error:"Unauthorized"},{status:401});let i=(0,l.eI)("https://pmhybixfrspmmspipfhi.supabase.co",process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{autoRefreshToken:!1,persistSession:!1}}),{data:r}=await i.from("profiles").select("workspace_id, notification_prefs").eq("id",o.id).single();if(!r?.workspace_id)return s.NextResponse.json({error:"Workspace not found"},{status:404});let{data:a}=await i.from("workspaces").select("slack_webhook_url, alert_confidence_threshold").eq("id",r.workspace_id).single(),n=r.notification_prefs??{},m={email:!1,slack:!1},f=[],x={...g,id:"test-signal-id",workspace_id:r.workspace_id,tracker_id:"test-tracker-id",created_at:new Date().toISOString()};if(n.slack&&a?.slack_webhook_url)try{await (0,c.c)(a.slack_webhook_url,x),m.slack=!0}catch(e){f.push(`Slack: ${e instanceof Error?e.message:"Unknown error"}`)}if(n.email&&o.email)try{await (0,u.g4)(o.email,x),m.email=!0}catch(e){f.push(`Email: ${e instanceof Error?e.message:"Unknown error"}`)}return s.NextResponse.json({sent:m,errors:f})}let f=new r.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/alerts/test/route",pathname:"/api/alerts/test",filename:"route",bundlePath:"app/api/alerts/test/route"},resolvedPagePath:"/home/runner/workspace/src/app/api/alerts/test/route.ts",nextConfigOutput:"standalone",userland:i}),{requestAsyncStorage:x,staticGenerationAsyncStorage:h,serverHooks:y}=f,b="/api/alerts/test/route";function w(){return(0,n.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:h})}},20471:(e,t,o)=>{o.d(t,{Pi:()=>p,g4:()=>s,sI:()=>l});var i=o(82591);function r(){let e=process.env.RESEND_API_KEY;if(!e)throw Error("RESEND_API_KEY is not set");return new i.R(e)}let a=process.env.RESEND_FROM_EMAIL??"OCTOPILOT <noreply@octopilot.app>",n="http://localhost:5000";async function s(e,t){let o="high"===t.intent_level?"#ef4444":"medium"===t.intent_level?"#f59e0b":"#6b7280",i=`${n}/dashboard?signal=${t.id}`,s=`
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
      <a href="${i}" style="background:#7C3AED;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;">View Signal</a>
      <a href="${i}" style="background:rgba(255,255,255,0.05);color:#d4d4d8;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;border:1px solid rgba(255,255,255,0.1);margin-right:8px;">Push to HubSpot</a>
      <a href="${n}/dashboard?signal=${t.id}&inject_sf=${t.id}" style="background:#00A1E0;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;">Push to Salesforce</a>
    </div>

    <p style="color:#52525b;font-size:12px;margin-top:32px;">You're receiving this because you enabled email alerts in OCTOPILOT. <a href="${n}/settings/alerts" style="color:#7C3AED;">Manage alerts</a></p>
  </div>
</body>
</html>
  `.trim();await r().emails.send({from:a,to:e,subject:`🎯 New ${t.intent_level} intent signal on ${t.platform}`,html:s})}async function p(e,t){let o=`
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
    <a href="${n}/dashboard" style="background:#7C3AED;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;display:inline-block;">Go to Dashboard</a>
    <p style="color:#52525b;font-size:12px;margin-top:32px;">OCTOPILOT — Revenue Signal Intelligence for B2B Sales Teams</p>
  </div>
</body>
</html>
  `.trim();await r().emails.send({from:a,to:e,subject:"Welcome to OCTOPILOT — Your B2B signal radar is live",html:o})}async function l(e,t,o,i){let n=`
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
    <a href="${i}" style="background:#7C3AED;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;display:inline-block;">Accept Invitation</a>
    <p style="color:#52525b;font-size:12px;margin-top:32px;">If you didn't expect this invitation, you can safely ignore this email.</p>
  </div>
</body>
</html>
  `.trim();await r().emails.send({from:a,to:e,subject:`${t} invited you to ${o} on OCTOPILOT`,html:n})}},93304:(e,t,o)=>{o.d(t,{c:()=>a,x:()=>n});var i=o(20471);let r="http://localhost:5000";async function a(e,t){let o="high"===t.intent_level?"\uD83D\uDD34":"medium"===t.intent_level?"\uD83D\uDFE1":"\uD83D\uDFE2",i=`${r}/dashboard?signal=${t.id}`,a={blocks:[{type:"header",text:{type:"plain_text",text:`🎯 New ${t.intent_level.toUpperCase()} Intent Signal`,emoji:!0}},{type:"section",fields:[{type:"mrkdwn",text:`*Platform:*
${t.platform.charAt(0).toUpperCase()+t.platform.slice(1)}`},{type:"mrkdwn",text:`*Intent Level:*
${o} ${t.intent_level.toUpperCase()}`},{type:"mrkdwn",text:`*Category:*
${t.intent_category.replace("_"," ")}`},{type:"mrkdwn",text:`*Confidence:*
${Math.round(100*t.confidence_score)}%`}]},{type:"section",text:{type:"mrkdwn",text:`*AI Summary:*
${t.ai_summary}`}},...t.suggested_opener?[{type:"section",text:{type:"mrkdwn",text:`*Suggested Opener:*
_${t.suggested_opener}_`}}]:[],{type:"actions",elements:[{type:"button",text:{type:"plain_text",text:"View Signal",emoji:!0},url:i,style:"primary"},{type:"button",text:{type:"plain_text",text:"→ HubSpot",emoji:!0},url:`${r}/dashboard?signal=${t.id}&action=inject`,style:"primary"},{type:"button",text:{type:"plain_text",text:"→ Salesforce",emoji:!0},url:`${r}/dashboard?signal=${t.id}&inject_sf=${t.id}`}]},{type:"divider"}]},n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!n.ok)throw Error(`Slack webhook error: ${n.status}`)}async function n(e,t,o){if(e.confidence_score<(t.alert_confidence_threshold??.7))return;let r=t.notification_prefs,n=r?.email??!0,s=r?.slack??!1,p=[];s&&t.slack_webhook_url&&p.push(a(t.slack_webhook_url,e).catch(e=>{console.error("[OCTOPILOT] Slack alert failed:",e)})),n&&o&&p.push((0,i.g4)(o,e).catch(e=>{console.error("[OCTOPILOT] Email alert failed:",e)})),await Promise.all(p)}}};var t=require("../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),i=t.X(0,[9276,5972,7857,9702,2591],()=>o(49116));module.exports=i})();