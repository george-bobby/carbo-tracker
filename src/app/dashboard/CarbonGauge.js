import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const CarbonGauge = ({ clerkId }) => {
	const [totalEmissions, setTotalEmissions] = useState(0);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState('');
	const [color, setColor] = useState('');

	// Define thresholds for different statuses
	const lowThreshold = 100;
	const mediumThreshold = 500;
	const highThreshold = 1000;

	// Fetch data from API
	const fetchData = async () => {
		try {
			const response = await fetch('/api/fetch');
			const fetchedData = await response.json();

			// Find the data for the given clerkId
			const userData = fetchedData.find((item) => item.clerkId === clerkId);

			if (userData) {
				// Calculate total emissions from categories
				const { categories } = userData;
				const total = Object.values(categories).reduce(
					(sum, value) => sum + value,
					0
				);

				setTotalEmissions(total);
				setLoading(false);

				// Set status based on thresholds
				if (total < lowThreshold) {
					setStatus('Low Impact');
					setColor('rgb(34, 197, 94)'); // green-500
				} else if (total < mediumThreshold) {
					setStatus('Medium Impact');
					setColor('rgb(250, 204, 21)'); // yellow-400
				} else if (total < highThreshold) {
					setStatus('High Impact');
					setColor('rgb(249, 115, 22)'); // orange-500
				} else {
					setStatus('Very High Impact');
					setColor('rgb(239, 68, 68)'); // red-500
				}
			} else {
				console.error('No data found for the given clerkId');
				setLoading(false);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (clerkId) {
			fetchData();
		}
	}, [clerkId]);

	// Create data for gauge chart
	const gaugeData = {
		labels: ['Carbon Footprint', 'Remaining'],
		datasets: [
			{
				data: [totalEmissions, highThreshold * 1.5 - totalEmissions], // Using highThreshold as max for gauge
				backgroundColor: [color, 'rgba(30, 41, 59, 0.6)'], // The second color is slate-800 with opacity
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
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
		},
		layout: {
			padding: {
				bottom: 30,
			},
		},
	};

	// Function to determine color class based on status
	const getStatusColorClass = () => {
		switch (status) {
			case 'Low Impact':
				return 'text-green-500';
			case 'Medium Impact':
				return 'text-yellow-400';
			case 'High Impact':
				return 'text-orange-500';
			case 'Very High Impact':
				return 'text-red-500';
			default:
				return 'text-emerald-400';
		}
	};

	if (loading) {
		return (
			<div className='flex flex-col items-center justify-center text-center py-12'>
				<div className='h-16 w-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-4'>
					<div className='h-8 w-8 text-emerald-400'>
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
				<p className='text-gray-400 text-lg'>
					No data found. Add data in "Calculator" to show it on "Dashboard".
				</p>
			</div>
		);
	}

	return (
		<div className='relative h-[250px] flex flex-col items-center justify-center'>
			<div className='w-full h-full'>
				<Doughnut data={gaugeData} options={gaugeOptions} />
			</div>

			{/* Gauge label overlay */}
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
