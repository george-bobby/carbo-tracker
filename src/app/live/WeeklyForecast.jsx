'use client';
import React from 'react';
import { useWeatherData } from '../../whetherAPI';
import {
	FaSun,
	FaCloudSun,
	FaCloud,
	FaCloudRain,
	FaCloudShowersHeavy,
	FaSnowflake,
	FaBolt,
	FaSmog,
} from 'react-icons/fa';

export function WeeklyForecast({ location }) {
	const { forecast, loading, error } = useWeatherData(location);

	// Process 5-day forecast into daily forecast
	const processWeeklyForecast = (forecastData) => {
		if (
			!forecastData ||
			!forecastData.list ||
			!Array.isArray(forecastData.list)
		) {
			return [];
		}

		// Group forecast by day
		const dailyForecasts = {};

		forecastData.list.forEach((item) => {
			const date = new Date(item.dt * 1000);
			const day = date.toISOString().split('T')[0]; // YYYY-MM-DD format

			if (!dailyForecasts[day]) {
				dailyForecasts[day] = {
					dt: item.dt,
					day: date.toLocaleDateString('en-US', { weekday: 'short' }),
					temp: {
						min: item.main.temp,
						max: item.main.temp,
					},
					weather: item.weather[0],
					precipitation: item.pop || 0,
				};
			} else {
				// Update min/max temperatures
				if (item.main.temp < dailyForecasts[day].temp.min) {
					dailyForecasts[day].temp.min = item.main.temp;
				}
				if (item.main.temp > dailyForecasts[day].temp.max) {
					dailyForecasts[day].temp.max = item.main.temp;
				}

				// Use midday weather if available (around 12:00)
				const hour = date.getHours();
				if (hour >= 11 && hour <= 13) {
					dailyForecasts[day].weather = item.weather[0];
				}

				// Update precipitation probability if higher
				if (item.pop > dailyForecasts[day].precipitation) {
					dailyForecasts[day].precipitation = item.pop;
				}
			}
		});

		// Convert to array and sort by date
		return Object.values(dailyForecasts).sort((a, b) => a.dt - b.dt);
	};

	const weeklyForecast = processWeeklyForecast(forecast);

	const getWeatherIcon = (description) => {
		const desc = description?.toLowerCase() || '';

		if (desc.includes('thunder') || desc.includes('storm')) {
			return <FaBolt className='h-6 w-6' />;
		} else if (desc.includes('heavy rain') || desc.includes('shower')) {
			return <FaCloudShowersHeavy className='h-6 w-6' />;
		} else if (desc.includes('rain') || desc.includes('drizzle')) {
			return <FaCloudRain className='h-6 w-6' />;
		} else if (desc.includes('snow')) {
			return <FaSnowflake className='h-6 w-6' />;
		} else if (desc.includes('mist') || desc.includes('fog')) {
			return <FaSmog className='h-6 w-6' />;
		} else if (desc.includes('cloud')) {
			return <FaCloud className='h-6 w-6' />;
		} else if (desc.includes('partly')) {
			return <FaCloudSun className='h-6 w-6' />;
		} else {
			return <FaSun className='h-6 w-6' />; // Default to sunny
		}
	};

	if (loading) {
		return (
			<div className='bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl shadow-xl w-full'>
				<h3 className='text-xl font-bold mb-4 text-white'>5-Day Forecast</h3>
				<div className='animate-pulse flex space-x-4'>
					<div className='space-y-3 w-full'>
						{[...Array(5)].map((_, i) => (
							<div key={i} className='h-12 bg-slate-700/50 rounded'></div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (error || !weeklyForecast || weeklyForecast.length === 0) {
		return (
			<div className='bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl shadow-xl w-full'>
				<h3 className='text-xl font-bold mb-4 text-white'>5-Day Forecast</h3>
				<p className='text-sm text-gray-400 mb-4'>Cannot load forecast data</p>
				<p className='text-red-400 text-sm'>
					{error || 'No forecast data available'}
				</p>
			</div>
		);
	}

	return (
		<div className='bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl shadow-xl w-full'>
			<div className='flex justify-between items-center mb-6'>
				<h3 className='text-xl font-bold text-white'>5-Day Forecast</h3>
				<div className='text-emerald-400 text-sm font-medium'>{location}</div>
			</div>

			<div className='space-y-4'>
				{weeklyForecast.slice(0, 5).map((day, index) => (
					<div
						key={index}
						className='flex items-center justify-between bg-slate-700/30 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-300'
					>
						<div className='w-1/5'>
							<p className='font-medium text-white'>
								{index === 0 ? 'Today' : day.day}
							</p>
						</div>
						<div className='w-1/5 flex items-center justify-center text-emerald-400'>
							{getWeatherIcon(day.weather?.description)}
						</div>
						<div className='w-2/5'>
							<p className='text-sm text-gray-300 capitalize'>
								{day.weather?.description || 'Unknown'}
							</p>
							{day.precipitation > 0 && (
								<p className='text-xs text-emerald-400'>
									{Math.round(day.precipitation * 100)}% precipitation
								</p>
							)}
						</div>
						<div className='w-1/5 text-right'>
							<p className='text-white font-medium'>
								{Math.round(day.temp.max)}°{' '}
								<span className='text-gray-400'>
									/ {Math.round(day.temp.min)}°
								</span>
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
