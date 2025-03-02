import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ clerkId }) => {
	const [chartData, setChartData] = useState(null);

	// Fetch the data from the API
	const fetchData = async () => {
		try {
			const fetchedData = await fetch('/api/fetch').then((res) => res.json());

			// Find the data for the given clerkId
			const userData = fetchedData.find((item) => item.clerkId === clerkId);
			if (userData) {
				const { categories } = userData;

				// Define expected categories
				const expectedCategories = [
					'transportation',
					'energyUse',
					'foodConsumption',
					'wasteManagement',
					'waterUsage',
					'socialActivities',
					'shopping',
					'buildingMaintenance',
				];

				// Prepare data for the chart with nice labels
				const labels = expectedCategories.map((category) => {
					// Convert camelCase to Title Case with spaces
					return category
						.replace(/([A-Z])/g, ' $1')
						.replace(/^./, (str) => str.toUpperCase());
				});

				// Get values in the same order as labels, or 0 if missing
				const dataValues = expectedCategories.map(
					(category) => categories[category] || 0
				);

				const data = {
					labels,
					datasets: [
						{
							label: 'Carbon Footprint by Category',
							data: dataValues,
							backgroundColor: 'rgba(16, 185, 129, 0.2)',
							borderColor: 'rgba(16, 185, 129, 1)',
							borderWidth: 2,
							pointBackgroundColor: 'rgba(16, 185, 129, 1)',
							pointBorderColor: '#fff',
							pointHoverBackgroundColor: '#fff',
							pointHoverBorderColor: 'rgba(16, 185, 129, 1)',
							pointRadius: 4,
							pointHoverRadius: 6,
						},
					],
				};

				setChartData(data);
			}
		} catch (error) {
			console.error('Error fetching radar chart data:', error);
		}
	};

	useEffect(() => {
		if (clerkId) fetchData();
	}, [clerkId]);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			r: {
				angleLines: {
					color: 'rgba(255, 255, 255, 0.15)',
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.15)',
				},
				pointLabels: {
					color: 'rgba(255, 255, 255, 0.7)',
					font: {
						size: 11,
					},
				},
				ticks: {
					backdropColor: 'transparent',
					color: 'rgba(255, 255, 255, 0.7)',
					z: 1,
				},
			},
		},
		plugins: {
			legend: {
				position: 'top',
				labels: {
					color: 'rgba(255, 255, 255, 0.8)',
					font: {
						size: 12,
					},
				},
			},
			tooltip: {
				backgroundColor: 'rgba(15, 23, 42, 0.9)',
				titleColor: 'rgba(255, 255, 255, 0.9)',
				bodyColor: 'rgba(255, 255, 255, 0.9)',
				borderColor: 'rgba(16, 185, 129, 0.6)',
				borderWidth: 1,
				padding: 12,
				cornerRadius: 6,
				callbacks: {
					label: function (context) {
						return `${context.label}: ${context.raw} kg CO₂`;
					},
				},
			},
		},
	};

	if (!chartData) {
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
		<div className='w-full h-[350px]'>
			<Radar data={chartData} options={options} />
		</div>
	);
};

export default RadarChart;
