"use strict";(()=>{var e={};e.id=6892,e.ids=[6892],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},72103:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>h,patchFetch:()=>y,requestAsyncStorage:()=>m,routeModule:()=>u,serverHooks:()=>f,staticGenerationAsyncStorage:()=>x});var i={};o.r(i),o.d(i,{POST:()=>g});var a=o(49303),r=o(88716),n=o(60670),s=o(87070),p=o(67721),d=o(37857),l=o(71615),c=o(20471);async function g(e){let{email:t,role:o,workspace_id:i}=await e.json();if(!t||!o||!i)return s.NextResponse.json({error:"email, role, and workspace_id are required"},{status:400});let a=await (0,l.cookies)(),r=(0,p.createServerClient)("https://pmhybixfrspmmspipfhi.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtaHliaXhmcnNwbW1zcGlwZmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MDUwNTQsImV4cCI6MjA4ODE4MTA1NH0.3eCxd3y6M0PNOcpTFqiPgsk3ABjttqxWAC_3ZxPBcPE",{cookies:{getAll:()=>a.getAll(),setAll:()=>{}}}),{data:{user:n}}=await r.auth.getUser();if(!n)return s.NextResponse.json({error:"Unauthorized"},{status:401});let{data:g}=await r.from("profiles").select("role, workspace_id, full_name").eq("id",n.id).single();if(!g||g.workspace_id!==i||"admin"!==g.role)return s.NextResponse.json({error:"Only workspace admins can invite members"},{status:403});let u=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!u)return s.NextResponse.json({error:"Service role key not configured"},{status:500});let m=(0,d.eI)("https://pmhybixfrspmmspipfhi.supabase.co",u,{auth:{autoRefreshToken:!1,persistSession:!1}}),x="http://localhost:5000",{data:f,error:h}=await m.auth.admin.inviteUserByEmail(t,{data:{workspace_id:i,role:o},redirectTo:`${x}/accept-invite`});if(h)return s.NextResponse.json({error:h.message},{status:400});let{data:y}=await m.from("workspaces").select("name").eq("id",i).single(),b=g.full_name??n.email??"A teammate",v=y?.name??"your workspace",w=`${x}/accept-invite`;return(0,c.sI)(t,b,v,w).catch(e=>{console.error("[OCTOPILOT] Invite email failed:",e)}),s.NextResponse.json({success:!0,user_id:f.user.id})}let u=new a.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/team/invite/route",pathname:"/api/team/invite",filename:"route",bundlePath:"app/api/team/invite/route"},resolvedPagePath:"/home/runner/workspace/src/app/api/team/invite/route.ts",nextConfigOutput:"standalone",userland:i}),{requestAsyncStorage:m,staticGenerationAsyncStorage:x,serverHooks:f}=u,h="/api/team/invite/route";function y(){return(0,n.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:x})}},20471:(e,t,o)=>{o.d(t,{Pi:()=>p,g4:()=>s,sI:()=>d});var i=o(82591);function a(){let e=process.env.RESEND_API_KEY;if(!e)throw Error("RESEND_API_KEY is not set");return new i.R(e)}let r=process.env.RESEND_FROM_EMAIL??"OCTOPILOT <noreply@octopilot.app>",n="http://localhost:5000";async function s(e,t){let o="high"===t.intent_level?"#ef4444":"medium"===t.intent_level?"#f59e0b":"#6b7280",i=`${n}/dashboard?signal=${t.id}`,s=`
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
  `.trim();await a().emails.send({from:r,to:e,subject:`🎯 New ${t.intent_level} intent signal on ${t.platform}`,html:s})}async function p(e,t){let o=`
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
  `.trim();await a().emails.send({from:r,to:e,subject:"Welcome to OCTOPILOT — Your B2B signal radar is live",html:o})}async function d(e,t,o,i){let n=`
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
  `.trim();await a().emails.send({from:r,to:e,subject:`${t} invited you to ${o} on OCTOPILOT`,html:n})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),i=t.X(0,[9276,5972,7857,9702,2591],()=>o(72103));module.exports=i})();