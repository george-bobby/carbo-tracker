'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	Leaf,
	Users,
	Target,
	Award,
	Calendar,
	MapPin,
	Clock,
	ChevronRight,
} from 'lucide-react';

export default function AboutUs() {
	const [activeTab, setActiveTab] = useState('All');
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
				location: 'Central Campus',
			},
			{
				url: '/img2.png',
				alt: 'Waste Management Workshop',
				title: 'Zero Waste Campaign',
				description: 'Teaching sustainable waste practices',
				date: 'March 20, 2024',
				location: 'Sustainability Center',
			},
			{
				url: '/img3.png',
				alt: 'Climate Conference',
				title: 'Climate Action Summit',
				description: 'Annual conference on climate change',
				date: 'April 5, 2024',
				location: 'Main Auditorium',
			},
			{
				url: '/img4.png',
				alt: 'Earth Hour',
				title: 'Earth Hour Celebration',
				description: 'Campus-wide energy conservation',
				date: 'March 30, 2024',
				location: 'University Grounds',
			},
		],
		upcomingEvents: [
			{
				title: 'Sustainability Workshop',
				date: 'June 15, 2024',
				time: '10:00 AM - 12:00 PM',
				location: 'Green Hall',
				description: 'Learn practical sustainability practices for daily life',
			},
			{
				title: 'Eco-Friendly Product Fair',
				date: 'June 22, 2024',
				time: '9:00 AM - 4:00 PM',
				location: 'University Plaza',
				description: 'Discover sustainable alternatives to everyday products',
			},
			{
				title: 'Climate Change Panel',
				date: 'July 5, 2024',
				time: '2:00 PM - 4:00 PM',
				location: 'Main Auditorium',
				description: 'Experts discuss current climate challenges and solutions',
			},
			{
				title: 'Community Cleanup Day',
				date: 'July 12, 2024',
				time: '8:00 AM - 11:00 AM',
				location: 'Local Community Park',
				description: 'Join us in cleaning and greening our neighborhood',
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
			{/* <div
				className='relative h-screen bg-cover bg-center bg-fixed'
				style={{ backgroundImage: `url(${images.hero})` }}
			>
				<div className='absolute inset-0 bg-slate-900 bg-opacity-70'></div>
				<div className='absolute inset-0 flex flex-col items-center justify-center px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center text-white max-w-4xl'
					>
						<img
							src={images.logo}
							alt='CCA Logo'
							className='w-24 h-24 mx-auto mb-6'
						/>
						<h1 className='text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 font-serif'>
							<span className='bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600'>
								Christites for Climate Action
							</span>
						</h1>
						<p className='text-lg sm:text-xl font-medium text-gray-300 mb-8 leading-relaxed'>
							Preserve nature, protect the future, act for change. <br />
							Sustain To Survive - Join our movement for a greener tomorrow.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<a
								href='https://www.unv.org/news/unv-launches-first-regional-report-volunteering-central-asia'
								target='_blank'
								rel='noopener noreferrer'
							>
								<motion.button
									whileHover={{
										scale: 1.05,
										boxShadow: '0 0 25px rgba(72,187,120,0.5)',
									}}
									whileTap={{ scale: 0.95 }}
									className='bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-emerald-500/20 transition-all ease-in-out duration-300 transform'
								>
									Join Our Movement
								</motion.button>
							</a>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-emerald-500/10 transition-all ease-in-out duration-300 transform'
							>
								Learn More
							</motion.button>
						</div>
					</motion.div>
				</div>
			</div> */}

			{/* Stats Section */}
			<div className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20'>
				<div className='container mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className='max-w-4xl mx-auto text-center mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
							Our Impact in Numbers
						</h2>
						<p className='text-gray-400 text-lg'>
							Dedicated to making a measurable difference in our community and
							beyond
						</p>
					</motion.div>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto'>
						{images.stats.map((stat, index) => {
							const Icon = stat.icon;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1, duration: 0.5 }}
									className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300'
								>
									<div className='flex justify-center mb-6'>
										<Icon className='h-12 w-12 text-emerald-400' />
									</div>
									<h3 className='text-4xl font-bold text-white mb-2'>
										{stat.value}
									</h3>
									<p className='text-gray-300 text-sm uppercase tracking-wider'>
										{stat.label}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>

			{/* About Section */}
			<div className='relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
				<div className='max-w-6xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='flex flex-col md:flex-row gap-12 items-center'
					>
						<div className='md:w-1/2'>
							<img
								src='/about-image.png'
								alt='CCA Team'
								className='rounded-xl shadow-2xl border border-slate-700 w-full h-auto'
							/>
						</div>
						<div className='md:w-1/2'>
							<h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
								About <span className='text-emerald-400'>CCA</span>
							</h2>
							<p className='text-gray-300 leading-relaxed mb-6'>
								CHRISTITES FOR CLIMATE ACTION (CCA) is a movement initiated by
								Rev.Fr.Dr.Jose CC, Vice Chancellor, CHRIST (Deemed to be
								University), to campaign for climate changes and its
								consequences on Mother Earth. This student-led movement started
								with an ultimate goal to take up the responsibility of
								conserving the environment from campus to societal level.
							</p>
							<p className='text-gray-300 leading-relaxed mb-6'>
								The emphasis in CCA is given on developing an Eco-friendly
								lifestyle. CCA believes that it's the primary responsibility of
								every CHRISTITE to be aware and create awareness about climatic
								changes which is a looming threat to all life on mother Earth.
							</p>
							<p className='text-gray-300 leading-relaxed mb-8'>
								The CCA adopts the UN Sustainable Development Goal 13, along
								with many other goals developed in the United Nation Sustainable
								Development Goals (2015) to urgently combat climate change,
								aligning with the broader UN goals for global peace and
								prosperity.
							</p>
							<div className='flex flex-wrap gap-4'>
								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.98 }}
									className='bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300'
								>
									Our Mission
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.98 }}
									className='border border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 px-6 py-3 rounded-lg font-medium transition-colors duration-300'
								>
									Core Values
								</motion.button>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Messages Section */}
			<div className='relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
				<div className='max-w-6xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='text-center mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
							Leadership Messages
						</h2>
						<p className='text-gray-400 text-lg max-w-2xl mx-auto'>
							Hear from our visionary leaders driving the climate action
							movement
						</p>
					</motion.div>

					<div className='grid md:grid-cols-2 gap-8'>
						{/* Vice Chancellor's Message */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl hover:shadow-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300'
						>
							<div className='flex flex-col items-center text-center'>
								<img
									src={images.viceChancellor}
									alt='Vice Chancellor'
									className='w-40 h-40 rounded-full border-4 border-emerald-500 shadow-lg object-cover mx-auto mb-6'
								/>
								<h3 className='text-2xl font-bold text-emerald-400 mb-4'>
									Vice Chancellor's Message
								</h3>
								<p className='text-gray-300 mb-6 italic'>
									"Climate change poses a global threat, with global warming
									serving as its undeniable signal. Christites for Climate
									Action (CCA) is a movement to educate and create awareness
									among the human community to take responsible action towards
									conservation and stop destruction. Our collective actions
									today significantly influence the world we leave for future
									generations."
								</p>
								<div className='text-emerald-400 font-medium flex items-center'>
									<span>Read Full Message</span>
									<ChevronRight className='ml-1 h-5 w-5' />
								</div>
							</div>
						</motion.div>

						{/* Coordinator's Message */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl hover:shadow-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300'
						>
							<div className='flex flex-col items-center text-center'>
								<img
									src={images.coordinator}
									alt='Coordinator'
									className='w-40 h-40 rounded-full border-4 border-emerald-500 shadow-lg object-cover mx-auto mb-6'
								/>
								<h3 className='text-2xl font-bold text-emerald-400 mb-4'>
									Coordinator's Message
								</h3>
								<p className='text-gray-300 mb-6 italic'>
									"CCA is more than just a student initiative—it's a
									transformative force driving awareness, action, and advocacy
									for climate responsibility. Let us work together in unity,
									compassion, and responsibility to create a greener and more
									sustainable tomorrow."
								</p>
								<div className='text-emerald-400 font-medium flex items-center'>
									<span>Read Full Message</span>
									<ChevronRight className='ml-1 h-5 w-5' />
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Activities Section */}
			<div className='relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
				<div className='max-w-6xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='text-center mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
							Our Recent Activities
						</h2>
						<p className='text-gray-400 text-lg max-w-2xl mx-auto'>
							See how we're making a difference through our initiatives
						</p>
					</motion.div>

					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{images.activities.map((activity, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
								className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:shadow-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300'
							>
								<div className='relative pt-[70%] overflow-hidden'>
									<img
										src={activity.url}
										alt={activity.alt}
										className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105'
									/>
								</div>
								<div className='p-6'>
									<div className='flex items-center text-gray-400 text-sm mb-2'>
										<Calendar className='h-4 w-4 mr-1' />
										<span>{activity.date}</span>
									</div>
									<h3 className='text-xl font-bold text-white mb-2'>
										{activity.title}
									</h3>
									<p className='text-gray-300 mb-4'>{activity.description}</p>
									<div className='flex items-center text-gray-400 text-sm'>
										<MapPin className='h-4 w-4 mr-1' />
										<span>{activity.location}</span>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<div className='text-center mt-12'>
						<motion.button
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
							className='border border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 px-8 py-3 rounded-lg font-medium transition-colors duration-300'
						>
							View All Activities
						</motion.button>
					</div>
				</div>
			</div>

			{/* Events Section */}
			<div className='relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
				<div className='max-w-6xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='text-center mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
							Upcoming Events
						</h2>
						<p className='text-gray-400 text-lg max-w-2xl mx-auto'>
							Join us in our upcoming initiatives and activities
						</p>
					</motion.div>

					<div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
						{images.upcomingEvents.map((event, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
								className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:shadow-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300'
							>
								<h3 className='text-xl font-bold text-white mb-3'>
									{event.title}
								</h3>
								<p className='text-gray-300 mb-4'>{event.description}</p>

								<div className='space-y-3'>
									<div className='flex items-center text-gray-400'>
										<Calendar className='h-5 w-5 mr-2' />
										<span>{event.date}</span>
									</div>
									<div className='flex items-center text-gray-400'>
										<Clock className='h-5 w-5 mr-2' />
										<span>{event.time}</span>
									</div>
									<div className='flex items-center text-gray-400'>
										<MapPin className='h-5 w-5 mr-2' />
										<span>{event.location}</span>
									</div>
								</div>

								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.98 }}
									className='mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition-colors duration-300'
								>
									Register Now
								</motion.button>
							</motion.div>
						))}
					</div>

					<div className='text-center mt-12'>
						<motion.button
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
							className='border border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 px-8 py-3 rounded-lg font-medium transition-colors duration-300'
						>
							View All Events
						</motion.button>
					</div>
				</div>
			</div>

			{/* Gallery Section */}
			<div className='relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
				<div className='max-w-6xl mx-auto px-6'>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='text-center mb-16'
					>
						<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
							Our Gallery
						</h2>
						<p className='text-gray-400 text-lg max-w-2xl mx-auto'>
							Moments that capture our journey towards sustainability
						</p>
					</motion.div>

					<div className='flex justify-center mb-8'>
						<div className='inline-flex rounded-md shadow-sm'>
							{['All', 'Events', 'Activities', 'Campaigns', 'Research'].map(
								(tab) => (
									<button
										key={tab}
										onClick={() => setActiveTab(tab.toLowerCase())}
										className={`px-4 py-2 text-sm font-medium ${
											activeTab === tab.toLowerCase()
												? 'bg-emerald-500 text-white'
												: 'bg-slate-700/50 text-gray-300 hover:bg-slate-700/80'
										} ${tab === 'All' ? 'rounded-l-lg' : ''} ${
											tab === 'Research' ? 'rounded-r-lg' : ''
										}`}
									>
										{tab}
									</button>
								)
							)}
						</div>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{images.gallery
							.filter(
								(item) =>
									activeTab === 'All' ||
									item.category.toLowerCase() === activeTab
							)
							.map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.05, duration: 0.3 }}
									className='group relative overflow-hidden rounded-xl'
								>
									<img
										src={item.url}
										alt={item.alt}
										className='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
										<span className='text-xs font-medium text-emerald-400 mb-1'>
											{item.category}
										</span>
										<p className='text-white font-medium'>{item.description}</p>
									</div>
								</motion.div>
							))}
					</div>

					<div className='text-center mt-12'>
						<motion.button
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
							className='border border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 px-8 py-3 rounded-lg font-medium transition-colors duration-300'
						>
							View Full Gallery
						</motion.button>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
				<div className='max-w-4xl mx-auto px-6 text-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12'
					>
						<h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
							Ready to Make a Difference?
						</h2>
						<p className='text-gray-300 text-lg mb-8 max-w-2xl mx-auto'>
							Join our community of climate activists and be part of the
							solution. Together, we can create a sustainable future.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-emerald-500/20 transition-all ease-in-out duration-300 transform'
							>
								Become a Member
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-emerald-500/10 transition-all ease-in-out duration-300 transform'
							>
								Contact Us
							</motion.button>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Back to Top Button */}
			{isVisible && (
				<motion.button
					onClick={scrollToTop}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed bottom-8 right-8 bg-emerald-500 text-white p-3 rounded-full shadow-xl hover:bg-emerald-600 transition-colors duration-300 z-50'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M5 10l7-7m0 0l7 7m-7-7v18'
						/>
					</svg>
				</motion.button>
			)}
		</div>
	);
}
