const mongoose = require("mongoose");

// Define CarbonFootprint Schema
const OverallSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Unique Clerk user ID
  categories: {
    transportation: { type: Number, default: 0 },
    energyUse: { type: Number, default: 0 },
    foodConsumption: { type: Number, default: 0 },
    wasteManagement: { type: Number, default: 0 },
    waterUsage: { type: Number, default: 0 },
    socialActivities: { type: Number, default: 0 },
    shopping: { type: Number, default: 0 },
    buildingMaintenance: { type: Number, default: 0 },
  },
  equivalencies: {
    phonesCharged: { type: Number, default: 0 },
    treesPlanted: { type: Number, default: 0 },
    distanceDriven: { type: Number, default: 0 },
    gallonsGasoline: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model("OverallSchema", OverallSchema);
