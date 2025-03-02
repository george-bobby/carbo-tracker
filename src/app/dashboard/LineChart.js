import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ clerkId }) => {
	const [chartData, setChartData] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			const response = await fetch('/api/fetch');
			const fetchedData = await response.json();

			// Find the data for the given clerkId
			const userData = fetchedData.find((item) => item.clerkId === clerkId);

			if (userData) {
				const monthlyData = userData.monthlyData;

				// Create arrays for labels and data values
				const months = Object.keys(monthlyData);
				const values = Object.values(monthlyData);

				// Create cumulative data (running total)
				const cumulativeValues = [];
				let runningTotal = 0;

				values.forEach((val) => {
					runningTotal += val;
					cumulativeValues.push(runningTotal);
				});

				setChartData({
					labels: months,
					datasets: [
						{
							label: 'Monthly Carbon Footprint',
							data: values,
							borderColor: 'rgba(16, 185, 129, 1)',
							backgroundColor: 'rgba(16, 185, 129, 0.1)',
							tension: 0.4,
							pointBackgroundColor: 'rgba(16, 185, 129, 1)',
							pointBorderColor: '#fff',
							pointBorderWidth: 2,
							pointRadius: 4,
							pointHoverRadius: 6,
							fill: false,
							yAxisID: 'y',
						},
						{
							label: 'Cumulative Carbon Footprint',
							data: cumulativeValues,
							borderColor: 'rgba(45, 212, 191, 1)',
							backgroundColor: 'rgba(45, 212, 191, 0.1)',
							borderDash: [5, 5],
							tension: 0.4,
							pointBackgroundColor: 'rgba(45, 212, 191, 1)',
							pointBorderColor: '#fff',
							pointBorderWidth: 2,
							pointRadius: 4,
							pointHoverRadius: 6,
							fill: false,
							yAxisID: 'y1',
						},
					],
				});
				setLoading(false);
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

	const options = {
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
				displayColors: true,
				callbacks: {
					label: function (context) {
						return `${context.dataset.label}: ${context.parsed.y} kg CO₂`;
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
				position: 'left',
				grid: {
					color: 'rgba(255, 255, 255, 0.1)',
				},
				ticks: {
					color: 'rgba(255, 255, 255, 0.7)',
				},
				title: {
					display: true,
					text: 'Monthly Emissions (kg CO₂)',
					color: 'rgba(255, 255, 255, 0.9)',
				},
			},
			y1: {
				position: 'right',
				grid: {
					drawOnChartArea: false,
				},
				ticks: {
					color: 'rgba(45, 212, 191, 0.9)',
				},
				title: {
					display: true,
					text: 'Cumulative Emissions (kg CO₂)',
					color: 'rgba(45, 212, 191, 0.9)',
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
		<div className='w-full h-[350px]'>
			<Line data={chartData} options={options} />
		</div>
	);
};

export default LineChart;
