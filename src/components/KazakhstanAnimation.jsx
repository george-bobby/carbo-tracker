'use client';
import React from 'react';

const KazakhstanAnimation = () => {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{/* Kazakhstan Cityscape Background with Transparency */}
			<div className="absolute inset-0">
				{/* Main Cityscape Background Image */}
				<div
					className="cityscape-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: `url('/kazakhstan-cityscape.jpg'), url('/placeholder-cityscape.png')`,
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
						opacity: '0.6'
					}}>
				</div>

				{/* Gradient overlay to blend with current background */}
				<div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/50"></div>

				{/* Bottom gradient for better text readability */}
				<div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
			</div>

			{/* Animated Elements Layer */}
			<div className="absolute inset-0 opacity-20">
				{/* Moving Clouds over Cityscape */}
				<div className="absolute top-10 left-0 w-full h-32">
					<div className="cloud cloud-1 absolute top-4 bg-white/15 rounded-full"></div>
					<div className="cloud cloud-2 absolute top-8 bg-white/10 rounded-full"></div>
					<div className="cloud cloud-3 absolute top-2 bg-white/20 rounded-full"></div>
					<div className="cloud cloud-4 absolute top-6 bg-white/12 rounded-full"></div>
				</div>

				{/* Atmospheric particles */}
				<div className="particles absolute inset-0">
					<div className="particle particle-1 absolute w-1 h-1 bg-emerald-400/30 rounded-full"></div>
					<div className="particle particle-2 absolute w-1 h-1 bg-emerald-300/25 rounded-full"></div>
					<div className="particle particle-3 absolute w-1 h-1 bg-emerald-500/20 rounded-full"></div>
					<div className="particle particle-4 absolute w-1 h-1 bg-emerald-400/35 rounded-full"></div>
					<div className="particle particle-5 absolute w-1 h-1 bg-emerald-300/30 rounded-full"></div>
					<div className="particle particle-6 absolute w-1 h-1 bg-emerald-500/25 rounded-full"></div>
				</div>

				{/* Light rays sweeping across the cityscape */}
				<div className="light-rays absolute inset-0">
					<div className="light-ray ray-1 absolute h-0.5 bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent"></div>
					<div className="light-ray ray-2 absolute h-0.5 bg-gradient-to-r from-transparent via-emerald-300/10 to-transparent"></div>
					<div className="light-ray ray-3 absolute h-0.5 bg-gradient-to-r from-transparent via-emerald-500/8 to-transparent"></div>
				</div>

				{/* Floating City Elements */}
				<div className="floating-element element-1 absolute opacity-15">
					<svg width="50" height="50" viewBox="0 0 50 50" className="text-emerald-400/40">
						{/* Bayterek Tower Simplified */}
						<rect x="23" y="35" width="4" height="15" fill="currentColor"/>
						<circle cx="25" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
						<circle cx="25" cy="30" r="4" fill="currentColor" opacity="0.6"/>
						<path d="M17,30 L33,30 M25,22 L25,38" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
					</svg>
				</div>

				<div className="floating-element element-2 absolute opacity-12">
					<svg width="40" height="40" viewBox="0 0 40 40" className="text-emerald-300/30">
						{/* Modern Building Silhouette */}
						<rect x="10" y="15" width="8" height="25" fill="currentColor"/>
						<rect x="22" y="10" width="8" height="30" fill="currentColor"/>
						<rect x="12" y="17" width="2" height="2" fill="white" opacity="0.6"/>
						<rect x="16" y="17" width="2" height="2" fill="white" opacity="0.6"/>
						<rect x="24" y="12" width="2" height="2" fill="white" opacity="0.6"/>
						<rect x="28" y="12" width="2" height="2" fill="white" opacity="0.6"/>
					</svg>
				</div>

				<div className="floating-element element-3 absolute opacity-18">
					<svg width="35" height="35" viewBox="0 0 35 35" className="text-emerald-500/35">
						{/* Traditional Pattern with Modern Touch */}
						<circle cx="17.5" cy="17.5" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
						<rect x="12" y="12" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
						<circle cx="17.5" cy="17.5" r="3" fill="currentColor"/>
					</svg>
				</div>
			</div>

			{/* CSS Animations */}
			<style jsx>{`
				/* Cityscape Background Animation */
				.cityscape-bg {
					animation: parallaxMove 80s infinite ease-in-out, breathe 12s infinite ease-in-out;
					filter: contrast(1.1) brightness(0.85);
				}

				@keyframes parallaxMove {
					0%, 100% {
						transform: translateX(0px) scale(1.05);
						background-position: center center;
					}
					25% {
						transform: translateX(-15px) scale(1.07);
						background-position: 48% center;
					}
					50% {
						transform: translateX(8px) scale(1.1);
						background-position: 52% center;
					}
					75% {
						transform: translateX(-8px) scale(1.06);
						background-position: 49% center;
					}
				}

				@keyframes breathe {
					0%, 100% {
						filter: contrast(1.1) brightness(0.85);
					}
					50% {
						filter: contrast(1.15) brightness(0.9);
					}
				}

				/* Enhanced Cloud Animations */
				.cloud {
					width: 80px;
					height: 40px;
					animation: float 25s infinite linear;
				}
				.cloud-1 {
					left: -100px;
					animation-duration: 30s;
					animation-delay: 0s;
					width: 90px;
					height: 45px;
				}
				.cloud-2 {
					left: -150px;
					animation-duration: 35s;
					animation-delay: -12s;
					width: 70px;
					height: 35px;
				}
				.cloud-3 {
					left: -120px;
					animation-duration: 40s;
					animation-delay: -25s;
					width: 100px;
					height: 50px;
				}
				.cloud-4 {
					left: -180px;
					animation-duration: 45s;
					animation-delay: -35s;
					width: 85px;
					height: 42px;
				}

				@keyframes float {
					from {
						transform: translateX(-100px);
					}
					to {
						transform: translateX(calc(100vw + 100px));
					}
				}

				/* Floating City Elements Animations */
				.floating-element {
					animation: floatCityElement 25s infinite ease-in-out;
				}
				.element-1 {
					top: 15%;
					left: 8%;
					animation-delay: 0s;
				}
				.element-2 {
					top: 35%;
					right: 12%;
					animation-delay: -8s;
				}
				.element-3 {
					top: 55%;
					left: 15%;
					animation-delay: -16s;
				}

				@keyframes floatCityElement {
					0%, 100% {
						transform: translateY(0px) rotate(0deg) scale(1);
						opacity: 0.15;
					}
					25% {
						transform: translateY(-12px) rotate(3deg) scale(1.03);
						opacity: 0.25;
					}
					50% {
						transform: translateY(-6px) rotate(-2deg) scale(1.05);
						opacity: 0.2;
					}
					75% {
						transform: translateY(-15px) rotate(1deg) scale(1.02);
						opacity: 0.3;
					}
				}

				/* Atmospheric Particles Animation */
				.particle {
					animation: particleFloat 30s infinite linear;
				}
				.particle-1 {
					top: 20%;
					left: -10px;
					animation-delay: 0s;
				}
				.particle-2 {
					top: 40%;
					left: -15px;
					animation-delay: -6s;
				}
				.particle-3 {
					top: 60%;
					left: -8px;
					animation-delay: -12s;
				}
				.particle-4 {
					top: 30%;
					left: -12px;
					animation-delay: -18s;
				}
				.particle-5 {
					top: 50%;
					left: -18px;
					animation-delay: -24s;
				}
				.particle-6 {
					top: 70%;
					left: -6px;
					animation-delay: -30s;
				}

				@keyframes particleFloat {
					0% {
						transform: translateX(-10px) translateY(0px);
						opacity: 0;
					}
					10% {
						opacity: 1;
					}
					90% {
						opacity: 1;
					}
					100% {
						transform: translateX(calc(100vw + 10px)) translateY(-30px);
						opacity: 0;
					}
				}

				/* Light Rays Animation */
				.light-ray {
					width: 400px;
					animation: lightRayMove 15s infinite ease-in-out;
				}
				.ray-1 {
					top: 25%;
					left: -400px;
					animation-delay: 0s;
				}
				.ray-2 {
					top: 45%;
					left: -450px;
					width: 450px;
					animation-delay: -5s;
				}
				.ray-3 {
					top: 65%;
					left: -350px;
					width: 350px;
					animation-delay: -10s;
				}

				@keyframes lightRayMove {
					0% {
						transform: translateX(-400px) scaleX(0);
						opacity: 0;
					}
					15% {
						transform: translateX(-100px) scaleX(1);
						opacity: 1;
					}
					85% {
						transform: translateX(calc(100vw + 100px)) scaleX(1);
						opacity: 1;
					}
					100% {
						transform: translateX(calc(100vw + 400px)) scaleX(0);
						opacity: 0;
					}
				}

				/* Mobile Optimizations */
				@media (max-width: 768px) {
					.cityscape-bg {
						animation: parallaxMoveMobile 100s infinite ease-in-out;
						background-size: 150% auto;
					}

					.floating-element {
						animation-duration: 35s;
					}

					.particle {
						animation-duration: 40s;
					}

					.cloud {
						animation-duration: 50s;
					}

					.light-ray {
						animation-duration: 20s;
					}
				}

				@keyframes parallaxMoveMobile {
					0%, 100% {
						transform: translateX(0px) scale(1.5);
						background-position: center center;
					}
					50% {
						transform: translateX(-8px) scale(1.52);
						background-position: 49% center;
					}
				}
			`}</style>
		</div>
	);
};

export default KazakhstanAnimation;
