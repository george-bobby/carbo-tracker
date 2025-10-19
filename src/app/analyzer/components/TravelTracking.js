'use client';

import { useState } from 'react';
import {
	FaPlane,
	FaCar,
	FaBus,
	FaBicycle,
	FaMapMarkerAlt,
	FaRoute,
	FaPlus,
} from 'react-icons/fa';
import { SiGooglemaps, SiApple } from 'react-icons/si';
import { useUser } from '@clerk/nextjs';

export default function TravelTracking() {
	const { user } = useUser();
	const [connectedServices, setConnectedServices] = useState([]);
	const [connecting, setConnecting] = useState(null);
	const [showTravelData, setShowTravelData] = useState(false);

	const isSignedIn = !!user?.id;

	const travelServices = [
		{
			id: 'google-maps',
			name: 'Google Maps Timeline',
			icon: SiGooglemaps,
			color: 'bg-red-500',
			description: 'Import location history and travel patterns',
		},
		{
			id: 'apple-maps',
			name: 'Apple Maps',
			icon: SiApple,
			color: 'bg-gray-800',
			description: 'Connect Apple Maps travel data',
		},
		{
			id: 'herewego',
			name: 'HereWeGo Maps',
			icon: FaMapMarkerAlt,
			color: 'bg-blue-500',
			description: 'Import HereWeGo navigation history',
		},
	];

	// Sample travel data with realistic and comprehensive examples
	const sampleTravelData = [
		{
			id: 1,
			type: 'Car',
			from: 'Home',
			to: 'Office',
			distance: '18.5 km',
			date: '2024-10-18',
			estimatedCO2: 7.4,
			service: 'Google Maps Timeline',
			icon: FaCar,
		},
		{
			id: 2,
			type: 'Flight',
			from: 'San Francisco',
			to: 'New York',
			distance: '4,139 km',
			date: '2024-10-15',
			estimatedCO2: 372.5,
			service: 'FlightAware',
			icon: FaPlane,
		},
		{
			id: 3,
			type: 'Public Transit',
			from: 'Downtown Station',
			to: 'Airport',
			distance: '25.3 km',
			date: '2024-10-14',
			estimatedCO2: 3.8,
			service: 'Transit App',
			icon: FaBus,
		},
		{
			id: 4,
			type: 'Car',
			from: 'Home',
			to: 'Grocery Store',
			distance: '6.2 km',
			date: '2024-10-13',
			estimatedCO2: 2.5,
			service: 'Apple Maps',
			icon: FaCar,
		},
		{
			id: 5,
			type: 'Rideshare',
			from: 'Restaurant',
			to: 'Home',
			distance: '14.7 km',
			date: '2024-10-12',
			estimatedCO2: 5.9,
			service: 'Uber',
			icon: FaCar,
		},
		{
			id: 6,
			type: 'Car',
			from: 'Office',
			to: 'Client Meeting',
			distance: '32.1 km',
			date: '2024-10-11',
			estimatedCO2: 12.8,
			service: 'Google Maps',
			icon: FaCar,
		},
		{
			id: 7,
			type: 'Public Transit',
			from: 'Home',
			to: 'City Center',
			distance: '12.4 km',
			date: '2024-10-10',
			estimatedCO2: 1.9,
			service: 'Citymapper',
			icon: FaBus,
		},
		{
			id: 8,
			type: 'Flight',
			from: 'Los Angeles',
			to: 'Seattle',
			distance: '1,545 km',
			date: '2024-10-09',
			estimatedCO2: 139.1,
			service: 'FlightRadar24',
			icon: FaPlane,
		},
		{
			id: 9,
			type: 'Car',
			from: 'Home',
			to: 'Weekend Trip',
			distance: '156.8 km',
			date: '2024-10-08',
			estimatedCO2: 62.7,
			service: 'Waze',
			icon: FaCar,
		},
		{
			id: 10,
			type: 'Bike',
			from: 'Home',
			to: 'Park',
			distance: '4.2 km',
			date: '2024-10-07',
			estimatedCO2: 0.0,
			service: 'Strava',
			icon: FaBicycle,
		},
	];

	const handleConnect = async (serviceId) => {
		if (!isSignedIn) {
			alert('Please sign in to connect travel services');
			return;
		}

		setConnecting(serviceId);

		// Simulate connection process
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setConnectedServices((prev) => [...prev, serviceId]);
		setConnecting(null);
		setShowTravelData(true);

		alert('Connected successfully!');
	};

	const handleAddToDashboard = async (travelData) => {
		if (!isSignedIn) {
			alert('Please sign in to add travel data to dashboard');
			return;
		}

		try {
			const months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			];
			const currentMonth = months[new Date().getMonth()];

			// Map travel data to Transportation category
			const categories = {
				'Transportation': travelData.estimatedCO2,
				'Energy Use': 0,
				'Food Consumption': 0,
				'Waste Management': 0,
				'Water Usage': 0,
				'Social Activities': 0,
				'Shopping & Online Purchases': 0,
				'Building & Home Maintenance': 0,
			};

			const payload = {
				clerkId: user.id,
				updatedAt: new Date().toISOString(),
				categories,
				monthlyData: { [currentMonth]: travelData.estimatedCO2 },
				displayName:
					user?.fullName ||
					[user?.firstName, user?.lastName].filter(Boolean).join(' '),
				imageUrl: user?.imageUrl || '',
				travelType: travelData.type,
				from: travelData.from,
				to: travelData.to,
				distance: travelData.distance,
				date: travelData.date,
				service: travelData.service,
				totalKg: travelData.estimatedCO2,
			};

			const res = await fetch('/api/save', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!res.ok) throw new Error('Failed to add to dashboard');

			alert('Travel data added to dashboard!');
		} catch (err) {
			console.error(err);
			alert('Failed to add to dashboard');
		}
	};

	return (
		<div className='space-y-6'>
			<div className='text-center mb-6'>
				<h2 className='text-2xl font-bold text-white mb-2'>Travel Tracking</h2>
				<p className='text-gray-300 text-sm'>
					Connect your travel services to automatically track transportation
					carbon footprint
				</p>
			</div>

			{/* Travel Services */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{travelServices.map((service) => {
					const isConnected = connectedServices.includes(service.id);
					const isConnecting = connecting === service.id;

					return (
						<div
							key={service.id}
							className='bg-slate-700/30 border border-slate-600 rounded-lg p-6 text-center'
						>
							<div
								className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}
							>
								<service.icon className='text-white text-2xl' />
							</div>
							<h3 className='text-white font-semibold mb-2'>{service.name}</h3>
							<p className='text-gray-400 text-sm mb-4'>
								{service.description}
							</p>

							<button
								onClick={() => handleConnect(service.id)}
								disabled={isConnected || isConnecting}
								className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
									isConnected
										? 'bg-green-600 text-white cursor-not-allowed'
										: isConnecting
										? 'bg-gray-600 text-white cursor-not-allowed'
										: 'bg-emerald-500 text-white hover:bg-emerald-600'
								}`}
							>
								{isConnected ? (
									'Connected ✓'
								) : isConnecting ? (
									<div className='flex items-center justify-center gap-2'>
										<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
										Connecting...
									</div>
								) : (
									'Connect'
								)}
							</button>
						</div>
					);
				})}
			</div>

			{/* Sample Travel Data */}
			{(showTravelData || connectedServices.length > 0) && (
				<div className='bg-slate-700/30 border border-slate-600 rounded-lg p-6'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-white font-semibold flex items-center gap-2'>
							<FaRoute className='text-emerald-400' />
							Recent Travel History
						</h3>
						<span className='text-gray-400 text-sm'>
							{sampleTravelData.length} trips
						</span>
					</div>

					<div className='space-y-3'>
						{sampleTravelData.map((travel) => (
							<div
								key={travel.id}
								className='bg-slate-800/50 border border-slate-600 rounded-lg p-4 flex items-center justify-between'
							>
								<div className='flex items-center gap-4'>
									<div className='w-10 h-10 bg-emerald-900/50 rounded-full flex items-center justify-center'>
										<travel.icon className='text-emerald-400 text-lg' />
									</div>
									<div className='flex-1'>
										<div className='flex items-center gap-2 mb-1'>
											<h4 className='text-white font-medium'>
												{travel.from} → {travel.to}
											</h4>
											<span className='text-gray-400 text-sm'>
												({travel.distance})
											</span>
										</div>
										<div className='flex items-center gap-4 text-sm text-gray-400'>
											<span>{travel.date}</span>
											<span>•</span>
											<span>{travel.type}</span>
											<span>•</span>
											<span className='text-orange-400'>
												{travel.estimatedCO2} kg CO₂e
											</span>
											<span>•</span>
											<span className='text-blue-400'>{travel.service}</span>
										</div>
									</div>
								</div>

								<button
									onClick={() => handleAddToDashboard(travel)}
									className='ml-4 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm flex items-center gap-2'
								>
									<FaPlus className='text-xs' />
									Add to Dashboard
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{!isSignedIn && (
				<div className='bg-amber-500/20 border border-amber-500 text-amber-300 text-sm p-3 rounded-lg text-center'>
					Please sign in to connect travel services and add travel data to your
					dashboard
				</div>
			)}
		</div>
	);
}
