'use client';
import React, { useState, useMemo } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Input } from '../../components/ui/input';
import {
	Car,
	ShoppingBag,
	Zap,
	Leaf,
	Award,
	TrendingUp,
	Timer,
	Factory,
	AlertTriangle,
} from 'lucide-react';
import {
	LineChart,
	BarChart,
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

// Categories and energy consumption data remain the same
const CATEGORIES = {
	'Major Appliances': [
		'Refrigerator',
		'Washing Machine',
		'Dryer',
		'Dishwasher',
		'Microwave Oven',
		'Conventional Oven / Range',
		'Air Conditioner',
		'Heater',
		'Water Heater / Geyser',
		'Vacuum Cleaner',
	],
	// Other categories remain the same...
};

// Energy consumption data in kWh per hour for each appliance
const ENERGY_CONSUMPTION = {
	'Refrigerator': 0.4,
	'Washing Machine': 0.5,
	'Dryer': 3.0,
	// Other appliances remain the same...
};

// Daily carbon limit in kg CO2
const DAILY_CARBON_LIMIT = 6.8;

// ApplianceCard component with updated styling
const ApplianceCard = ({
	name,
	isOn,
	duration,
	onToggle,
	onDurationChange,
	isOverLimit,
}) => {
	const energyConsumption = ENERGY_CONSUMPTION[name] || 0;
	const CARBON_INTENSITY = 0.42; // kg CO2 per kWh
	const carbonFootprint = (
		energyConsumption *
		duration *
		CARBON_INTENSITY
	).toFixed(2);

	return (
		<div className='relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-xl shadow-lg transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/80'>
			<div className='flex justify-between items-center mb-4'>
				<div className='flex items-center gap-2'>
					<div
						className={`h-8 w-8 rounded-md ${
							isOn ? 'bg-emerald-500' : 'bg-emerald-900/50'
						} flex items-center justify-center`}
					>
						<Timer
							className={`w-4 h-4 ${isOn ? 'text-white' : 'text-emerald-400'}`}
						/>
					</div>
					<span className='text-white font-semibold'>{name}</span>
				</div>
				<div className='flex items-center gap-2'>
					<div
						className={`w-2 h-2 rounded-full ${
							isOn ? 'bg-emerald-500' : 'bg-red-500'
						}`}
					/>
					<span className='text-xs text-gray-400'>
						{isOn ? 'Active' : 'Inactive'}
					</span>
				</div>
			</div>

			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<span className='text-sm text-gray-400'>Duration</span>
					<div className='flex gap-2 items-center'>
						<select
							value={Math.floor(duration)}
							onChange={(e) =>
								onDurationChange(parseFloat(e.target.value) + (duration % 1))
							}
							className='bg-slate-700 border border-slate-600 text-white rounded-md p-1 text-sm'
						>
							{Array.from({ length: 24 }, (_, i) => (
								<option key={i} value={i}>
									{i} hrs
								</option>
							))}
						</select>
						<select
							value={Math.round((duration % 1) * 60)}
							onChange={(e) =>
								onDurationChange(
									Math.floor(duration) + parseInt(e.target.value, 10) / 60
								)
							}
							className='bg-slate-700 border border-slate-600 text-white rounded-md p-1 text-sm'
						>
							{Array.from({ length: 12 }, (_, i) => (
								<option key={i} value={i * 5}>
									{i * 5} mins
								</option>
							))}
						</select>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<span className='text-sm text-gray-400'>Status</span>
					<div
						className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
							isOn ? 'bg-emerald-500' : 'bg-slate-600'
						}`}
						onClick={onToggle}
					>
						<div
							className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
								isOn ? 'translate-x-6' : 'translate-x-0'
							}`}
						/>
					</div>
				</div>

				{isOn && duration > 0 && (
					<div className='flex items-center justify-between mt-2'>
						<span className='text-sm text-gray-400'>Carbon Footprint</span>
						<span
							className={`text-sm font-medium ${
								isOverLimit ? 'text-red-400' : 'text-emerald-400'
							}`}
						>
							{carbonFootprint} kg CO₂
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

const EcoCenter = () => {
	// State for energy appliances
	const [searchTerm, setSearchTerm] = useState('');
	const [appliances, setAppliances] = useState(() => {
		const initial = {};
		Object.values(CATEGORIES)
			.flat()
			.forEach((appliance) => {
				initial[appliance] = {
					isOn: false,
					duration: 0,
				};
			});
		return initial;
	});

	// Calculate total carbon emissions and check if over limit
	const { totalEmissions, isOverLimit } = useMemo(() => {
		const CARBON_INTENSITY = 0.42; // kg CO2 per kWh

		let total = 0;
		Object.entries(appliances).forEach(([name, data]) => {
			if (data.isOn && ENERGY_CONSUMPTION[name]) {
				total += ENERGY_CONSUMPTION[name] * data.duration * CARBON_INTENSITY;
			}
		});

		return {
			totalEmissions: total.toFixed(2),
			isOverLimit: total > DAILY_CARBON_LIMIT,
		};
	}, [appliances]);

	// Get all appliances as an array of entries
	const allAppliances = Object.entries(appliances);

	// Filter appliances based on search term
	const filteredAppliances = allAppliances.filter(([name]) =>
		name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Display first 9 appliances if no search term, otherwise show all filtered results
	const displayedAppliances = searchTerm
		? filteredAppliances
		: allAppliances.slice(0, 9);

	// Handlers for appliance controls
	const handleToggle = (applianceName) => {
		setAppliances((prev) => ({
			...prev,
			[applianceName]: {
				...prev[applianceName],
				isOn: !prev[applianceName].isOn,
			},
		}));
	};

	const handleDurationChange = (applianceName, value) => {
		setAppliances((prev) => ({
			...prev,
			[applianceName]: {
				...prev[applianceName],
				duration: parseFloat(value),
			},
		}));
	};

	return (
		<div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
			{/* Background Elements */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			<div className='container mx-auto px-4 py-12'>
				<div className='mb-8 text-center'>
					<div className='inline-block px-4 py-1 bg-emerald-900/50 rounded-full mb-2 backdrop-blur-sm border border-emerald-500/20'>
						<p className='text-xs md:text-sm font-medium text-emerald-400 tracking-wide'>
							MONITOR · ANALYZE · REDUCE
						</p>
					</div>
					<h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
						Your <span className='text-emerald-400'>Eco Center</span> Dashboard
					</h1>
					<p className='text-gray-300 max-w-2xl mx-auto'>
						Track your energy usage to reduce your carbon footprint.
					</p>
				</div>

				<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl shadow-lg mb-8'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-6'>
						<div>
							<h3 className='text-xl font-semibold text-white mb-2 flex items-center gap-2'>
								<Zap className='text-emerald-400 w-5 h-5' />
								Current Energy Impact
							</h3>
							<div
								className={`text-3xl font-bold ${
									isOverLimit ? 'text-red-400' : 'text-emerald-400'
								}`}
							>
								{totalEmissions} kg CO₂
							</div>
							<div className='flex items-center gap-2 mt-2'>
								<div className='w-full bg-slate-700 rounded-full h-2.5'>
									<div
										className={`h-2.5 rounded-full ${
											isOverLimit ? 'bg-red-500' : 'bg-emerald-500'
										}`}
										style={{
											width: `${Math.min(
												(totalEmissions / DAILY_CARBON_LIMIT) * 100,
												100
											)}%`,
										}}
									/>
								</div>
								<span className='text-sm text-gray-300 whitespace-nowrap'>
									{DAILY_CARBON_LIMIT} kg limit
								</span>
							</div>
						</div>

						<div className='bg-slate-700/50 backdrop-blur-sm border border-slate-600 p-4 rounded-lg max-w-md w-full'>
							<h3 className='text-sm font-semibold text-white mb-3'>
								Active Appliances:
							</h3>
							<div className='space-y-2 max-h-32 overflow-y-auto pr-2'>
								{Object.entries(appliances)
									.filter(([name, data]) => data.isOn && data.duration > 0)
									.map(([name, data]) => {
										const emissions =
											(ENERGY_CONSUMPTION[name] || 0) * data.duration * 0.42;
										return (
											<div key={name} className='flex justify-between text-sm'>
												<span className='text-gray-300'>
													{name} ({data.duration}h)
												</span>
												<span
													className={`font-medium ${
														isOverLimit ? 'text-red-400' : 'text-emerald-400'
													}`}
												>
													{emissions.toFixed(2)} kg CO₂
												</span>
											</div>
										);
									})}
								{Object.entries(appliances).filter(
									([name, data]) => data.isOn && data.duration > 0
								).length === 0 && (
									<div className='text-gray-400 text-sm'>
										No active appliances
									</div>
								)}
							</div>
						</div>
					</div>

					{isOverLimit && (
						<div className='mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white'>
							<div className='flex items-center gap-2 mb-1'>
								<AlertTriangle className='h-5 w-5 text-red-400' />
								<h3 className='font-semibold'>Carbon Limit Exceeded</h3>
							</div>
							<p className='text-sm text-gray-300'>
								Your current usage exceeds the daily limit of{' '}
								{DAILY_CARBON_LIMIT} kg CO₂. Consider reducing appliance usage
								or duration.
							</p>
						</div>
					)}
				</div>

				<div className='w-full max-w-md mx-auto mb-8'>
					<div className='relative'>
						<Input
							type='search'
							placeholder='Search appliances...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full bg-slate-800 border-slate-700 text-white placeholder:text-gray-400 focus:border-emerald-500'
						/>
						<div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
							<svg
								className='w-4 h-4 text-gray-400'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								></path>
							</svg>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{displayedAppliances.map(([name, data]) => (
						<ApplianceCard
							key={name}
							name={name}
							isOn={data.isOn}
							duration={data.duration}
							onToggle={() => handleToggle(name)}
							onDurationChange={(value) => handleDurationChange(name, value)}
							isOverLimit={isOverLimit}
						/>
					))}
				</div>

				{searchTerm && filteredAppliances.length === 0 && (
					<div className='text-center py-8 text-gray-400'>
						No appliances found matching "{searchTerm}"
					</div>
				)}
			</div>
		</div>
	);
};

export default EcoCenter;
