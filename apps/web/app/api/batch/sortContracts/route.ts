import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the client with your Supabase project URL and API key
const supabase = createClient(
  "https://gkdwjjudoifxmgtonxlq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZHdqanVkb2lmeG1ndG9ueGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNDY1NzksImV4cCI6MjAzMjYyMjU3OX0.7K_aJvyU80D1gwPZE6VYlGVYmG3P6wpssC90ahMTtpo",
  { db: { schema: "public" } }
);

async function postData(dataToPost: any) {
  const { data, error } = await supabase.from("test_batch").insert(dataToPost);

  if (error) {
    console.error("Error posting data:", error);
    return;
  }

  console.log("Data posted successfully:", data);
}

const body = [
  { contract: ''+ Math.floor(100000000 + Math.random() * 900000000) },
  { contract: ''+ Math.floor(100000000 + Math.random() * 900000000) },
  { contract: ''+ Math.floor(100000000 + Math.random() * 900000000) },
  { contract: ''+ Math.floor(100000000 + Math.random() * 900000000) },
  { contract: ''+ Math.floor(100000000 + Math.random() * 900000000) },
];

console.log(body)

export async function GET(request: Request) {

  postData(body);

  return Response.json({ message: "connected to api endpoint" });
}
