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
				factor: 0.404,
				source: 'EPA average vehicle emissions',
			}, // kg CO2 per mile
			{
				id: 'flightHours',
				label: 'Hours of flight travel per year',
				factor: 90,
				source: 'IPCC aviation metrics',
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
				factor: 0.92,
				source: 'U.S. EPA average electricity emissions',
			},
			{
				id: 'gasHeating',
				label: 'Cubic meters of natural gas used per month',
				factor: 2.03,
				source: 'EPA natural gas emissions',
			},
			{
				id: 'waterHeating',
				label: 'Gallons of water heated per month',
				factor: 0.18,
				source: 'Energy Information Administration',
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
				factor: 7.2,
				source: 'FAO livestock emissions',
			},
			{
				id: 'vegetarianMeals',
				label: 'Vegetarian meals per week',
				factor: 2.0,
				source: 'UNEP diet study',
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
				factor: 1.98,
				source: 'EPA landfill methane emissions',
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

	// New AI & Software Categories
	{
		id: 'aiToolUsage',
		title: 'AI Tool Usage',
		icon: Bot,
		info: 'Carbon footprint from AI model inference and server usage',
		questions: [
			{
				id: 'chatgptUsage',
				label: 'ChatGPT usage sessions per week',
				factor: 0.01,
				source: 'AI server energy consumption study',
			},
			{
				id: 'geminiUsage',
				label: 'Gemini usage sessions per week',
				factor: 0.008,
				source: 'AI server energy consumption study',
			},
			{
				id: 'claudeUsage',
				label: 'Claude usage sessions per week',
				factor: 0.009,
				source: 'AI server energy consumption study',
			},
			{
				id: 'otherAiTools',
				label: 'Other AI tools usage sessions per week',
				factor: 0.01,
				source: 'AI server energy consumption study',
			},
		],
	},

	{
		id: 'softwareApplications',
		title: 'Software Applications',
		icon: Monitor,
		info: 'Energy consumption from software usage and device operation',
		questions: [
			{
				id: 'desktopApps',
				label: 'Desktop applications opened per day',
				factor: 0.002,
				source: 'Device energy consumption study',
			},
			{
				id: 'mobileAppUsage',
				label: 'Mobile apps usage hours per day',
				factor: 0.001,
				source: 'Mobile device energy study',
			},
			{
				id: 'browserTabs',
				label: 'Browser tabs opened per day',
				factor: 0.0005,
				source: 'Web browser energy study',
			},
			{
				id: 'softwareInstallations',
				label: 'Software installations per month',
				factor: 0.05,
				source: 'Software distribution energy study',
			},
		],
	},

	{
		id: 'cloudServices',
		title: 'Cloud Services Usage',
		icon: Cloud,
		info: 'Energy consumption from cloud computing and storage services',
		questions: [
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
				id: 'cloudComputing',
				label: 'Cloud computing services usage (hours per month)',
				factor: 0.02,
				source: 'Cloud computing energy study',
			},
			{
				id: 'onlineBackup',
				label: 'Online backup frequency (times per week)',
				factor: 0.001,
				source: 'Data backup energy study',
			},
		],
	},

	{
		id: 'mobilePhoneUsage',
		title: 'Mobile Phone Usage',
		icon: Smartphone,
		info: 'Energy consumption from mobile device usage and network activity',
		questions: [
			{
				id: 'screenTime',
				label: 'Screen time hours per day',
				factor: 0.002,
				source: 'Mobile device energy study',
			},
			{
				id: 'phoneCalls',
				label: 'Phone calls duration per day (minutes)',
				factor: 0.0001,
				source: 'Cellular network energy study',
			},
			{
				id: 'textMessages',
				label: 'Text messages sent per day',
				factor: 0.000014,
				source: 'Mobile network energy study',
			},
			{
				id: 'mobileData',
				label: 'Mobile data usage (GB per month)',
				factor: 0.005,
				source: 'Mobile network infrastructure study',
			},
		],
	},

	{
		id: 'dataStorageTransfers',
		title: 'Data Storage & Transfers',
		icon: Database,
		info: 'Energy consumption from data transmission and storage operations',
		questions: [
			{
				id: 'fileDownloads',
				label: 'File downloads per week (GB)',
				factor: 0.006,
				source: 'Data transmission energy study',
			},
			{
				id: 'fileUploads',
				label: 'File uploads per week (GB)',
				factor: 0.006,
				source: 'Data transmission energy study',
			},
			{
				id: 'emailAttachments',
				label: 'Email attachments sent per week (MB)',
				factor: 0.006,
				source: 'Email infrastructure energy study',
			},
			{
				id: 'socialMediaPosts',
				label: 'Social media posts per day',
				factor: 0.0047,
				source: 'Social media platform energy study',
			},
		],
	},
];

export default categories;
