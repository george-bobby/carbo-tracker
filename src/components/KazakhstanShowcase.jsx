'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

const KazakhstanShowcase = () => {
	const { t } = useTranslation('common');

	return (
		<div className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 opacity-20">
				{/* Animated Yurt Silhouettes */}
				<div className="yurt-container absolute bottom-10 left-10">
					<svg width="80" height="60" viewBox="0 0 80 60" className="text-emerald-400/40">
						<path d="M10,50 Q10,30 40,30 Q70,30 70,50 L70,55 L10,55 Z" fill="currentColor"/>
						<path d="M40,30 L45,10 L35,10 Z" fill="currentColor"/>
						<circle cx="40" cy="45" r="3" fill="currentColor" opacity="0.6"/>
					</svg>
				</div>

				<div className="yurt-container absolute bottom-8 right-20">
					<svg width="60" height="45" viewBox="0 0 60 45" className="text-emerald-300/30">
						<path d="M8,38 Q8,23 30,23 Q52,23 52,38 L52,42 L8,42 Z" fill="currentColor"/>
						<path d="M30,23 L34,8 L26,8 Z" fill="currentColor"/>
						<circle cx="30" cy="34" r="2" fill="currentColor" opacity="0.6"/>
					</svg>
				</div>

				{/* Animated Golden Eagle */}
				<div className="eagle-flight absolute top-20 left-0">
					<svg width="40" height="30" viewBox="0 0 40 30" className="text-yellow-400/50">
						<path d="M5,15 Q10,10 20,15 Q30,10 35,15 Q30,20 20,15 Q10,20 5,15 Z" fill="currentColor"/>
						<circle cx="20" cy="15" r="2" fill="currentColor"/>
					</svg>
				</div>

				{/* Traditional Kazakh Ornaments */}
				<div className="ornament ornament-1 absolute top-1/4 left-1/4">
					<svg width="50" height="50" viewBox="0 0 50 50" className="text-emerald-400/30">
						<circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
						<circle cx="25" cy="25" r="12" fill="none" stroke="currentColor" strokeWidth="1"/>
						<path d="M25,5 L30,20 L25,15 L20,20 Z" fill="currentColor"/>
						<path d="M45,25 L30,30 L35,25 L30,20 Z" fill="currentColor"/>
						<path d="M25,45 L20,30 L25,35 L30,30 Z" fill="currentColor"/>
						<path d="M5,25 L20,20 L15,25 L20,30 Z" fill="currentColor"/>
					</svg>
				</div>

				<div className="ornament ornament-2 absolute top-3/4 right-1/3">
					<svg width="40" height="40" viewBox="0 0 40 40" className="text-emerald-500/25">
						<rect x="5" y="5" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeWidth="2"/>
						<circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
						<path d="M20,8 L24,16 L20,14 L16,16 Z" fill="currentColor"/>
						<path d="M32,20 L24,24 L26,20 L24,16 Z" fill="currentColor"/>
						<path d="M20,32 L16,24 L20,26 L24,24 Z" fill="currentColor"/>
						<path d="M8,20 L16,16 L14,20 L16,24 Z" fill="currentColor"/>
					</svg>
				</div>

				{/* Floating Particles */}
				<div className="particle particle-1 absolute w-2 h-2 bg-emerald-400/40 rounded-full"></div>
				<div className="particle particle-2 absolute w-1 h-1 bg-emerald-300/50 rounded-full"></div>
				<div className="particle particle-3 absolute w-3 h-3 bg-emerald-500/30 rounded-full"></div>
				<div className="particle particle-4 absolute w-1 h-1 bg-yellow-400/40 rounded-full"></div>
				<div className="particle particle-5 absolute w-2 h-2 bg-emerald-400/35 rounded-full"></div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center">
					<div className="inline-block px-6 py-2 bg-emerald-900/50 rounded-full mb-6 backdrop-blur-sm border border-emerald-500/20">
						<p className="text-sm font-medium text-emerald-400 tracking-wide">
							🇰🇿 ҚАЗАҚСТАН • KAZAKHSTAN • КАЗАХСТАН
						</p>
					</div>
					
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						{t('showcase.title', 'Preserving the Beauty of Central Asia')}
					</h2>
					
					<p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
						{t('showcase.description', 'From the vast steppes to the snow-capped peaks of Tian Shan, Kazakhstan\'s diverse landscape inspires our commitment to environmental protection and sustainable living.')}
					</p>
				</div>
			</div>

			{/* CSS Animations */}
			<style jsx>{`
				/* Yurt Animation */
				.yurt-container {
					animation: gentleBob 6s infinite ease-in-out;
				}

				@keyframes gentleBob {
					0%, 100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-5px);
					}
				}

				/* Eagle Flight Animation */
				.eagle-flight {
					animation: eagleFly 25s infinite linear;
				}

				@keyframes eagleFly {
					0% {
						transform: translateX(-50px) translateY(0px);
					}
					25% {
						transform: translateX(25vw) translateY(-10px);
					}
					50% {
						transform: translateX(50vw) translateY(-5px);
					}
					75% {
						transform: translateX(75vw) translateY(-15px);
					}
					100% {
						transform: translateX(calc(100vw + 50px)) translateY(-8px);
					}
				}

				/* Ornament Rotation */
				.ornament {
					animation: ornamentSpin 20s infinite linear;
				}
				.ornament-1 {
					animation-delay: 0s;
				}
				.ornament-2 {
					animation-delay: -10s;
				}

				@keyframes ornamentSpin {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				/* Particle Float Animation */
				.particle {
					animation: particleFloat 12s infinite ease-in-out;
				}
				.particle-1 {
					top: 20%;
					left: 15%;
					animation-delay: 0s;
				}
				.particle-2 {
					top: 60%;
					left: 80%;
					animation-delay: -3s;
				}
				.particle-3 {
					top: 40%;
					left: 70%;
					animation-delay: -6s;
				}
				.particle-4 {
					top: 80%;
					left: 30%;
					animation-delay: -9s;
				}
				.particle-5 {
					top: 30%;
					left: 50%;
					animation-delay: -12s;
				}

				@keyframes particleFloat {
					0%, 100% {
						transform: translateY(0px) translateX(0px);
						opacity: 0.3;
					}
					25% {
						transform: translateY(-20px) translateX(10px);
						opacity: 0.7;
					}
					50% {
						transform: translateY(-10px) translateX(-5px);
						opacity: 0.5;
					}
					75% {
						transform: translateY(-30px) translateX(15px);
						opacity: 0.8;
					}
				}
			`}</style>
		</div>
	);
};

export default KazakhstanShowcase;
