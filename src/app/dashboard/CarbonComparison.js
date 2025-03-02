import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const CarbonComparison = ({ clerkId }) => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	// National averages in kg CO2 (monthly) - these are example values
	const nationalAverages = {
		transportation: 250,
		energyUse: 180,
		foodConsumption: 160,
		wasteManagement: 30,
		waterUsage: 15,
		socialActivities: 40,
		shopping: 70,
		buildingMaintenance: 25,
	};

	// Fetch user data
	const fetchData = async () => {
		try {
			const response = await fetch('/api/fetch');
			const fetchedData = await response.json();

			// Find the data for the given clerkId
			const data = fetchedData.find((item) => item.clerkId === clerkId);

			if (data) {
				setUserData(data);
				setLoading(false);
			} else {
				console.error('No data found for the given clerkId');
				setLoading(false);
			}
		} catch (error) {
			console.error('Error fetching comparison data:', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (clerkId) {
			fetchData();
		}
	}, [clerkId]);

	// Format data for side-by-side comparison
	const prepareComparisonData = () => {
		if (!userData) return null;

		const { categories } = userData;

		// Get common categories between user data and national averages
		const commonCategories = Object.keys(categories).filter(
			(category) => nationalAverages[category] !== undefined
		);

		// Format labels for display
		const labels = commonCategories.map((category) =>
			category
				.replace(/([A-Z])/g, ' $1')
				.replace(/^./, (str) => str.toUpperCase())
		);

		// Get user values and national average values
		const userValues = commonCategories.map(
			(category) => categories[category] || 0
		);
		const averageValues = commonCategories.map(
			(category) => nationalAverages[category]
		);

		return {
			labels,
			datasets: [
				{
					label: 'Your Footprint',
					data: userValues,
					backgroundColor: 'rgba(16, 185, 129, 0.7)',
					borderColor: 'rgba(16, 185, 129, 1)',
					borderWidth: 1,
					borderRadius: 4,
				},
				{
					label: 'National Average',
					data: averageValues,
					backgroundColor: 'rgba(148, 163, 184, 0.7)',
					borderColor: 'rgba(148, 163, 184, 1)',
					borderWidth: 1,
					borderRadius: 4,
				},
			],
		};
	};

	const options = {
		indexAxis: 'y',
		responsive: true,
		maintainAspectRatio: false,
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
						return `${context.dataset.label}: ${context.parsed.x.toFixed(
							1
						)} kg CO₂`;
					},
				},
			},
		},
		scales: {
			x: {
				grid: {
					color: 'rgba(255, 255, 255, 0.1)',
				},
				ticks: {
					color: 'rgba(255, 255, 255, 0.7)',
				},
				title: {
					display: true,
					text: 'Carbon Emissions (kg CO₂)',
					color: 'rgba(255, 255, 255, 0.9)',
				},
			},
			y: {
				grid: {
					color: 'rgba(255, 255, 255, 0.1)',
				},
				ticks: {
					color: 'rgba(255, 255, 255, 0.7)',
				},
			},
		},
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

	const comparisonData = prepareComparisonData();

	if (!comparisonData) {
		return (
			<div className='text-center py-8'>
				<p className='text-gray-400'>Unable to prepare comparison data.</p>
			</div>
		);
	}

	return (
		<div className='w-full h-[350px]'>
			<Bar data={comparisonData} options={options} />
		</div>
	);
};

export default CarbonComparison;
