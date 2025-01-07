import CarbonFootprint from "../models/footprint";
import dbConnect from "../utilities/dbConnect";

const defaultData = {
  transportation: 0,
  energyUse: 0,
  foodConsumption: 0,
  wasteManagement: 0,
  waterUsage: 0,
  socialActivities: 0,
  shopping: 0,
  buildingMaintenance: 0,
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
  try {
    await dbConnect(); // Ensure database connection
    const clerkId = await middleware(req);

    if (!clerkId) return clerkId; // Handle unauthorized access

    const data = await req.json();

    if (!data || typeof data !== "object") {
      return new Response(JSON.stringify({ error: "Invalid data format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update or create a new record in the database
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
  try {
    await dbConnect(); // Ensure database connection
    const clerkId = await middleware(req);

    if (!clerkId) return clerkId; // Handle unauthorized access

    const result = await CarbonFootprint.findOne({ clerkId });

    if (!result) {
      // Return default data if no user data is found
      return new Response(
        JSON.stringify({
          data: defaultData,
          monthlyEmissions: [],
          yearlyEmissions: [],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Extract total emissions data
    const totalEmissions = result.data;

    // Calculate monthly emissions (assume even distribution for simplicity)
    const monthlyEmissions = Object.entries(totalEmissions).map(([key, value]) => ({
      category: key,
      value: value / 12, // Assuming the value is annual, divide by 12
    }));

    // Calculate yearly emissions (directly use the total values)
    const yearlyEmissions = Object.entries(totalEmissions).map(([key, value]) => ({
      category: key,
      value: value,
    }));

    return new Response(
      JSON.stringify({
        data: result.data,
        monthlyEmissions,
        yearlyEmissions,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
