import CarbonFootprint from "../models/footprint";
import dbConnect from "../utils/dbConnect";

const defaultData = {
  transportation:0 ,
  energyUse:0,
  foodConsumption:0,
  wasteManagement:0,
  waterUsage:0,
  socialActivities:0,
  shopping:0,
  buildingMaintenance:0,
};

// Middleware to authenticate Clerk ID
async function middleware(req) {
  const clerkId = req.headers.get("clerk-id");
  if (!clerkId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized: Clerk ID missing" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return clerkId;
}

export async function POST(req) {
  //save data
  try {
    await dbConnect();
    const clerkId = await middleware(req);

    if (!clerkId) return clerkId; // Unauthorized response handled in middleware.

    const data = await req.json();

    if (!data || typeof data !== "object") {
      return new Response(JSON.stringify({ error: "Invalid data format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await CarbonFootprint.findOneAndUpdate(
      { clerkId },
      { data, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    return new Response(
      JSON.stringify({ message: "Data saved successfully", result }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  //fetch data
  try {
    await dbConnect();
    const clerkId = await middleware(req);

    if (!clerkId) return clerkId; // Unauthorized response handled in middleware.

    const result = await CarbonFootprint.findOne({ clerkId });

    if (!result) {
      return new Response(JSON.stringify({ data: defaultData }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
