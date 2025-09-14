import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const CarbonGauge = ({ clerkId }) => {
	const [totalEmissions, setTotalEmissions] = useState(0);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState('');
	const [color, setColor] = useState('');

	// Define thresholds
	const lowThreshold = 100;
	const mediumThreshold = 500;
	const highThreshold = 1000;

	// Fetch data from API safely
	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetch('/api/fetch');
			const fetchedData = await response.json();
			const safeData = Array.isArray(fetchedData) ? fetchedData : [];

			// Find user data
			let userData = safeData.find((item) => item.clerkId === clerkId);

			// Fallback to default clerkId
			if (!userData) {
				console.warn(`No data found for clerkId: ${clerkId}, trying default clerkId`);
				const defaultClerkId = 'user_2rUkwh8E63sBgJ8XGFKtKcEREbF';
				userData = safeData.find((item) => item.clerkId === defaultClerkId);
			}

			if (!userData) {
				console.warn('No data found for the default clerkId either');
				setTotalEmissions(0);
				setStatus('No Data');
				setColor('rgb(107, 114, 128)'); // gray-500
				return;
			}

			// Calculate total emissions safely
			const { categories } = userData;
			const total = categories
				? Object.values(categories).reduce((sum, value) => sum + (value || 0), 0)
				: 0;
			setTotalEmissions(total);

			// Set status & color
			if (total < lowThreshold) {
				setStatus('Low Impact');
				setColor('rgb(34, 197, 94)');
			} else if (total < mediumThreshold) {
				setStatus('Medium Impact');
				setColor('rgb(250, 204, 21)');
			} else if (total < highThreshold) {
				setStatus('High Impact');
				setColor('rgb(249, 115, 22)');
			} else {
				setStatus('Very High Impact');
				setColor('rgb(239, 68, 68)');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			setTotalEmissions(0);
			setStatus('Error');
			setColor('rgb(239, 68, 68)');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (clerkId) fetchData();
	}, [clerkId]);

	// Gauge chart data
	const gaugeData = {
		labels: ['Carbon Footprint', 'Remaining'],
		datasets: [
			{
				data: [totalEmissions, highThreshold * 1.5 - totalEmissions],
				backgroundColor: [color, 'rgba(30, 41, 59, 0.6)'],
				borderColor: ['transparent', 'transparent'],
				borderWidth: 0,
				cutout: '80%',
				circumference: 180,
				rotation: 270,
			},
		],
	};

	const gaugeOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: { legend: { display: false }, tooltip: { enabled: false } },
		layout: { padding: { bottom: 30 } },
	};

	// Tailwind class for status
	const getStatusColorClass = () => {
		switch (status) {
			case 'Low Impact': return 'text-green-500';
			case 'Medium Impact': return 'text-yellow-400';
			case 'High Impact': return 'text-orange-500';
			case 'Very High Impact': return 'text-red-500';
			case 'No Data': return 'text-gray-500';
			case 'Error': return 'text-red-500';
			default: return 'text-emerald-400';
		}
	};

	if (loading) {
		return (
			<div className='flex flex-col items-center justify-center text-center py-12'>
				<div className='h-16 w-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-4'>
					<div className='h-8 w-8 text-emerald-400 animate-spin'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83'></path>
						</svg>
					</div>
				</div>
				<p className='text-gray-400 text-lg'>Loading...</p>
			</div>
		);
	}

	return (
		<div className='relative h-[250px] flex flex-col items-center justify-center'>
			<div className='w-full h-full'>
				<Doughnut data={gaugeData} options={gaugeOptions} />
			</div>
			<div className='absolute bottom-8 flex flex-col items-center'>
				<div className={`text-4xl font-bold ${getStatusColorClass()}`}>
					{totalEmissions.toFixed(1)}
				</div>
				<div className='text-white text-sm'>kg CO₂</div>
				<div className={`text-lg font-semibold mt-1 ${getStatusColorClass()}`}>
					{status}
				</div>
			</div>
		</div>
	);
};

export default CarbonGauge;
