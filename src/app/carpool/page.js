'use client';
import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Star, Check, MapPin, Car, Users, Navigation } from 'lucide-react';
import allRides from './ridesData';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../components/ui/dialog';
import { useUser } from '@clerk/nextjs';

const RideBooking = () => {
	const [startLocation, setStartLocation] = useState('');
	const [destination, setDestination] = useState('');
	const [selectedRide, setSelectedRide] = useState(null);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [filteredRides, setFilteredRides] = useState([]);
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [confirmedRideId, setConfirmedRideId] = useState(null);
	const [searchOn, setSearchOn] = useState(false);
	const [newRide, setNewRide] = useState({
		start: '',
		end: '',
		car: '',
		seats: 0,
		driver: '',
		distance: '',
		pickupPoint: '',
	});

	const { user } = useUser();

	const handleSearch = () => {
		if (!startLocation && !destination) {
			setFilteredRides(allRides);
			setIsSearchActive(false);
			setSearchOn(false);
			return;
		}

		const filtered = allRides.filter((ride) => {
			const startMatch =
				ride.start.toLowerCase() === startLocation.toLowerCase().trim();
			const endMatch =
				ride.end.toLowerCase() === destination.toLowerCase().trim();
			return startMatch && endMatch;
		});

		setFilteredRides(filtered);
		setIsSearchActive(true);
		setSearchOn(true);
	};

	const handleCancelSearch = () => {
		setStartLocation('');
		setDestination('');
		setFilteredRides([]);
		setIsSearchActive(false);
		setSearchOn(false);
	};

	const handleBookRide = (ride) => {
		setSelectedRide(ride);
		setShowConfirmDialog(true);
	};

	const handleConfirmBooking = () => {
		setConfirmedRideId(selectedRide.id);
		setShowConfirmDialog(false);
		setSelectedRide(null);
	};

	const handleCreateRide = () => {
		if (newRide.start && newRide.end && newRide.car && newRide.seats > 0) {
			const newRideEntry = {
				id: allRides.length + 1,
				...newRide,
			};
			allRides.push(newRideEntry);
			alert('Ride created successfully!');
			setNewRide({
				start: '',
				end: '',
				car: '',
				seats: 0,
				driver: '',
				distance: '',
				pickupPoint: '',
			});
		} else {
			alert('Please fill all fields to create a ride.');
		}
	};

	const displayRides = isSearchActive ? filteredRides : allRides;

	const RideCard = ({ ride }) => {
		const isConfirmed = ride.id === confirmedRideId;

		return (
			<Card
				className={`overflow-hidden transition-all duration-300 border ${
					isConfirmed ? 'border-emerald-500' : 'border-slate-700/20'
				}`}
			>
				<div className='flex items-start gap-4 p-4 backdrop-blur-sm bg-slate-800/50'>
					<div className='w-12 h-12 rounded-full bg-emerald-900/50 flex items-center justify-center'>
						<img
							src={ride.image || '/api/placeholder/40/40'}
							alt={ride.driver}
							className='w-10 h-10 rounded-full object-cover'
						/>
					</div>
					<div className='flex-1'>
						<div className='flex justify-between items-start'>
							<div>
								<h3 className='font-medium flex items-center text-white'>
									{ride.driver}
									<span className='text-gray-400 text-sm ml-2'>
										{ride.distance}
									</span>
									{isConfirmed && (
										<span className='ml-2 flex items-center text-emerald-400 text-sm font-medium'>
											<Check className='w-4 h-4 mr-1' />
											Booking Confirmed
										</span>
									)}
								</h3>
								<p className='text-sm text-gray-300 flex items-center mt-1'>
									<Navigation className='w-3 h-3 mr-1' />
									{ride.start} to {ride.end}
								</p>
								<div className='flex items-center gap-4 mt-2'>
									<p className='text-xs text-gray-400 flex items-center'>
										<Car className='w-3 h-3 mr-1' /> {ride.car}
									</p>
									<p className='text-xs text-gray-400 flex items-center'>
										<Users className='w-3 h-3 mr-1' />
										{isConfirmed ? ride.seats - 1 : ride.seats} seats
									</p>
								</div>
								<div className='flex items-center mt-1 text-xs text-gray-400'>
									<MapPin className='w-3 h-3 mr-1' />
									{ride.pickupPoint}
								</div>
							</div>
							<div className='flex items-center bg-slate-700/50 px-2 py-1 rounded text-xs'>
								{ride.rating}
								<Star className='w-3 h-3 text-yellow-400 ml-1' />
							</div>
						</div>
						{!isConfirmed && (
							<Button
								variant='outline'
								size='sm'
								className='mt-3 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-300 hover:border-emerald-500'
								onClick={() => handleBookRide(ride)}
							>
								Book this ride
							</Button>
						)}
					</div>
				</div>
			</Card>
		);
	};

	return (
		<div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen'>
			{/* Background Elements */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			<div className='container mx-auto px-4 py-12'>
				<div className='inline-block px-4 py-1 bg-emerald-900/50 rounded-full mb-6 backdrop-blur-sm border border-emerald-500/20 mx-auto'>
					<p className='text-xs md:text-sm font-medium text-emerald-400 tracking-wide'>
						SHARE · RIDE · REDUCE EMISSIONS
					</p>
				</div>

				<h1 className='text-3xl md:text-4xl font-bold text-white text-center mb-10 leading-tight'>
					Smart <span className='text-emerald-400'>Carpooling</span> for a
					Greener Planet
				</h1>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Left Side - Create a Ride Section */}
					<div className='backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 flex flex-col'>
						<h2 className='text-2xl font-bold text-white mb-6 flex items-center'>
							<div className='h-8 w-8 rounded-md flex items-center justify-center bg-emerald-900/50 text-emerald-400 mr-2'>
								<Car className='h-5 w-5' />
							</div>
							Create a Ride
						</h2>
						<div className='grid grid-cols-1 gap-4 w-full'>
							<Input
								placeholder={`Name: ${user?.firstName || ''}${
									user?.lastName ? ` ${user?.lastName}` : ''
								}`}
								value={`${user?.firstName || ''}${
									user?.lastName ? ` ${user?.lastName}` : ''
								}`}
								className='bg-slate-700/50 border-slate-600 text-white'
								readOnly
							/>
							<div className='relative'>
								<Input
									placeholder='Start Location'
									value={newRide.start}
									onChange={(e) =>
										setNewRide({ ...newRide, start: e.target.value })
									}
									className='bg-slate-700/50 border-slate-600 text-white'
									list='createStartLocations'
								/>
								<datalist id='createStartLocations'>
									{Array.from(new Set(allRides.map((ride) => ride.start))).map(
										(location) => (
											<option key={location} value={location} />
										)
									)}
								</datalist>
							</div>
							<div className='relative'>
								<Input
									placeholder='Destination'
									value={newRide.end}
									onChange={(e) =>
										setNewRide({ ...newRide, end: e.target.value })
									}
									className='bg-slate-700/50 border-slate-600 text-white'
									list='createDestinations'
								/>
								<datalist id='createDestinations'>
									{Array.from(new Set(allRides.map((ride) => ride.end))).map(
										(location) => (
											<option key={location} value={location} />
										)
									)}
								</datalist>
							</div>
							<Input
								placeholder='Car Model'
								value={newRide.car}
								onChange={(e) =>
									setNewRide({ ...newRide, car: e.target.value })
								}
								className='bg-slate-700/50 border-slate-600 text-white'
							/>
							<Input
								placeholder='Distance'
								value={newRide.distance}
								onChange={(e) =>
									setNewRide({ ...newRide, distance: e.target.value })
								}
								className='bg-slate-700/50 border-slate-600 text-white'
							/>
							<Input
								placeholder='Pickup Point'
								value={newRide.pickupPoint}
								onChange={(e) =>
									setNewRide({ ...newRide, pickupPoint: e.target.value })
								}
								className='bg-slate-700/50 border-slate-600 text-white'
							/>
							<div className='relative'>
								<Input
									type='number'
									placeholder='Seats Available'
									value={newRide.seats || ''}
									onChange={(e) =>
										setNewRide({
											...newRide,
											seats: parseInt(e.target.value) || 0,
										})
									}
									className='bg-slate-700/50 border-slate-600 text-white'
								/>
							</div>

							<Button
								className='px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:translate-y-1 w-full'
								onClick={handleCreateRide}
							>
								Create Ride
							</Button>
						</div>
					</div>

					{/* Right Side - Pick a Ride Section */}
					<div className='backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 flex flex-col'>
						<h2 className='text-2xl font-bold text-white mb-6 flex items-center'>
							<div className='h-8 w-8 rounded-md flex items-center justify-center bg-emerald-900/50 text-emerald-400 mr-2'>
								<Users className='h-5 w-5' />
							</div>
							Join a Ride
						</h2>
						<div className='grid grid-cols-12 gap-4 mb-6 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm bg-slate-700/20'>
							<div className='col-span-12 md:col-span-5'>
								<label className='block text-xs font-medium mb-2 text-emerald-400'>
									START FROM
								</label>
								<Input
									placeholder='e.g. Kengeri'
									value={startLocation}
									onChange={(e) => setStartLocation(e.target.value)}
									className='bg-slate-700/50 border-slate-600 text-white'
									list='startLocations'
								/>
								<datalist id='startLocations'>
									{Array.from(new Set(allRides.map((ride) => ride.start))).map(
										(location) => (
											<option key={location} value={location} />
										)
									)}
								</datalist>
							</div>
							<div className='col-span-12 md:col-span-5'>
								<label className='block text-xs font-medium mb-2 text-emerald-400'>
									DESTINATION
								</label>
								<Input
									placeholder='e.g. Rajajinagar'
									value={destination}
									onChange={(e) => setDestination(e.target.value)}
									className='bg-slate-700/50 border-slate-600 text-white'
									list='destinations'
								/>
								<datalist id='destinations'>
									{Array.from(new Set(allRides.map((ride) => ride.end))).map(
										(location) => (
											<option key={location} value={location} />
										)
									)}
								</datalist>
							</div>
							<div className='col-span-12 md:col-span-2 flex items-end'>
								<Button
									className='w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:translate-y-1'
									onClick={handleSearch}
								>
									Search
								</Button>
							</div>
						</div>

						{isSearchActive && (
							<div className='text-right mb-4'>
								<Button
									variant='ghost'
									onClick={handleCancelSearch}
									className='text-gray-400 hover:text-white'
								>
									Cancel search ✕
								</Button>
							</div>
						)}

						<div className='space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar'>
							{searchOn && (
								<>
									{displayRides.length === 0 && isSearchActive ? (
										<div className='text-center py-8 text-gray-400 backdrop-blur-sm bg-slate-700/20 rounded-xl border border-slate-700/50'>
											No rides available from {startLocation} to {destination}.
											Please try different locations or cancel search to see all
											rides.
										</div>
									) : (
										displayRides.map((ride) => (
											<RideCard key={ride.id} ride={ride} />
										))
									)}
								</>
							)}
						</div>
					</div>
				</div>

				<Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
					<DialogContent className='bg-slate-800 border border-slate-700 text-white'>
						<DialogHeader>
							<DialogTitle className='text-emerald-400'>
								Confirm Booking
							</DialogTitle>
							<DialogDescription>
								{selectedRide && (
									<div className='py-4 space-y-2 text-gray-300'>
										<p className='font-medium text-white'>
											Driver: {selectedRide.driver}
										</p>
										<p>From: {selectedRide.start}</p>
										<p>To: {selectedRide.end}</p>
										<p>Car: {selectedRide.car}</p>
										<p>Available Seats: {selectedRide.seats}</p>
										<p>Distance: {selectedRide.distance}</p>
										<div className='mt-4 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50'>
											<p className='font-medium text-emerald-400 flex items-center'>
												<MapPin className='w-4 h-4 mr-2' />
												Pickup Point: {selectedRide.pickupPoint}
											</p>
										</div>
									</div>
								)}
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								variant='ghost'
								className='text-gray-400 hover:bg-slate-700'
								onClick={() => setShowConfirmDialog(false)}
							>
								Cancel
							</Button>
							<Button
								className='bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
								onClick={handleConfirmBooking}
							>
								Confirm Booking
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Custom scrollbar styles */}
			<style jsx global>{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 8px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: rgba(15, 23, 42, 0.3);
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: rgba(16, 185, 129, 0.5);
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background: rgba(16, 185, 129, 0.7);
				}
			`}</style>
		</div>
	);
};

export default RideBooking;
