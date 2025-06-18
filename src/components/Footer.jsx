'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	FaHome,
	FaCalculator,
	FaNewspaper,
	FaComments,
	FaLeaf,
	FaShoppingCart,
	FaChevronUp,
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaLinkedin,
} from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
	const { t } = useTranslation('common');

	// Function to scroll to the top of the page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth', // Smooth scroll effect
		});
	};

	return (
		<footer className='bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16'>
			<div className='container mx-auto px-4 sm:px-6 md:px-12'>
				<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-12'>
					{/* Navigation Links */}
					<div>
						<div className='flex items-center mb-6'>
							<FaLeaf className='text-emerald-400 text-2xl mr-2' />
							<h2 className='font-bold text-2xl tracking-tight text-emerald-400'>
								{t('header.appName')}
							</h2>
						</div>
						<p className='text-sm text-gray-300 mb-8 font-light'>
							{t('footer.description')}
						</p>
						<div className='space-y-4'>
							{[
								{
									icon: <FaCalculator className='text-emerald-400' />,
									label: t('header.navigation.calculator'),
									href: '/calculator',
								},
								{
									icon: <FaNewspaper className='text-emerald-400' />,
									label: t('header.navigation.news'),
									href: '/news',
								},
								{
									icon: <FaComments className='text-emerald-400' />,
									label: t('header.navigation.chatbot'),
									href: '/chatbot',
								},
								{
									icon: <FaLeaf className='text-emerald-400' />,
									label: t('header.navigation.ecocenter'),
									href: '/ecocenter',
								},
								{
									icon: <FaShoppingCart className='text-emerald-400' />,
									label: t('header.navigation.shop'),
									href: '/shop',
								},
							].map(({ icon, label, href }, index) => (
								<div key={index} className='flex items-center gap-3 group'>
									<div className='text-emerald-400'>{icon}</div>
									<Link
										href={href}
										className='text-sm text-gray-300 hover:text-emerald-400 transition-colors duration-300 group-hover:translate-x-1 inline-block transform'
									>
										{label}
									</Link>
								</div>
							))}
						</div>
					</div>

					{/* Our Mission */}
					<div>
						<h3 className='text-emerald-400 font-semibold text-lg mb-6 tracking-wide'>
							{t('footer.carbonFootprintTitle')}
						</h3>
						<div className='relative mb-8'>
							<div className='absolute left-0 top-0 w-16 h-1 bg-emerald-400'></div>
						</div>
						<p className='text-gray-300 leading-relaxed text-sm font-light mt-20'>
							{t('footer.carbonFootprintDescription')}
						</p>
					</div>

					{/* Contact & Connect */}
					<div className='flex flex-col items-center md:items-start text-center md:text-left'>
						<div className='mb-6'>
							<div className='mb-4 w-auto h-16 px-6 flex items-center justify-center bg-emerald-900/50 rounded-lg border-2 border-emerald-400/30 backdrop-blur-sm'>
								<div className='flex items-center'>
									<FaLeaf className='text-emerald-400 text-3xl mr-2' />
									<span className='text-emerald-400 font-bold text-2xl'>
										{t('header.appName')}
									</span>
								</div>
							</div>
							<h3 className='text-emerald-400 font-semibold text-lg mb-4 tracking-wide mt-10'>
								{t('footer.connectTitle')}
							</h3>
							<p className='text-gray-300 leading-relaxed max-w-md mb-8 text-sm font-light'>
								{t('footer.connectDescription')}
							</p>

							{/* Social Media Icons */}
							{/* <div className='flex space-x-4 mb-8 justify-center md:justify-start'>
								<a
									href='https://www.facebook.com/www.christuniversity.in/photos/christites-for-climate-action-cca-invites-you-to-be-a-part-of-a-meaningful-envir/1067363768739736/'
									className='w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300'
								>
									<FaFacebook className='text-white' />
								</a>
								<a
									href='https://www.instagram.com/cca.christ/'
									className='w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300'
								>
									<FaInstagram className='text-white' />
								</a>
								<a
									href='https://www.linkedin.com/company/christforclimate/'
									className='w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300'
								>
									<FaLinkedin className='text-white' />
								</a>
							</div> */}

							{/* <button
								onClick={scrollToTop}
								className='flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-md hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 group'
							>
								<FaChevronUp className='group-hover:-translate-y-1 transition-transform duration-300' />
								Back to Top
							</button> */}
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className='mt-16 border-t border-slate-700/50 pt-8 text-center text-gray-400 text-sm font-light flex flex-col md:flex-row justify-between items-center'>
					<p>{t('footer.copyright')}</p>
					{/* <div className='flex space-x-6 mt-4 md:mt-0'>
						<a
							href='/about'
							className='hover:text-emerald-400 transition-colors duration-300'
						>
							About Us
						</a>
						<a
							href='/contact'
							className='hover:text-emerald-400 transition-colors duration-300'
						>
							Contact Us
						</a>
					</div> */}
				</div>
			</div>
		</footer>
	);
}
