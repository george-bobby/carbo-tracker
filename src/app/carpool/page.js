'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
	Star,
	Check,
	MapPin,
	Car,
	Users,
	Navigation,
	Loader2,
} from 'lucide-react';
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
	const { t } = useTranslation('common');
	const [startLocation, setStartLocation] = useState('');
	const [destination, setDestination] = useState('');
	const [selectedRide, setSelectedRide] = useState(null);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [filteredRides, setFilteredRides] = useState([]);
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [confirmedRideId, setConfirmedRideId] = useState(null);
	const [allRides, setAllRides] = useState([]);
	const [loading, setLoading] = useState(true);
	const [creating, setCreating] = useState(false);
	const [booking, setBooking] = useState(false);
	const [userBookings, setUserBookings] = useState([]);
	const [newRide, setNewRide] = useState({
		start: '',
		end: '',
		car: '',
		seats: 0,
		distance: '',
		pickupPoint: '',
	});

	const { user } = useUser();

	// Fetch rides from API
	const fetchRides = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/rides');
			if (response.ok) {
				const rides = await response.json();
				setAllRides(rides);
			} else {
				console.error('Failed to fetch rides');
			}
		} catch (error) {
			console.error('Error fetching rides:', error);
		} finally {
			setLoading(false);
		}
	};

	// Fetch user bookings
	const fetchUserBookings = async () => {
		if (!user?.id) return;
		try {
			const response = await fetch(`/api/bookings?clerkId=${user.id}`);
			if (response.ok) {
				const bookings = await response.json();
				setUserBookings(bookings);
			}
		} catch (error) {
			console.error('Error fetching bookings:', error);
		}
	};

	// Load data on component mount
	useEffect(() => {
		fetchRides();
	}, []);

	// Load user bookings when user is available
	useEffect(() => {
		if (user?.id) {
			fetchUserBookings();
		}
	}, [user?.id]);

	const handleSearch = () => {
		if (!startLocation && !destination) {
			setFilteredRides(allRides);
			setIsSearchActive(false);
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
	};

	const handleCancelSearch = () => {
		setStartLocation('');
		setDestination('');
		setFilteredRides([]);
		setIsSearchActive(false);
	};

	const handleBookRide = (ride) => {
		setSelectedRide(ride);
		setShowConfirmDialog(true);
	};

	const handleConfirmBooking = async () => {
		if (!user?.id || !selectedRide) return;

		try {
			setBooking(true);
			const response = await fetch('/api/bookings', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					rideId: selectedRide._id,
					passengerClerkId: user.id,
					passengerName: `${user.firstName || ''} ${
						user.lastName || ''
					}`.trim(),
				}),
			});

			if (response.ok) {
				setConfirmedRideId(selectedRide._id);
				await fetchUserBookings(); // Refresh bookings
				alert(t('carpool.confirmBooking.success'));
			} else {
				const error = await response.json();
				alert(error.error || t('carpool.confirmBooking.error'));
			}
		} catch (error) {
			console.error('Error booking ride:', error);
			alert(t('carpool.confirmBooking.error'));
		} finally {
			setBooking(false);
			setShowConfirmDialog(false);
			setSelectedRide(null);
		}
	};

	const handleCreateRide = async () => {
		if (!user?.id) {
			alert(t('carpool.createRide.signInRequired'));
			return;
		}

		if (
			!newRide.start ||
			!newRide.end ||
			!newRide.car ||
			!newRide.seats ||
			newRide.seats <= 0
		) {
			alert(t('carpool.createRide.fillAllFields'));
			return;
		}

		try {
			setCreating(true);
			const response = await fetch('/api/rides', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					driver: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
					driverClerkId: user.id,
					start: newRide.start,
					end: newRide.end,
					car: newRide.car,
					seats: newRide.seats,
					distance: newRide.distance,
					pickupPoint: newRide.pickupPoint,
					rating: 0,
					image: user.imageUrl || '/api/placeholder/40/40',
				}),
			});

			if (response.ok) {
				alert(t('carpool.createRide.success'));
				setNewRide({
					start: '',
					end: '',
					car: '',
					seats: 0,
					distance: '',
					pickupPoint: '',
				});
				await fetchRides(); // Refresh rides list
			} else {
				const error = await response.json();
				alert(error.error || t('carpool.createRide.error'));
			}
		} catch (error) {
			console.error('Error creating ride:', error);
			alert(t('carpool.createRide.error'));
		} finally {
			setCreating(false);
		}
	};

	const displayRides = isSearchActive ? filteredRides : allRides;

	const RideCard = ({ ride }) => {
		const isConfirmed =
			ride._id === confirmedRideId ||
			userBookings.some(
				(booking) =>
					booking.rideId === ride._id && booking.status === 'confirmed'
			);
		const isOwnRide = ride.driverClerkId === user?.id;

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
									{isOwnRide && (
										<span className='ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded'>
											{t('carpool.joinRide.yourRide')}
										</span>
									)}
									<span className='text-gray-400 text-sm ml-2'>
										{ride.distance}
									</span>
									{isConfirmed && !isOwnRide && (
										<span className='ml-2 flex items-center text-emerald-400 text-sm font-medium'>
											<Check className='w-4 h-4 mr-1' />
											{t('carpool.joinRide.bookingConfirmed')}
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
										{t('carpool.joinRide.seatsAvailable', { count: ride.seats })}
									</p>
								</div>
								{ride.pickupPoint && (
									<div className='flex items-center mt-1 text-xs text-gray-400'>
										<MapPin className='w-3 h-3 mr-1' />
										{ride.pickupPoint}
									</div>
								)}
							</div>
							<div className='flex items-center bg-slate-700/50 px-2 py-1 rounded text-xs'>
								{ride.rating || 0}
								<Star className='w-3 h-3 text-yellow-400 ml-1' />
							</div>
						</div>
						{!isConfirmed && !isOwnRide && (
							<Button
								variant='outline'
								size='sm'
								className='mt-3 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-300 hover:border-emerald-500'
								onClick={() => handleBookRide(ride)}
								disabled={booking}
							>
								{booking ? t('carpool.joinRide.booking') : t('carpool.joinRide.bookThisRide')}
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
						{t('carpool.tagline')}
					</p>
				</div>

				<h1 className='text-3xl md:text-4xl font-bold text-white text-center mb-10 leading-tight'>
					{t('carpool.title')}
				</h1>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Left Side - Create a Ride Section */}
					<div className='backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 flex flex-col'>
						<h2 className='text-2xl font-bold text-white mb-6 flex items-center'>
							<div className='h-8 w-8 rounded-md flex items-center justify-center bg-emerald-900/50 text-emerald-400 mr-2'>
								<Car className='h-5 w-5' />
							</div>
							{t('carpool.createRide.title')}
						</h2>
						<div className='grid grid-cols-1 gap-4 w-full'>
							<Input
								placeholder={`${t('carpool.createRide.name')}: ${user?.firstName || ''}${
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
									placeholder={t('carpool.createRide.startLocation')}
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
									placeholder={t('carpool.createRide.destination')}
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
								placeholder={t('carpool.createRide.carModel')}
								value={newRide.car}
								onChange={(e) =>
									setNewRide({ ...newRide, car: e.target.value })
								}
								className='bg-slate-700/50 border-slate-600 text-white'
							/>
							<Input
								placeholder={t('carpool.createRide.distance')}
								value={newRide.distance}
								onChange={(e) =>
									setNewRide({ ...newRide, distance: e.target.value })
								}
								className='bg-slate-700/50 border-slate-600 text-white'
							/>
							<Input
								placeholder={t('carpool.createRide.pickupPoint')}
								value={newRide.pickupPoint}
								onChange={(e) =>
									setNewRide({ ...newRide, pickupPoint: e.target.value })
								}
								className='bg-slate-700/50 border-slate-600 text-white'
							/>
							<div className='relative'>
								<Input
									type='number'
									placeholder={t('carpool.createRide.seatsAvailable')}
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
								disabled={creating}
							>
								{creating ? (
									<>
										<Loader2 className='w-4 h-4 mr-2 animate-spin' />
										{t('carpool.createRide.creating')}
									</>
								) : (
									t('carpool.createRide.createButton')
								)}
							</Button>
						</div>
					</div>

					{/* Right Side - Pick a Ride Section */}
					<div className='backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 flex flex-col'>
						<h2 className='text-2xl font-bold text-white mb-6 flex items-center'>
							<div className='h-8 w-8 rounded-md flex items-center justify-center bg-emerald-900/50 text-emerald-400 mr-2'>
								<Users className='h-5 w-5' />
							</div>
							{t('carpool.joinRide.title')}
						</h2>
						<div className='grid grid-cols-12 gap-4 mb-6 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm bg-slate-700/20'>
							<div className='col-span-12 md:col-span-5'>
								<label className='block text-xs font-medium mb-2 text-emerald-400'>
									{t('carpool.joinRide.startFrom')}
								</label>
								<Input
									placeholder={t('carpool.joinRide.startPlaceholder')}
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
									{t('carpool.joinRide.destination')}
								</label>
								<Input
									placeholder={t('carpool.joinRide.destinationPlaceholder')}
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
									{t('carpool.joinRide.search')}
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
									{t('carpool.joinRide.cancelSearch')}
								</Button>
							</div>
						)}

						<div className='space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar'>
							{loading ? (
								<div className='text-center py-8 text-gray-400'>
									<Loader2 className='w-6 h-6 animate-spin mx-auto mb-2' />
									Loading rides...
								</div>
							) : (
								<>
									{displayRides.length === 0 && isSearchActive ? (
										<div className='text-center py-8 text-gray-400 backdrop-blur-sm bg-slate-700/20 rounded-xl border border-slate-700/50'>
											{t('carpool.joinRide.noRidesFound', { start: startLocation, destination })}
										</div>
									) : displayRides.length === 0 ? (
										<div className='text-center py-8 text-gray-400 backdrop-blur-sm bg-slate-700/20 rounded-xl border border-slate-700/50'>
											{t('carpool.joinRide.noRidesAvailable')}
										</div>
									) : (
										displayRides.map((ride) => (
											<RideCard key={ride._id} ride={ride} />
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
								{t('carpool.confirmBooking.title')}
							</DialogTitle>
							<DialogDescription>
								{selectedRide && (
									<div className='py-4 space-y-2 text-gray-300'>
										<p className='font-medium text-white'>
											{t('carpool.confirmBooking.driver')}: {selectedRide.driver}
										</p>
										<p>{t('carpool.confirmBooking.from')}: {selectedRide.start}</p>
										<p>{t('carpool.confirmBooking.to')}: {selectedRide.end}</p>
										<p>{t('carpool.confirmBooking.car')}: {selectedRide.car}</p>
										<p>{t('carpool.confirmBooking.availableSeats')}: {selectedRide.seats}</p>
										<p>{t('carpool.confirmBooking.distance')}: {selectedRide.distance}</p>
										<div className='mt-4 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50'>
											<p className='font-medium text-emerald-400 flex items-center'>
												<MapPin className='w-4 h-4 mr-2' />
												{t('carpool.confirmBooking.pickupPoint')}: {selectedRide.pickupPoint}
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
								disabled={booking}
							>
								{t('carpool.confirmBooking.cancel')}
							</Button>
							<Button
								className='bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
								onClick={handleConfirmBooking}
								disabled={booking}
							>
								{booking ? (
									<>
										<Loader2 className='w-4 h-4 mr-2 animate-spin' />
										{t('carpool.confirmBooking.booking')}
									</>
								) : (
									t('carpool.confirmBooking.confirm')
								)}
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
