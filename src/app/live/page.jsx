'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { CurrentConditions } from './CurrentConditions';
import { DetailedStats } from './DetailedStats';
import { WeatherTrends } from './WeatherTrends';
import { AdvancedMetrics } from './AdvancedMetrics';
import { AirQualityDetails } from './AirQualityDetails';
import { DailyForecast } from './DailyForecast';
import { WeeklyForecast } from './WeeklyForecast';
import { useWeatherData } from '../../whetherAPI';
import { FaLocationArrow, FaCloudSun } from 'react-icons/fa';
import dynamic from 'next/dynamic';

export default function Live() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isLoadingLocation, setIsLoadingLocation] = useState(true);
	const [userLocation, setUserLocation] = useState('Bangalore'); // Changed to Bangalore (correct English spelling)

	useEffect(() => {
		const detectLocation = async () => {
			if ('geolocation' in navigator) {
				try {
					const position = await new Promise((resolve, reject) => {
						navigator.geolocation.getCurrentPosition(resolve, reject, {
							enableHighAccuracy: true,
							timeout: 5000,
							maximumAge: 0,
						});
					});

					try {
						const response = await fetch(
							`https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
						);
						const [data] = await response.json();
						if (data && data.name) {
							const locationName = data.name;
							router.push(`/live?location=${locationName}`);
							setUserLocation(locationName);
						} else {
							// No data available, set to Bangalore
							router.push(`/live?location=Bangalore`);
							setUserLocation('Bangalore');
						}
					} catch (error) {
						console.error('Error getting location name:', error);
						router.push(`/live?location=Bangalore`);
						setUserLocation('Bangalore');
					}
				} catch (error) {
					console.error('Geolocation error:', error);
					router.push(`/live?location=Bangalore`);
					setUserLocation('Bangalore');
				}
			} else {
				router.push(`/live?location=Bangalore`);
				setUserLocation('Bangalore');
			}
			setIsLoadingLocation(false);
		};

		if (!searchParams.get('location')) {
			detectLocation();
		} else {
			setUserLocation(searchParams.get('location') || 'Bangalore');
			setIsLoadingLocation(false);
		}
	}, [searchParams, router]);

	const location = searchParams.get('location') || userLocation;
	const { currentWeather, forecast, airQuality, loading, error } =
		useWeatherData(location);

	// If weather data fails to load, redirect to Bangalore
	useEffect(() => {
		if (error && !loading && !isLoadingLocation) {
			router.push(`/live?location=Bangalore`);
			setUserLocation('Bangalore');
		}
	}, [error, loading, isLoadingLocation, router]);

	const formatDate = () => {
		const selectedDate = searchParams.get('date');
		const selectedTime = searchParams.get('time');

		let date = new Date();

		if (selectedDate) {
			date = new Date(selectedDate);
			if (selectedTime) {
				const [hours, minutes] = selectedTime.split(':');
				date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
			}
		}

		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const generateHourlyForecast = (forecastList) => {
		if (!forecastList || !Array.isArray(forecastList)) {
			return [];
		}

		const hourlyForecast = [];
		const now = new Date();
		now.setMinutes(0, 0, 0);

		for (let i = 0; i < 24; i++) {
			const forecastTime = new Date(now.getTime() + i * 60 * 60 * 1000);
			const hour = forecastTime.getHours().toString().padStart(2, '0');
			const time = `${hour}:00`;

			if (forecastList.length === 0) {
				hourlyForecast.push({
					time,
					temp: null,
					weather: {
						main: 'Unknown',
						icon: '01d',
						description: 'No data available',
					},
				});
				continue;
			}

			const closestForecast = forecastList.reduce((prev, curr) => {
				const prevDiff = Math.abs(
					new Date(prev.dt * 1000).getTime() - forecastTime.getTime()
				);
				const currDiff = Math.abs(
					new Date(curr.dt * 1000).getTime() - forecastTime.getTime()
				);
				return prevDiff < currDiff ? prev : curr;
			});

			hourlyForecast.push({
				time,
				temp: closestForecast.main.temp,
				weather: {
					main: closestForecast.weather[0].main,
					icon: closestForecast.weather[0].icon,
					description: closestForecast.weather[0].description,
				},
			});
		}
		return hourlyForecast;
	};

	if (isLoadingLocation || loading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center'>
				<div className='flex flex-col items-center space-y-4'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500'></div>
					<p className='text-lg text-gray-300'>
						{isLoadingLocation
							? 'Detecting your location...'
							: 'Loading weather data...'}
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		// Instead of showing an error, we'll use a fallback message
		// while the redirect to Bangalore happens
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center'>
				<div className='flex flex-col items-center space-y-4'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500'></div>
					<p className='text-lg text-gray-300'>
						Weather information unavailable. Redirecting to Bangalore...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
			{/* Modern text-based header section */}
			<div className='relative overflow-hidden bg-gradient-to-b from-emerald-900/40 to-slate-900/90 backdrop-blur-sm'>
				{/* Background Elements */}
				<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
				<div className='absolute top-20 -left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl'></div>

				<div className='container mx-auto px-4 pt-16 pb-24'>
					<div className='text-center mb-8'>
						<div className='inline-flex items-center justify-center mb-4'>
							<div className='h-12 w-12 rounded-full bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center border border-emerald-500/30'>
								<FaCloudSun className='h-6 w-6 text-emerald-400' />
							</div>
						</div>
						<h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
							Live <span className='text-emerald-400'>Weather</span> Insights
						</h1>
						<p className='text-gray-300 max-w-lg mx-auto'>
							Get real-time weather data and forecasts for any location around
							the world
						</p>
					</div>

					<div className='max-w-xl mx-auto'>
						<SearchBar />
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 py-8'>
				{currentWeather && forecast && (
					<div className='space-y-8'>
						<div className='bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg shadow-lg p-6 -mt-10 relative z-10'>
							<div className='flex items-center mb-2'>
								<FaLocationArrow className='text-emerald-400 mr-2 h-4 w-4' />
								<h2 className='text-2xl font-bold text-white'>
									{currentWeather.name}, {currentWeather.sys.country}
								</h2>
							</div>
							<p className='text-gray-400 mb-6'>{formatDate()}</p>
							<CurrentConditions
								{...currentWeather.main}
								weatherIcon={currentWeather.weather[0].icon}
								description={currentWeather.weather[0].description}
							/>
						</div>
						<div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-6'>
							<DetailedStats current={currentWeather} forecast={forecast} />
							<WeeklyForecast location={location} />
						</div>
						<DailyForecast data={generateHourlyForecast(forecast.list)} />
						<WeatherTrends data={forecast.list} />
						<AdvancedMetrics data={currentWeather} />
						{airQuality && <AirQualityDetails data={airQuality.list[0]} />}
					</div>
				)}
			</div>
		</div>
	);
}
