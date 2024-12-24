const express = require('express');
const CarbonFootprint = require('../models/carbonFootprint');

const router = express.Router();

// Middleware to authenticate using Clerk
router.use((req, res, next) => {
    const clerkId = req.headers['clerk-id'];
    if (!clerkId) return res.status(401).send("Unauthorized: Clerk ID missing");
    req.clerkId = clerkId;
    next();
});

// Create or Update Carbon Footprint Data
router.post('/save', async (req, res) => {
    try {
        const { clerkId } = req;
        const data = req.body;

        const result = await CarbonFootprint.findOneAndUpdate(
            { clerkId },
            { data, updatedAt: new Date() },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "Data saved successfully", result });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get Carbon Footprint Data for the Authenticated User
router.get('/fetch', async (req, res) => {
    try {
        const { clerkId } = req;

        const result = await CarbonFootprint.findOne({ clerkId });
        if (!result) {
            return res.status(200).json({ 
                data: { // Default data structure
                    transportation: { carMiles: 0, flightHours: 0, publicTransport: 0 },
                    energyUse: { electricityUsage: 0, gasHeating: 0, waterHeating: 0 },
                    foodConsumption: { meatMeals: 0, vegetarianMeals: 0, foodWaste: 0 },
                    wasteManagement: { landfillWaste: 0, recycledPounds: 0, composting: 0 },
                    waterUsage: { showerTime: 0, laundryLoads: 0, dishwashing: 0 },
                    socialActivities: { streamingHours: 0, restaurantVisits: 0, concertsEvents: 0 },
                    shopping: { onlineOrders: 0, inStorePurchases: 0, packagingWaste: 0 },
                    buildingMaintenance: { renovationsProjects: 0, applianceReplacements: 0, energyEfficiency: 0 },
                }
            });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
