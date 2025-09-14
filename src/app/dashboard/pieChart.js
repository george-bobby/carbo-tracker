import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ clerkId, refresh }) => {
	const [chartData, setChartData] = useState(null);

	const fetchData = async () => {
		try {
			const fetchedData = await fetch('/api/fetch').then(res => res.json());

			let userData = fetchedData.find(item => item.clerkId === clerkId);

			if (!userData) {
				console.warn(`No data for clerkId: ${clerkId}, using default.`);
				const defaultClerkId = 'user_2rUkwh8E63sBgJ8XGFKtKcEREbF';
				userData = fetchedData.find(item => item.clerkId === defaultClerkId);
			}

			if (!userData) {
				console.error('No data for given or default clerkId');
				setChartData({ labels: [], datasets: [] });
				return;
			}

			const { categories } = userData;
			const labels = Object.keys(categories);
			const dataValues = Object.values(categories);

			const backgroundColors = [
				'rgba(16, 185, 129, 0.7)',
				'rgba(5, 150, 105, 0.7)',
				'rgba(4, 120, 87, 0.7)',
				'rgba(6, 95, 70, 0.7)',
				'rgba(6, 78, 59, 0.7)',
				'rgba(14, 159, 110, 0.7)',
				'rgba(20, 184, 166, 0.7)',
				'rgba(45, 212, 191, 0.7)',
			];

			const borderColors = backgroundColors.map(c => c.replace('0.7', '1'));

			setChartData({
				labels,
				datasets: [
					{
						data: dataValues,
						backgroundColor: backgroundColors,
						borderColor: borderColors,
						borderWidth: 2,
					},
				],
			});
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	};

	useEffect(() => {
		if (clerkId) fetchData();
	}, [clerkId, refresh]); // ✅ now listens to refresh

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					color: 'rgba(255, 255, 255, 0.8)',
					padding: 15,
					usePointStyle: true,
					pointStyleWidth: 10,
					font: { size: 12 },
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
					label: ctx => `${ctx.label}: ${ctx.parsed} kg CO₂`,
				},
			},
		},
	};

	if (!chartData) {
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
		<div className='w-full h-[350px]'>
			<Pie data={chartData} options={options} />
		</div>
	);
};

export default PieChart;
