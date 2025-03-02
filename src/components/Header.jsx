'use client';
import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Link from 'next/link';
import {
	ClerkLoaded,
	ClerkLoading,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';
import {
	FaHome,
	FaCalculator,
	FaNewspaper,
	FaCar,
	FaShoppingCart,
	FaLeaf,
	FaRobot,
	FaBars,
	FaTimes,
	FaSignInAlt,
} from 'react-icons/fa';

function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [expandedItem, setExpandedItem] = useState(null);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Handle screen size change
	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 768); // Set to 768px for small screens
		};

		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll);

		handleResize(); // Initial check on load
		handleScroll(); // Initial scroll check

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const footerItems = [
		{ name: 'Dashboard', icon: <FaHome className='w-5 h-5' /> },
		{ name: 'Calculator', icon: <FaCalculator className='w-5 h-5' /> },
		{ name: 'Chatbot', icon: <FaRobot className='w-5 h-5' /> },
	];

	const headerItems = [
		{ name: 'Dashboard', icon: <FaHome className='w-4 h-4' /> },
		{ name: 'Calculator', icon: <FaCalculator className='w-4 h-4' /> },
		{ name: 'News', icon: <FaNewspaper className='w-4 h-4' /> },
		{ name: 'Carpool', icon: <FaCar className='w-4 h-4' /> },
		{ name: 'Shop', icon: <FaShoppingCart className='w-4 h-4' /> },
		{ name: 'Ecocenter', icon: <FaLeaf className='w-4 h-4' /> },
		{ name: 'Chatbot', icon: <FaRobot className='w-4 h-4' /> },
	];

	return (
		<>
			{/* Main Header */}
			<div
				className={`sticky top-0 z-50 ${
					scrolled ? 'backdrop-blur-md bg-slate-900/90' : 'bg-slate-900'
				} transition-all duration-300 shadow-lg`}
			>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex flex-wrap items-center justify-between'>
						<div className='flex flex-wrap items-center gap-4 w-full md:w-auto justify-between'>
							{/* Header Logo */}
							<Link href='/' className='flex items-center gap-2'>
								<div className='rounded-xl h-10 w-10 bg-emerald-500 flex items-center justify-center overflow-hidden'>
									<FaLeaf className='text-white text-xl' />
								</div>
								<span className='text-emerald-400 font-bold text-2xl tracking-tight'>
									Carbo
								</span>
							</Link>

							{/* Hamburger Menu Button */}
							<div className='block md:hidden'>
								<button
									onClick={() => setMenuOpen(!menuOpen)}
									className='text-white focus:outline-none bg-slate-800 p-2 rounded-md hover:bg-slate-700 transition-colors'
									aria-label={menuOpen ? 'Close menu' : 'Open menu'}
								>
									{menuOpen ? (
										<FaTimes className='w-5 h-5' />
									) : (
										<FaBars className='w-5 h-5' />
									)}
								</button>
							</div>

							{/* Navigation Links */}
							<div
								className={`${
									menuOpen ? 'block' : 'hidden'
								} md:flex gap-2 items-center mt-4 md:mt-0 w-full md:w-auto`}
							>
								<div className='flex flex-col md:flex-row gap-1 md:gap-2'>
									{headerItems
										.filter(
											(item) =>
												!isSmallScreen ||
												!['Dashboard', 'Calculator', 'Chatbot'].includes(
													item.name
												)
										)
										.map((item) => (
											<Link
												key={item.name}
												href={`/${item.name.toLowerCase()}`}
												className='text-gray-300 py-2 px-3 rounded-md font-medium hover:bg-slate-800 hover:text-emerald-400 transition-all duration-300 flex items-center gap-2 group'
												onClick={() => setMenuOpen(false)} // Close menu after navigation
											>
												<span className='text-emerald-500 group-hover:text-emerald-400 transition-colors duration-300'>
													{item.icon}
												</span>
												<span className='group-hover:translate-x-1 transition-transform duration-300'>
													{item.name}
												</span>
											</Link>
										))}
								</div>
							</div>
						</div>

						{/* Profile Section */}
						{!isSmallScreen && ( // Hide on smaller screens
							<div className='relative flex items-center justify-end mt-4 md:mt-0 hidden md:flex'>
								<ClerkLoading>
									<Spinner color='white' />
								</ClerkLoading>

								<ClerkLoaded>
									<SignedIn>
										<div className='relative group'>
											<div className='w-auto flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95'>
												<UserButton
													afterSignOutUrl='/'
													appearance={{
														elements: {
															userButtonAvatarBox: 'h-10 w-10',
														},
													}}
												/>
											</div>
										</div>
									</SignedIn>

									<SignedOut>
										<SignInButton mode='modal'>
											<button className='relative flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-2 px-4 rounded-md font-medium cursor-pointer shadow-lg transition-all duration-300 hover:shadow-emerald-500/20 hover:scale-105 active:scale-95'>
												<FaSignInAlt className='w-4 h-4' />
												<span>Sign In</span>
											</button>
										</SignInButton>
									</SignedOut>
								</ClerkLoaded>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Footer for smaller screens */}
			<div className='fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md flex justify-around items-center py-3 md:hidden border-t border-slate-800 z-[9] shadow-lg shadow-slate-900/50'>
				{footerItems.map((item, index) => (
					<div
						key={item.name}
						className='relative flex flex-col items-center'
						onTouchStart={() => setExpandedItem(index)}
						onClick={() =>
							setExpandedItem((prev) => (prev === index ? null : index))
						}
					>
						<Link
							href={`/${item.name.toLowerCase()}`}
							className={`relative flex items-center gap-2 transition-all duration-300 ease-in-out ${
								expandedItem === index ? 'scale-110' : 'scale-100'
							}`}
						>
							<div
								className={`text-white flex items-center justify-center rounded-full w-12 h-12 ${
									expandedItem === index
										? 'bg-emerald-600 text-white'
										: 'bg-slate-800 text-emerald-400'
								} transition-all duration-300`}
							>
								{item.icon}
							</div>

							{expandedItem === index && (
								<span className='absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-medium rounded-md px-3 py-1 shadow-lg whitespace-nowrap'>
									{item.name}
								</span>
							)}
						</Link>
					</div>
				))}
				<div className='bg-slate-800 rounded-full p-1 shadow-lg'>
					<UserButton
						afterSignOutUrl='/'
						appearance={{
							elements: {
								userButtonAvatarBox: 'h-10 w-10',
							},
						}}
					/>
				</div>
			</div>
		</>
	);
}

export default Header;
