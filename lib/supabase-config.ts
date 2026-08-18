export type SupabaseConfig = {
  url: string;
  key: string;
};

function clean(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!rawUrl || !key) return null;

  const input = clean(rawUrl).replace(/\/+$/, "");
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must be an absolute Supabase project API URL, for example https://your-project.supabase.co");
  }

  if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must use HTTPS in production");
  }

  if (parsed.hostname === "supabase.com" || parsed.hostname.endsWith(".supabase.com") || parsed.pathname.includes("/dashboard/")) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must be the project API URL, not a Supabase dashboard URL");
  }

  if (parsed.pathname && parsed.pathname !== "/") {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must contain only the project API origin, without /auth/v1, /rest/v1, or another API path");
  }

  return { url: parsed.origin, key: clean(key) };
}
