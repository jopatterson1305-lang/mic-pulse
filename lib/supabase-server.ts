import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./supabase-config";

export async function createServerSupabaseClient() {
  const config = getSupabaseConfig();
  if (!config) return null;
  const cookieStore = await cookies();
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(values) {
        try {
          values.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server components may not be able to mutate cookies during rendering.
        }
      },
    },
  });
}
