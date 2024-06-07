export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received batches from supabase:", data);

    // Process the data here (e.g., validate, store in another database, etc.)

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
