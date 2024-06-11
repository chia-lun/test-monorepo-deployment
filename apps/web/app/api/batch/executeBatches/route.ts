import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies, headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received batches from supabase:", data);

    const updatedData = { ...data, status: 'failed', retry_counter: data.retry_counter + 1 };

    // 
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

    // Update the data in Supabase
    const { data: updatedResponse, error } = await supabase
      .from('your-table-name')
      .update({ status: 'complete', retry_counter: data.retry_counter + 1 })
      .match({ id: data.id });

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Data received successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    //@ts-ignore
    return new Response(
      JSON.stringify({
        message: "Failed to process data",
        //@ts-ignore
        error: error.message,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
