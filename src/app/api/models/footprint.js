const mongoose = require("mongoose");

// Define CarbonFootprint Schema
const CarbonFootprintSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true }, // Unique Clerk user ID
    data: {
        transportation: {
            carMiles: { type: Number, default: 0 },
            flightHours: { type: Number, default: 0 },
            publicTransport: { type: Number, default: 0 },
        },
        energyUse: {
            electricityUsage: { type: Number, default: 0 },
            gasHeating: { type: Number, default: 0 },
            waterHeating: { type: Number, default: 0 },
        },
        foodConsumption: {
            meatMeals: { type: Number, default: 0 },
            vegetarianMeals: { type: Number, default: 0 },
            foodWaste: { type: Number, default: 0 },
        },
        wasteManagement: {
            landfillWaste: { type: Number, default: 0 },
            recycledPounds: { type: Number, default: 0 },
            composting: { type: Number, default: 0 },
        },
        waterUsage: {
            showerTime: { type: Number, default: 0 },
            laundryLoads: { type: Number, default: 0 },
            dishwashing: { type: Number, default: 0 },
        },
        socialActivities: {
            streamingHours: { type: Number, default: 0 },
            restaurantVisits: { type: Number, default: 0 },
            concertsEvents: { type: Number, default: 0 },
        },
        shopping: {
            onlineOrders: { type: Number, default: 0 },
            inStorePurchases: { type: Number, default: 0 },
            packagingWaste: { type: Number, default: 0 },
        },
        buildingMaintenance: {
            renovationsProjects: { type: Number, default: 0 },
            applianceReplacements: { type: Number, default: 0 },
            energyEfficiency: { type: Number, default: 0 },
        },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model("CarbonFootprint", CarbonFootprintSchema);
