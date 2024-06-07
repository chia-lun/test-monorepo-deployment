import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

//ssr running on external server

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    "https://gkdwjjudoifxmgtonxlq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZHdqanVkb2lmeG1ndG9ueGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNDY1NzksImV4cCI6MjAzMjYyMjU3OX0.7K_aJvyU80D1gwPZE6VYlGVYmG3P6wpssC90ahMTtpo",
    {
      db: { schema: "public" },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  const body = [
    { contract: "" + Math.floor(100000000 + Math.random() * 900000000) },
    { contract: "" + Math.floor(100000000 + Math.random() * 900000000) },
    { contract: "" + Math.floor(100000000 + Math.random() * 900000000) },
    { contract: "" + Math.floor(100000000 + Math.random() * 900000000) },
    { contract: "" + Math.floor(100000000 + Math.random() * 900000000) },
  ];

  try {
    const { data, error } = await supabase
      .from("test_batch")
      .insert(body)
      .select();
    console.log("data:" + data + "," + "error:" + error);
    if (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  } catch (error) {
    //@ts-ignore
    return NextResponse.json({ status: 500, statusText: error.message });
  }

  return Response.json({ message: "connected to api endpoint" });
}
