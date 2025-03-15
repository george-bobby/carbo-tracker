'use client';
import React from 'react';
import { Car, Calendar, Users, Bell } from 'lucide-react';

export default function ComingSoon() {
	return (
		<section className='relative overflow-hidden py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
			{/* Background Elements */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			<div className='container mx-auto px-4 py-12'>
				<div className='flex justify-center mb-4'>
					<div className='inline-block px-4 py-1 bg-emerald-900/50 rounded-full backdrop-blur-sm border border-emerald-500/20'>
						<p className='text-xs md:text-sm font-medium text-emerald-400 tracking-wide text-center'>
							COMING SOON
						</p>
					</div>
				</div>

				<h2 className='text-4xl md:text-5xl font-bold text-white text-center mb-8'>
					<span className='text-emerald-400'>Carpooling</span> Service
				</h2>

				<p className='text-gray-300 text-center max-w-2xl mx-auto mb-12 text-lg'>
					Share rides, reduce emissions, and connect with fellow commuters in
					your community.
				</p>

				<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 md:p-10 max-w-4xl mx-auto'>
					<div className='flex justify-center mb-8'>
						<div className='h-20 w-20 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-500/30'>
							<Car className='h-10 w-10 text-emerald-400' />
						</div>
					</div>

					<h3 className='text-2xl md:text-3xl font-semibold text-white text-center mb-8'>
						Eco-Friendly Ride Sharing
					</h3>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
						<div className='flex flex-col items-center p-4 bg-slate-800/70 rounded-lg border border-slate-700'>
							<Calendar className='h-8 w-8 text-emerald-400 mb-3' />
							<h4 className='text-lg font-medium text-white mb-2'>
								Schedule Rides
							</h4>
							<p className='text-gray-300 text-center text-sm'>
								Plan your commute and find shared rides on your schedule
							</p>
						</div>

						<div className='flex flex-col items-center p-4 bg-slate-800/70 rounded-lg border border-slate-700'>
							<Users className='h-8 w-8 text-emerald-400 mb-3' />
							<h4 className='text-lg font-medium text-white mb-2'>
								Connect Locally
							</h4>
							<p className='text-gray-300 text-center text-sm'>
								Match with nearby commuters traveling your route
							</p>
						</div>

						<div className='flex flex-col items-center p-4 bg-slate-800/70 rounded-lg border border-slate-700'>
							<Bell className='h-8 w-8 text-emerald-400 mb-3' />
							<h4 className='text-lg font-medium text-white mb-2'>
								Get Notified
							</h4>
							<p className='text-gray-300 text-center text-sm'>
								Receive alerts when new rides become available
							</p>
						</div>
					</div>

					<div className='text-center'>
						<form className='flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6'>
							<input
								type='email'
								placeholder='Enter your email'
								className='flex-grow px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white'
								required
							/>
							<button
								type='submit'
								className='px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300'
							>
								Notify Me
							</button>
						</form>
						<p className='text-gray-400 text-sm'>
							Be the first to know when our carpooling service launches
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
