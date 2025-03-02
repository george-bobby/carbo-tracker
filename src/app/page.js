'use client';
import React, { useState } from 'react';
import {
	FaLeaf,
	FaChartLine,
	FaCalculator,
	FaArrowRight,
} from 'react-icons/fa';
import Link from 'next/link';

export default function Hero() {
	const [hoveredCard, setHoveredCard] = useState(null);

	const features = [
		{
			icon: <FaLeaf className='h-6 w-6' />,
			title: 'Track Your Footprint',
			description:
				'Monitor your daily carbon emissions and see your environmental impact in real-time.',
		},
		{
			icon: <FaChartLine className='h-6 w-6' />,
			title: 'Analyze Trends',
			description:
				'Visualize your progress over time with detailed charts and personalized insights.',
		},
		{
			icon: <FaCalculator className='h-6 w-6' />,
			title: 'Calculate Impact',
			description:
				'Make informed decisions with our comprehensive carbon calculator tool.',
		},
	];

	return (
		<div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
			{/* Background Elements */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			<div className='container mx-auto px-4 py-20 md:py-28'>
				{/* Main Hero Content */}
				<div className='flex flex-col md:flex-row gap-12 items-center justify-between'>
					{/* Left Content - Text */}
					<div className='w-full md:w-1/2 space-y-6 text-center md:text-left'>
						<div className='inline-block px-4 py-1 bg-emerald-900/50 rounded-full mb-2 backdrop-blur-sm border border-emerald-500/20'>
							<p className='text-xs md:text-sm font-medium text-emerald-400 tracking-wide'>
								REDUCE · TRACK · IMPROVE
							</p>
						</div>

						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight'>
							Track Your{' '}
							<span className='text-emerald-400'>Carbon Footprint</span> in
							Real-Time
						</h1>

						<p className='text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed font-light'>
							Take control of your environmental impact with our intuitive
							dashboard and personalized insights.
						</p>

						<div className='flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start'>
							<Link href='/calculator'>
								<button className='px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:translate-y-1 flex items-center justify-center gap-2 group'>
									Start Tracking
									<FaArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
								</button>
							</Link>

							<Link href='/shop'>
								<button className='px-8 py-3 bg-transparent border border-emerald-500/30 text-emerald-400 rounded-md font-medium hover:bg-emerald-500/10 transition-all duration-300 hover:border-emerald-500'>
									View Shop
								</button>
							</Link>
						</div>

						<div className='pt-6'>
							<p className='text-gray-400 text-sm'>
								Join <span className='text-white font-medium'>15,000+</span>{' '}
								eco-conscious users making a difference
							</p>
						</div>
					</div>

					{/* Right Content - Image or Graphics */}
					<div className='w-full md:w-1/2 flex justify-center md:justify-end'>
						<div className='relative w-full max-w-md'>
							<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 rounded-2xl blur-xl transform rotate-3'></div>
							<div className='relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105'>
								<div className='flex justify-between items-center mb-6'>
									<div className='flex items-center gap-2'>
										<div className='h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center'>
											<FaLeaf className='text-white' />
										</div>
										<span className='text-white font-bold'>
											Carbon Dashboard
										</span>
									</div>
									<div className='text-emerald-400 text-sm font-medium'>
										Today
									</div>
								</div>

								<div className='space-y-4 mb-6'>
									<div className='h-2 bg-slate-700 rounded-full overflow-hidden'>
										<div className='h-full w-3/4 bg-emerald-500 rounded-full'></div>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-400'>Your Footprint</span>
										<span className='text-white font-medium'>8.2 kg CO₂</span>
									</div>

									<div className='h-2 bg-slate-700 rounded-full overflow-hidden'>
										<div className='h-full w-1/2 bg-emerald-500 rounded-full'></div>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-400'>Average</span>
										<span className='text-white font-medium'>12.5 kg CO₂</span>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div className='bg-slate-700/50 p-4 rounded-lg'>
										<div className='text-xs text-gray-400 mb-1'>Transport</div>
										<div className='text-white font-medium'>3.6 kg CO₂</div>
									</div>
									<div className='bg-slate-700/50 p-4 rounded-lg'>
										<div className='text-xs text-gray-400 mb-1'>Energy</div>
										<div className='text-white font-medium'>2.8 kg CO₂</div>
									</div>
									<div className='bg-slate-700/50 p-4 rounded-lg'>
										<div className='text-xs text-gray-400 mb-1'>Food</div>
										<div className='text-white font-medium'>1.5 kg CO₂</div>
									</div>
									<div className='bg-slate-700/50 p-4 rounded-lg'>
										<div className='text-xs text-gray-400 mb-1'>Other</div>
										<div className='text-white font-medium'>0.3 kg CO₂</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Feature Cards */}
				<div className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-8'>
					{features.map((feature, index) => (
						<div
							key={index}
							className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/80'
							onMouseEnter={() => setHoveredCard(index)}
							onMouseLeave={() => setHoveredCard(null)}
						>
							<div
								className={`h-12 w-12 rounded-md flex items-center justify-center mb-4 transition-all duration-300 ${
									hoveredCard === index
										? 'bg-emerald-500 text-white'
										: 'bg-emerald-900/50 text-emerald-400'
								}`}
							>
								{feature.icon}
							</div>
							<h3 className='text-white font-semibold text-lg mb-2'>
								{feature.title}
							</h3>
							<p className='text-gray-400 text-sm leading-relaxed'>
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
