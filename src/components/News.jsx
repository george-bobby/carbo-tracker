'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

const newsItems = [
	{
		id: 1,
		image:
			'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=400&h=300',
		title: 'Global CO2 Levels Hit New Record',
		date: 'March 15, 2024',
		excerpt:
			'Scientists warn of unprecedented rise in atmospheric carbon dioxide levels...',
		tag: 'Research',
		link: '/news/1',
	},
	{
		id: 2,
		image:
			'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400&h=300',
		title: 'Renewable Energy Surpasses Coal',
		date: 'March 14, 2024',
		excerpt:
			'Solar and wind power generation reaches historic milestone in energy sector...',
		tag: 'Energy',
		link: '/news/2',
	},
	{
		id: 3,
		image:
			'https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?auto=format&fit=crop&q=80&w=400&h=300',
		title: 'Arctic Ice Reaches Historic Low',
		date: 'March 13, 2024',
		excerpt:
			'Satellite data reveals concerning trends in polar ice coverage...',
		tag: 'Arctic',
		link: '/news/3',
	},
	{
		id: 4,
		image:
			'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=400&h=300',
		title: 'New Climate Policy Announced',
		date: 'March 12, 2024',
		excerpt: 'Major nations agree to strengthen emission reduction targets...',
		tag: 'Policy',
		link: '/news/4',
	},
];

export default function NewsSection() {
	const router = useRouter();
	const sliderRef = useRef(null);

	const scroll = (direction) => {
		const container = sliderRef.current;
		if (!container) return;

		const scrollAmount = 350; // Fixed scroll amount based on card width
		container.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth',
		});
	};

	return (
		<section className='relative py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden'>
			{/* Simplified background elements */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			<div className='container mx-auto px-4'>
				<div className='flex justify-between items-center mb-10'>
					<h2 className='text-3xl md:text-4xl font-bold text-white'>
						Latest <span className='text-emerald-400'>Climate</span> News
					</h2>
					<div className='flex gap-3'>
						<button
							onClick={() => scroll('left')}
							className='p-2 rounded-full bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-emerald-400 transition-all duration-300'
							aria-label='Previous news'
						>
							<ArrowLeft className='w-5 h-5' />
						</button>
						<button
							onClick={() => scroll('right')}
							className='p-2 rounded-full bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-emerald-400 transition-all duration-300'
							aria-label='Next news'
						>
							<ArrowRight className='w-5 h-5' />
						</button>
					</div>
				</div>

				{/* Improved News Slider */}
				<div
					ref={sliderRef}
					className='flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory'
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				>
					{newsItems.map((item) => (
						<div
							key={item.id}
							className='flex-none w-[320px] bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 flex flex-col snap-center'
						>
							<img
								src={item.image}
								alt={item.title}
								className='w-full h-44 object-cover rounded-t-xl'
							/>
							<div className='p-5 flex flex-col flex-grow'>
								<div className='flex justify-between items-center mb-2'>
									<span className='text-xs text-gray-400'>{item.date}</span>
									<span className='px-2 py-1 bg-emerald-900/50 text-emerald-400 rounded-full text-xs border border-emerald-500/20'>
										{item.tag}
									</span>
								</div>
								<h3 className='text-lg font-semibold mb-2 text-white'>
									{item.title}
								</h3>
								<p className='text-gray-300 text-sm mb-3 flex-grow'>
									{item.excerpt}
								</p>
								<button
									onClick={() => router.push(item.link)}
									className='text-emerald-400 font-medium hover:text-emerald-300 transition-colors text-sm'
								>
									Read More →
								</button>
							</div>
						</div>
					))}
				</div>

				<div className='text-center mt-10'>
					<button
						onClick={() => router.push('/news')}
						className='inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow hover:shadow-emerald-500/20 transition-all duration-300'
					>
						See All News
						<ExternalLink className='w-4 h-4' />
					</button>
				</div>
			</div>

			{/* CSS to hide scrollbar */}
			<style jsx>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</section>
	);
}
