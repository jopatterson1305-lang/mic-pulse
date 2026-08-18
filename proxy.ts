import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase-config";

export async function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const config = getSupabaseConfig();
  if (!config) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values) {
        values.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response = NextResponse.next({ request });
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
