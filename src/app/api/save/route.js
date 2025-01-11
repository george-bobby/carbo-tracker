import clientPromise from "../../../dbConnect";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("carbo");
    const data = await req.json();

    if (
      !data.clerkId ||
      !data.categories ||
      !data.equivalencies ||
      !data.monthlyData
    ) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await db.collection("test").findOneAndUpdate(
      { clerkId: data.clerkId },
      {
        $set: {
          categories: data.categories,
          equivalencies: data.equivalencies,
          monthlyData: data.monthlyData,
          updatedAt: new Date(data.updatedAt),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, returnDocument: "after" }
    );

    return new Response(
      JSON.stringify({
        message: "Document saved successfully",
        data: result.value,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
