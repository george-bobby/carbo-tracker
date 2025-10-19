import {
	Car,
	Home,
	Sandwich,
	ShoppingBag,
	Droplet,
	Users,
	Package,
	Building,
	Heart,
	Info,
	TreeDeciduous,
	Flame,
	Lightbulb,
	Bot,
	Monitor,
	Cloud,
	Smartphone,
	Database,
	Zap,
	Leaf,
	Recycle,
	Sun,
	Video,
	ShoppingCart,
	Award,
} from 'lucide-react';

// EPA and IPCC-based conversion factors
const categories = [
	{
		id: 'transportation',
		title: 'Transportation',
		icon: Car,
		info: 'Based on EPA emissions standards for average vehicle efficiency',
		questions: [
			{
				id: 'carMiles',
				label: 'Distance driven by car per week (KM)',
				factor: 0.4,
				source: 'EPA 2024: 400g CO2 per mile (0.4 kg/mile)',
			}, // kg CO2 per mile
			{
				id: 'flightHours',
				label: 'Hours of flight travel per year',
				factor: 250,
				source: 'ICAO 2024: ~250 kg CO2 per passenger per hour',
			}, // kg CO2 per hour
			{
				id: 'publicTransport',
				label: 'Public transport trips per week',
				factor: 2.61,
				source: 'European Environment Agency',
			}, // kg CO2 per trip
			{
				id: 'evCharging',
				label: 'Electric vehicle charging sessions per week',
				factor: -2.0,
				source: 'Clean energy offset study',
			}, // negative factor for cleaner alternative
		],
	},

	{
		id: 'energyUse',
		title: 'Energy Use',
		icon: Flame,
		info: 'Based on national averages for energy consumption and production sources',
		questions: [
			{
				id: 'electricityUsage',
				label: 'kWh of electricity used per month',
				factor: 0.367,
				source: 'EIA 2023: 0.81 lbs CO2/kWh = 0.367 kg CO2/kWh',
			},
			{
				id: 'gasHeating',
				label: 'Cubic meters of natural gas used per month',
				factor: 1.95,
				source: 'EPA 2024: 0.0548 metric tons CO2/Mcf = 1.95 kg/m³',
			},
			{
				id: 'waterHeating',
				label: 'Gallons of water heated per month',
				factor: 0.15,
				source: 'EPA 2024: Based on natural gas water heating efficiency',
			},
			{
				id: 'solarGeneration',
				label: 'Solar panel energy generated per month (kWh)',
				factor: -0.5,
				source: 'Renewable energy offset study',
			}, // negative factor for clean energy generation
		],
	},
	{
		id: 'foodConsumption',
		title: 'Food Consumption',
		icon: Sandwich,
		info: 'Emissions based on dietary choices and food production methods',
		questions: [
			{
				id: 'meatMeals',
				label: 'Meat-based meals per week',
				factor: 6.5,
				source:
					'FAO 2024: Beef ~60kg CO2/kg, Chicken ~4kg CO2/kg, avg meal ~0.1kg',
			},
			{
				id: 'vegetarianMeals',
				label: 'Vegetarian meals per week',
				factor: 1.5,
				source: 'FAO 2024: Plant-based foods 1-2 kg CO2/kg, avg meal ~0.1kg',
			},
			{
				id: 'foodWaste',
				label: 'Food waste in kg per week',
				factor: 2.5,
				source: 'U.S. EPA waste study',
			},
			{
				id: 'localOrganicFood',
				label: 'Local/organic food purchases per week',
				factor: -1.0,
				source: 'Sustainable agriculture study',
			}, // negative factor for sustainable food choices
		],
	},
	{
		id: 'wasteManagement',
		title: 'Waste Management',
		icon: Package,
		info: 'Includes landfill emissions and waste disposal methods',
		questions: [
			{
				id: 'landfillWaste',
				label: 'Kilograms of waste sent to landfill per week',
				factor: 2.83,
				source: 'EPA WARM 2024: 2.83 metric tons CO2e per ton waste',
			},
			{
				id: 'recycledWaste',
				label: 'Kilograms of recycled waste per week',
				factor: 0.5,
				source: 'Recycling impact study',
			},
			{
				id: 'composting',
				label: 'Kilograms of composted organic waste per week',
				factor: 0.7,
				source: 'EPA composting study',
			},
			{
				id: 'electronicRecycling',
				label: 'Electronic waste recycled per year (kg)',
				factor: -0.3,
				source: 'E-waste recycling study',
			}, // negative factor for proper e-waste disposal
		],
	},
	{
		id: 'waterUsage',
		title: 'Water Usage',
		icon: Droplet,
		info: 'Energy required for water extraction, treatment, and heating',
		questions: [
			{
				id: 'showerTime',
				label: 'Minutes spent in shower per day',
				factor: 0.01,
				source: 'EPA water heating data',
			},
			{
				id: 'laundryLoads',
				label: 'Laundry loads per week',
				factor: 1.2,
				source: 'Energy efficiency reports',
			},
			{
				id: 'dishwashing',
				label: 'Dishwasher loads per week',
				factor: 0.9,
				source: 'Energy Star reports',
			},
			{
				id: 'rainwaterHarvesting',
				label: 'Rainwater harvesting usage per month (gallons)',
				factor: -0.05,
				source: 'Water conservation study',
			}, // negative factor for water conservation
		],
	},
	{
		id: 'socialActivities',
		title: 'Social Activities',
		icon: Users,
		info: 'Carbon footprint from recreational and entertainment activities',
		questions: [
			{
				id: 'streamingHours',
				label: 'Hours of streaming content per week',
				factor: 0.05,
				source: 'Digital energy consumption study',
			},
			{
				id: 'restaurantVisits',
				label: 'Restaurant meals per month',
				factor: 10,
				source: 'Food service emissions data',
			},
			{
				id: 'concertsEvents',
				label: 'Live event attendances per year',
				factor: 20,
				source: 'Event industry emissions report',
			},
			{
				id: 'virtualMeetings',
				label: 'Virtual meetings instead of travel per month',
				factor: -5.0,
				source: 'Remote work impact study',
			}, // negative factor for avoiding travel emissions
		],
	},
	{
		id: 'shopping',
		title: 'Shopping & Online Purchases',
		icon: ShoppingBag,
		info: 'Emissions related to purchasing and shipping of products',
		questions: [
			{
				id: 'onlineOrders',
				label: 'Online purchases per month',
				factor: 5,
				source: 'Logistics carbon emissions study',
			},
			{
				id: 'inStorePurchases',
				label: 'In-store purchases per month',
				factor: 3,
				source: 'Retail energy report',
			},
			{
				id: 'packagingWaste',
				label: 'Kilograms of packaging waste per month',
				factor: 2.3,
				source: 'EPA packaging waste report',
			},
			{
				id: 'secondHandPurchases',
				label: 'Second-hand purchases per month',
				factor: -2.0,
				source: 'Circular economy study',
			}, // negative factor for reusing products
		],
	},
	{
		id: 'buildingMaintenance',
		title: 'Building & Home Maintenance',
		icon: Building,
		info: 'Energy use from home improvements and ongoing maintenance',
		questions: [
			{
				id: 'renovationProjects',
				label: 'Home renovation projects per year',
				factor: 500,
				source: 'Construction carbon study',
			},
			{
				id: 'applianceReplacements',
				label: 'New appliances purchased per year',
				factor: 150,
				source: 'Appliance manufacturing emissions',
			},
			{
				id: 'energyEfficiency',
				label: 'Energy-efficient upgrades per year',
				factor: -100,
				source: 'Energy conservation data',
			},
			{
				id: 'greenCertifications',
				label: 'Green building certifications obtained per year',
				factor: -200,
				source: 'Sustainable building study',
			}, // negative factor for green building practices
		],
	},

	// AI & Digital Services Category
	{
		id: 'aiToolUsage',
		title: 'AI Tool Usage',
		icon: Bot,
		info: 'Carbon footprint from AI model inference and server usage',
		questions: [
			{
				id: 'imageGenerations',
				label: 'Number of image generations per week',
				factor: 0.15,
				source: 'AI image generation energy study',
			},
			{
				id: 'textPrompts',
				label: 'Number of text prompts sent per week',
				factor: 0.008,
				source: 'AI text processing energy study',
			},
			{
				id: 'videoGenerations',
				label: 'Video generation requests per month',
				factor: 2.5,
				source: 'AI video generation energy study',
			},
			{
				id: 'apiCalls',
				label: 'API calls made per week',
				factor: 0.002,
				source: 'AI API infrastructure energy study',
			},
		],
	},

	{
		id: 'cloudServices',
		title: 'Digital & Cloud Services',
		icon: Cloud,
		info: 'Energy consumption from digital activities, cloud computing, and device usage',
		questions: [
			{
				id: 'screenTime',
				label: 'Total screen time hours per day (all devices)',
				factor: 0.003,
				source: 'Digital device energy consumption study',
			},
			{
				id: 'cloudStorage',
				label: 'Cloud storage usage (GB per month)',
				factor: 0.0005,
				source: 'Cloud infrastructure energy study',
			},
			{
				id: 'videoStreaming',
				label: 'Video streaming hours per week',
				factor: 0.0036,
				source: 'Digital streaming energy study',
			},
			{
				id: 'dataTransfers',
				label: 'Data uploads/downloads per week (GB)',
				factor: 0.006,
				source: 'Data transmission energy study',
			},
		],
	},
];

export default categories;
