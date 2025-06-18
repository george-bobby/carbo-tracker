'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Heart, TreePine } from 'lucide-react';

export default function CallToAction() {
	const { t } = useTranslation('common');
	const [hoveredCard, setHoveredCard] = useState(null);

	const actions = [
		{
			icon: Users,
			title: t('action.joinCommunity.title'),
			description: t('action.joinCommunity.description'),
			buttonText: t('action.joinCommunity.buttonText'),
			link: 'https://iiasa.ac.at/news/dec-2024/carbon-farming-for-kazakhstan-and-asian-drylands-belt-discussed-at-cop29',
		},
		{
			icon: Heart,
			title: t('action.donate.title'),
			description: t('action.donate.description'),
			buttonText: t('action.donate.buttonText'),
			link: 'https://pulitzercenter.org/stories/kazakhstan-voluntary-carbon-market-grows-seed?form=donate',
		},
		{
			icon: TreePine,
			title: t('action.volunteer.title'),
			description: t('action.volunteer.description'),
			buttonText: t('action.volunteer.buttonText'),
			link: 'https://www.unv.org/news/unv-launches-first-regional-report-volunteering-central-asia',
		},
	];

	return (
		<section>
			{/* Background Elements */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			<div className='container mx-auto px-4 py-12'>
				<div className='flex justify-center mb-4'>
					<div className='inline-block px-4 py-1 bg-emerald-900/50 rounded-full backdrop-blur-sm border border-emerald-500/20'>
						<p className='text-xs md:text-sm font-medium text-emerald-400 tracking-wide text-center'>
							{t('action.subtitle')}
						</p>
					</div>
				</div>

				<h2 className='text-4xl md:text-5xl font-bold text-white text-center mb-16'>
					{t('action.title')}
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'>
					{actions.map((action, index) => (
						<div
							key={index}
							className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/80 hover:translate-y-1'
							onMouseEnter={() => setHoveredCard(index)}
							onMouseLeave={() => setHoveredCard(null)}
						>
							<div
								className={`h-16 w-16 rounded-md flex items-center justify-center mb-6 mx-auto transition-all duration-300 ${
									hoveredCard === index
										? 'bg-emerald-500 text-white'
										: 'bg-emerald-900/50 text-emerald-400'
								}`}
							>
								<action.icon className='h-8 w-8' />
							</div>

							<h3 className='text-2xl font-semibold text-white text-center mb-4'>
								{action.title}
							</h3>

							<p className='text-gray-300 text-center mb-8'>
								{action.description}
							</p>

							{action.link ? (
								<a
									href={action.link}
									target='_blank'
									rel='noopener noreferrer'
									className='w-full inline-block text-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:translate-y-1'
								>
									{action.buttonText}
								</a>
							) : (
								<button className='w-full px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:translate-y-1'>
									{action.buttonText}
								</button>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
