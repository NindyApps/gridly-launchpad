import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, slug, plan, user_id } = await req.json();

    if (!name || !slug || !user_id) {
      return new Response(
        JSON.stringify({ error: "name, slug, and user_id are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Create workspace
    const { data: workspace, error: wsError } = await supabase
      .from("workspaces")
      .insert({ name, slug, plan: plan || "starter" })
      .select()
      .single();

    if (wsError) throw wsError;

    // Add user as owner
    const { error: memberError } = await supabase
      .from("workspace_members")
      .insert({
        workspace_id: workspace.id,
        user_id,
        role: "owner",
        accepted_at: new Date().toISOString(),
      });

    if (memberError) throw memberError;

    return new Response(
      JSON.stringify({ workspace }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
