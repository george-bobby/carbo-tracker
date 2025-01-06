import CarbonFootprint from "../models/footprint";
import dbConnect from "../utils/dbConnect";

const defaultData = {
  transportation: { carMiles: 0, flightHours: 0, publicTransport: 0 },
  energyUse: { electricityUsage: 0, gasHeating: 0, waterHeating: 0 },
  foodConsumption: { meatMeals: 0, vegetarianMeals: 0, foodWaste: 0 },
  wasteManagement: { landfillWaste: 0, recycledPounds: 0, composting: 0 },
  waterUsage: { showerTime: 0, laundryLoads: 0, dishwashing: 0 },
  socialActivities: {
    streamingHours: 0,
    restaurantVisits: 0,
    concertsEvents: 0,
  },
  shopping: { onlineOrders: 0, inStorePurchases: 0, packagingWaste: 0 },
  buildingMaintenance: {
    renovationsProjects: 0,
    applianceReplacements: 0,
    energyEfficiency: 0,
  },
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
