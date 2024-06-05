import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

console.log("access");
// POST handler
// export async function POST(request: NextRequest) {
//   const body = {
//     contractBatch: [
//       "test-contract-1",
//       "test-contract-2",
//       "test-contract-3",
//       "test-contract-4",
//       "test-contract-5",
//     ],
//   };

//   // Make the fetch call
//   const res = await fetch(`sortContracts`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   const data = await res.json();
//   console.log(data, "Response Data");
//   return Response.json(data);
// }

export async function GET(request: Request) {
  const body = {
    contractBatch: [
      "test-contract-1",
      "test-contract-2",
      "test-contract-3",
      "test-contract-4",
      "test-contract-5",
    ],
  };

  const res = await fetch(`https://webhook.site/141f17ba-7ca7-4733-b3f7-680f92231b9f`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  console.log("arrive here");
  return Response.json({ message: "connected to api endpoint", data: data});
}
