// One-shot endpoint to provision the protected admin account.
// Idempotent: if the admin already exists, it updates the password and ensures the admin role.
// Auth: requires header `x-bootstrap-secret` matching SUPABASE_SERVICE_ROLE_KEY.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const ADMIN_EMAIL = "amirreza.ansari1144@gmail.com";
const ADMIN_PHONE = "+971552188004";
const ADMIN_NAME = "Amirreza Ansari";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-bootstrap-secret",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const url = Deno.env.get("SUPABASE_URL")!;
  const secret = req.headers.get("x-bootstrap-secret");
  if (secret !== serviceKey) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...cors, "Content-Type": "application/json" } });
  }

  const body = await req.json().catch(() => ({}));
  const password: string = body.password;
  if (!password || password.length < 6) {
    return new Response(JSON.stringify({ error: "password required (>=6 chars)" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
  }

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  // Find existing user by email
  const { data: list } = await admin.auth.admin.listUsers();
  const existing = list?.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);

  let userId: string;
  if (existing) {
    const { data: upd, error: e1 } = await admin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      phone: ADMIN_PHONE,
      user_metadata: { full_name: ADMIN_NAME },
    });
    if (e1) return new Response(JSON.stringify({ error: e1.message }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
    userId = upd.user!.id;
  } else {
    const { data: created, error: e2 } = await admin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password,
      phone: ADMIN_PHONE,
      email_confirm: true,
      phone_confirm: true,
      user_metadata: { full_name: ADMIN_NAME },
    });
    if (e2) return new Response(JSON.stringify({ error: e2.message }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
    userId = created.user!.id;
  }

  // Ensure profile + admin role (trigger should do it; this is a safety net)
  await admin.from("profiles").upsert(
    { user_id: userId, full_name: ADMIN_NAME, email: ADMIN_EMAIL, phone: ADMIN_PHONE },
    { onConflict: "user_id" },
  );
  await admin.from("user_roles").upsert(
    { user_id: userId, role: "admin" },
    { onConflict: "user_id,role" },
  );

  return new Response(JSON.stringify({ ok: true, user_id: userId, email: ADMIN_EMAIL }), {
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
