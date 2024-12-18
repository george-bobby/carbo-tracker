"use client";

import { useState } from 'react';

const CarbonFootprintCalculator = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        transportMode: '',
        fuelEfficiency: '',
        transportDistance: '',
        electricityUsage: '',
        heatingFuel: '',
        heatingAmount: '',
        dietType: '',
        redMeatFrequency: '',
        foodWaste: '',
        wasteType: '',
        wasteAmount: '',
    });
    const [carbonFootprint, setCarbonFootprint] = useState<number | null>(null);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    // Navigation between steps
    const nextStep = (next: number) => setStep(next);

    // Carbon footprint calculation logic (unchanged from previous version)
    const calculateFootprint = () => {
    // Initialize the total carbon footprint to 0
    let footprint = 0;

    // 1. Transportation Emissions Calculation
    if (formData.transportMode && formData.fuelEfficiency && formData.transportDistance) {
        // Convert input strings to numbers
        const fuelEfficiency = parseFloat(formData.fuelEfficiency);
        const transportDistance = parseFloat(formData.transportDistance);
        
        // Initialize emission factor (CO2 produced per unit of fuel)
        let emissionFactor = 0;

        // Determine emission factor based on transport mode
        switch (formData.transportMode) {
            case 'petrol':
                emissionFactor = 2.31; // kg CO2 per liter of petrol
                break;
            case 'diesel':
                emissionFactor = 2.68; // kg CO2 per liter of diesel
                break;
            case 'electric':
                emissionFactor = 0.0; // Assuming no direct emissions from electric vehicles
                break;
            default:
                emissionFactor = 0;
        }

        // Calculate fuel consumed based on distance and efficiency
        const fuelConsumed = transportDistance / fuelEfficiency;
        
        // Calculate transportation emissions
        footprint += fuelConsumed * emissionFactor;
    }

    // 2. Electricity Emissions Calculation
    if (formData.electricityUsage) {
        const electricityUsage = parseFloat(formData.electricityUsage);
        const electricityEmissionFactor = 0.92; // kg CO2 per kWh for average grid mix
        
        // Calculate electricity-related emissions
        footprint += electricityUsage * electricityEmissionFactor;
    }

    // 3. Heating Emissions Calculation
    if (formData.heatingFuel && formData.heatingAmount) {
        const heatingAmount = parseFloat(formData.heatingAmount);
        let heatingEmissionFactor = 0;

        // Determine emission factor based on heating fuel type
        switch (formData.heatingFuel) {
            case 'natural-gas':
                heatingEmissionFactor = 2.04; // kg CO2 per unit of natural gas
                break;
            case 'oil':
                heatingEmissionFactor = 2.52; // kg CO2 per liter of heating oil
                break;
            default:
                heatingEmissionFactor = 0;
        }

        // Calculate heating-related emissions
        footprint += heatingAmount * heatingEmissionFactor;
    }

    // 4. Diet Emissions Calculation
    if (formData.dietType) {
        let dietEmissionFactor = 0;

        // Determine emission factor based on diet type
        switch (formData.dietType) {
            case 'omnivore':
                dietEmissionFactor = 2.5; // kg CO2 per person per day (average)
                break;
            case 'vegetarian':
                dietEmissionFactor = 1.5; // kg CO2 per person per day (average)
                break;
            case 'vegan':
                dietEmissionFactor = 1.0; // kg CO2 per person per day (average)
                break;
            default:
                dietEmissionFactor = 0;
        }

        // Calculate annual diet-related emissions
        footprint += dietEmissionFactor * 365;
    }

    // 5. Food Waste Emissions Calculation
    if (formData.foodWaste) {
        const foodWaste = parseFloat(formData.foodWaste);
        const foodWasteEmissionFactor = 0.85; // kg CO2 per kg of food waste
        
        // Calculate food waste-related emissions
        footprint += foodWaste * foodWasteEmissionFactor;
    }

    // 6. Waste Emissions Calculation
    if (formData.wasteType && formData.wasteAmount) {
        const wasteAmount = parseFloat(formData.wasteAmount);
        let wasteEmissionFactor = 0;

        // Determine emission factor based on waste type
        switch (formData.wasteType) {
            case 'landfill':
                wasteEmissionFactor = 0.5; // kg CO2 per kg of waste in landfill
                break;
            case 'recyclable':
                wasteEmissionFactor = 0.2; // kg CO2 per kg of recyclable waste
                break;
            default:
                wasteEmissionFactor = 0;
        }

        // Calculate waste-related emissions
        footprint += wasteAmount * wasteEmissionFactor;
    }

    // Set the calculated carbon footprint in state
    setCarbonFootprint(footprint);
};

    return (
        <div className="max-w-2xl mx-auto my-8 p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <main className="space-y-6">
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Transportation</h1>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="transportMode" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mode of Transport
                                </label>
                                <select 
                                    id="transportMode" 
                                    value={formData.transportMode} 
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="petrol">Petrol</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="electric">Electric</option>
                                </select>
                                <p className="text-xs text-gray-500 italic mt-1">
                                    Select the type of vehicle you use for commuting
                                </p>
                            </div>

                            <div>
                                <label htmlFor="fuelEfficiency" className="block text-sm font-medium text-gray-700 mb-2">
                                    Fuel Efficiency (km/l)
                                </label>
                                <input
                                    type="number"
                                    id="fuelEfficiency"
                                    value={formData.fuelEfficiency}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 15"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <p className="text-xs text-gray-500 italic mt-1">
                                    How many kilometers does your vehicle travel per liter of fuel?
                                </p>
                            </div>

                            <div>
                                <label htmlFor="transportDistance" className="block text-sm font-medium text-gray-700 mb-2">
                                    Distance Traveled (km)
                                </label>
                                <input
                                    type="number"
                                    id="transportDistance"
                                    value={formData.transportDistance}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 100"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <p className="text-xs text-gray-500 italic mt-1">
                                    Enter the average distance you travel in a day or week
                                </p>
                            </div>

                            <button 
                                onClick={() => nextStep(2)}
                                className="w-full bg-green-500 text-green py-2 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
                            Electricity and Heating
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="electricityUsage" className="block text-sm font-medium text-gray-700 mb-2">
                                    Electricity Usage (kWh)
                                </label>
                                <input
                                    type="number"
                                    id="electricityUsage"
                                    value={formData.electricityUsage}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 500"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <p className="text-xs text-gray-500 italic mt-1">
                                    Enter the total electricity you use in a month
                                </p>
                            </div>

                            <div>
                                <label htmlFor="heatingFuel" className="block text-sm font-medium text-gray-700 mb-2">
                                    Heating Fuel
                                </label>
                                <select 
                                    id="heatingFuel" 
                                    value={formData.heatingFuel} 
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="natural-gas">Natural Gas</option>
                                    <option value="oil">Oil</option>
                                    <option value="none">None</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="heatingAmount" className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount Used
                                </label>
                                <input
                                    type="number"
                                    id="heatingAmount"
                                    value={formData.heatingAmount}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 100"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <button 
                                onClick={() => nextStep(3)}
                                className="w-full bg-green-500 text-green py-2 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
                            Diet and Waste
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="dietType" className="block text-sm font-medium text-gray-700 mb-2">
                                    Diet Type
                                </label>
                                <select 
                                    id="dietType" 
                                    value={formData.dietType} 
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">Select Diet</option>
                                    <option value="omnivore">Omnivore</option>
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="foodWaste" className="block text-sm font-medium text-gray-700 mb-2">
                                    Food Waste (kg)
                                </label>
                                <input
                                    type="number"
                                    id="foodWaste"
                                    value={formData.foodWaste}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 10"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700 mb-2">
                                    Waste Type
                                </label>
                                <select 
                                    id="wasteType" 
                                    value={formData.wasteType} 
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="landfill">Landfill</option>
                                    <option value="recyclable">Recyclable</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="wasteAmount" className="block text-sm font-medium text-gray-700 mb-2">
                                    Waste Amount (kg)
                                </label>
                                <input
                                    type="number"
                                    id="wasteAmount"
                                    value={formData.wasteAmount}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 20"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <button 
                                onClick={calculateFootprint}
                                className="w-full bg-green-500 text-green py-2 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                Calculate
                            </button>
                        </div>
                    </div>
                )}

                {carbonFootprint !== null && (
                    <div className="bg-green-50 border border-green-500 rounded-lg p-6 text-center animate-slide-in">
                        <h2 className="text-xl font-bold text-green-700 mb-4">
                            Your Estimated Carbon Footprint
                        </h2>
                        <p className="text-lg font-semibold text-green-600">
                            Total Carbon Footprint: {carbonFootprint.toFixed(2)} kg CO2
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CarbonFootprintCalculator;