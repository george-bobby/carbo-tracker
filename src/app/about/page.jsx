'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Target, Award, Calendar, MapPin } from 'lucide-react';

export default function AboutUs() {
	const [activeTab, setActiveTab] = useState('all');
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setIsVisible(scrollPosition > 300);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const images = {
		hero: '/img1.png',
		logo: '/logo.png',
		viceChancellor: '/VC.png',
		coordinator: '/SC.png',
		activities: [
			{
				url: '/img1.png',
				alt: 'Tree Plantation Drive',
				title: 'Green Campus Initiative',
				description: 'Over 1000 trees planted across campus',
				date: 'March 15, 2024',
			},
			{
				url: '/img2.png',
				alt: 'Waste Management Workshop',
				title: 'Zero Waste Campaign',
				description: 'Teaching sustainable waste practices',
				date: 'March 20, 2024',
			},
			{
				url: '/img3.png',
				alt: 'Climate Conference',
				title: 'Climate Action Summit',
				description: 'Annual conference on climate change',
				date: 'April 5, 2024',
			},
			{
				url: '/img4.png',
				alt: 'Earth Hour',
				title: 'Earth Hour Celebration',
				description: 'Campus-wide energy conservation',
				date: 'March 30, 2024',
			},
		],
		gallery: [
			{
				url: '/img5.png',
				alt: 'Team Building',
				category: 'Events',
				description: 'Annual team building retreat',
			},
			{
				url: '/img6.png',
				alt: 'Plantation Drive',
				category: 'Activities',
				description: 'Community plantation initiative',
			},
			{
				url: '/img7.png',
				alt: 'Awareness Campaign',
				category: 'Campaigns',
				description: 'Street awareness program',
			},
			{
				url: '/img8.png',
				alt: 'Workshop',
				category: 'Education',
				description: 'Environmental education workshop',
			},
			{
				url: '/img9.png',
				alt: 'Community Event',
				category: 'Events',
				description: 'Community engagement program',
			},
			{
				url: '/img10.png',
				alt: 'Research Project',
				category: 'Research',
				description: 'Climate research presentation',
			},
			{
				url: '/img11.png',
				alt: 'Campus Initiative',
				category: 'Activities',
				description: 'Campus sustainability project',
			},
			{
				url: '/img12.png',
				alt: 'Environmental Day',
				category: 'Events',
				description: 'World Environment Day celebration',
			},
		],
		stats: [
			{ icon: Users, value: '1000+', label: 'Active Members' },
			{ icon: Target, value: '50+', label: 'Projects Completed' },
			{ icon: Award, value: '15+', label: 'Awards Won' },
			{ icon: Calendar, value: '100+', label: 'Events Organized' },
		],
	};

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Hero Section */}
			<div
				className='relative h-screen bg-cover bg-center bg-fixed'
				style={{ backgroundImage: `url(${images.hero})` }}
			>
				<div className='absolute inset-0 bg-slate-900 bg-opacity-70'></div>
				<div className='absolute inset-0 flex flex-col items-center justify-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center text-white px-4'
					>
						<h1 className='text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 font-serif'>
							<span className='bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600'>
								Christites for Climate Action
							</span>
						</h1>
						{/* Uncomment this section if needed */}
						{/* 
                        <p className="text-lg sm:text-xl font-semibold text-gray-300 mb-8">
                            Preserve nature, protect the future, act for change. <br /> Sustain To Survive
                        </p>
                        <a href="https://chat.whatsapp.com/D3dPl12GYDaGksPmOKrRPD" target="_blank" rel="noopener noreferrer">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(72,187,120,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-emerald-500/20 transition-all ease-in-out duration-300 transform"
                            >
                                Join Our Movement
                            </motion.button>
                        </a>
                        */}
					</motion.div>
				</div>
			</div>

			{/* Stats Section */}
			<div className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
						{images.stats.map((stat, index) => {
							const Icon = stat.icon;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className='text-center'
								>
									<div className='flex justify-center mb-4'>
										<Icon className='h-12 w-12 text-emerald-400' />
									</div>
									<h3 className='text-4xl font-bold text-white mb-2'>
										{stat.value}
									</h3>
									<p className='text-gray-300'>{stat.label}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>

			{/* About Section */}
			<div className='relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
				<div className='max-w-4xl mx-auto px-4'>
					<h2 className='text-4xl font-bold text-white mb-6'>
						About <span className='text-emerald-400'>CCA</span>
					</h2>
					<p className='text-gray-300 leading-relaxed mb-8'>
						CHRISTITES FOR CLIMATE ACTION (CCA) is a movement initiated by
						Rev.Fr.Dr.Jose CC, Vice Chancellor, CHRIST (Deemed to be
						University), to campaign for climate changes and its consequences on
						Mother Earth. This student-led movement started with an ultimate
						goal to take up the responsibility of conserving the environment
						from campus to societal level.
					</p>
					<p className='text-gray-300 leading-relaxed mb-8'>
						The emphasis in CCA is given on developing an Eco-friendly
						lifestyle. CCA believes that it's the primary responsibility of
						every CHRISTITE to be aware and create awareness about climatic
						changes which is a looming threat to all life on mother Earth.
					</p>
					<p className='text-gray-300 leading-relaxed mb-8'>
						The CCA adopts the UN Sustainable Development Goal 13, along with
						many other goals developed in the United Nation Sustainable
						Development Goals (2015) to urgently combat climate change, aligning
						with the broader UN goals for global peace and prosperity.
					</p>
				</div>
			</div>

			{/* Messages Section */}
			<div className='relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
				<div className='max-w-5xl mx-auto px-4'>
					<div className='grid md:grid-cols-2 gap-12'>
						{/* Vice Chancellor's Message */}
						<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-lg relative flex flex-col items-center text-center hover:shadow-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-800/80 hover:translate-y-1 transition-all duration-300'>
							<img
								src={images.viceChancellor}
								alt='Vice Chancellor'
								className='w-32 h-32 rounded-full border-4 border-emerald-500 shadow-lg object-cover mx-auto mb-4'
							/>
							<h3 className='text-2xl font-bold text-emerald-400 mb-4'>
								Vice Chancellor's Message
							</h3>
							<p className='text-gray-300 italic'>
								"Climate change poses a global threat, with global warming
								serving as its undeniable signal. Christites for Climate Action
								(CCA) is a movement to educate and create awareness among the
								human community to take responsible action towards conservation
								and stop destruction. Our collective actions today significantly
								influence the world we leave for future generations."
							</p>
						</div>

						{/* Coordinator's Message */}
						<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-lg relative flex flex-col items-center text-center hover:shadow-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-800/80 hover:translate-y-1 transition-all duration-300'>
							<img
								src={images.coordinator}
								alt='Coordinator'
								className='w-32 h-32 rounded-full border-4 border-emerald-500 shadow-lg object-cover mx-auto mb-4'
							/>
							<h3 className='text-2xl font-bold text-emerald-400 mb-4'>
								Coordinator's Message
							</h3>
							<p className='text-gray-300 italic'>
								"CCA is more than just a student initiative—it’s a
								transformative force driving awareness, action, and advocacy for
								climate responsibility. Let us work together in unity,
								compassion, and responsibility to create a greener and more
								sustainable tomorrow."
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
