import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = ({ clerkId }) => {
	const [dataArray, setDataArray] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			const response = await fetch('/api/fetch');
			const fetchedData = await response.json();

			// Find the data for the given clerkId
			const userData = fetchedData.find((item) => item.clerkId === clerkId);

			if (userData) {
				setDataArray(Object.values(userData.monthlyData)); // Get monthly data values
				setLoading(false);
			} else {
				console.error('No data found for the given clerkId');
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

	const data = {
		labels: months,
		datasets: [
			{
				label: 'Monthly Carbon Footprint',
				data: dataArray,
				backgroundColor: 'rgba(16, 185, 129, 0.6)',
				borderColor: 'rgba(16, 185, 129, 1)',
				borderWidth: 1,
				borderRadius: 6,
				hoverBackgroundColor: 'rgba(16, 185, 129, 0.8)',
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
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
				displayColors: false,
				callbacks: {
					label: function (context) {
						return `${context.parsed.y} kg CO₂`;
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
			},
			y: {
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

	return (
		<div className='w-full h-[400px]'>
			<Bar data={data} options={options} />
		</div>
	);
};

export default BarGraph;
