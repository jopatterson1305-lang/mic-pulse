import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const schema = z.object({ email: z.string().email().transform(value => value.toLowerCase().trim()) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  const supabase = await createServerSupabaseClient();
  if (!supabase) return NextResponse.json({ error: "Newsletter service is not configured." }, { status: 503 });
  const { error } = await supabase.from("newsletter_subscribers").insert({ email: parsed.data.email });
  if (error && error.code !== "23505") return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, duplicate: error?.code === "23505" });
}
