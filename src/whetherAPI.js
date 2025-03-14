// utils/weatherAPI.js
import { useState, useEffect } from 'react';

export const useWeatherData = (location) => {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [airQuality, setAirQuality] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchWeatherData = async () => {
			if (!location) return;

			setLoading(true);
			setError(null);

			try {
				// Fetch current weather
				const currentResponse = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
				);

				if (!currentResponse.ok) {
					throw new Error(`Weather data not available for ${location}`);
				}

				const currentData = await currentResponse.json();
				setCurrentWeather(currentData);

				// Fetch forecast
				const forecastResponse = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
				);

				if (!forecastResponse.ok) {
					throw new Error(`Forecast data not available for ${location}`);
				}

				const forecastData = await forecastResponse.json();
				setForecast(forecastData);

				// Fetch air quality
				const { coord } = currentData;
				const airQualityResponse = await fetch(
					`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
				);

				if (airQualityResponse.ok) {
					const airQualityData = await airQualityResponse.json();
					setAirQuality(airQualityData);
				}
			} catch (err) {
				console.error('Error fetching weather data:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchWeatherData();
	}, [location]);

	return { currentWeather, forecast, airQuality, loading, error };
};

export const getWeatherAlertLevel = (conditions) => {
	// This is a simple implementation. You can enhance it based on your requirements.
	if (!conditions) return 'normal';

	const { main, description } = conditions;
	const severeWeatherTerms = [
		'thunderstorm',
		'tornado',
		'hurricane',
		'extreme',
	];
	const moderateWeatherTerms = ['rain', 'snow', 'sleet', 'hail', 'fog'];

	const lowerDescription = description.toLowerCase();

	if (severeWeatherTerms.some((term) => lowerDescription.includes(term))) {
		return 'severe';
	} else if (
		moderateWeatherTerms.some((term) => lowerDescription.includes(term))
	) {
		return 'moderate';
	}

	return 'normal';
};

export const getAQIDescription = (aqi) => {
	switch (aqi) {
		case 1:
			return {
				level: 'Good',
				description:
					'Air quality is satisfactory, and air pollution poses little or no risk.',
			};
		case 2:
			return {
				level: 'Fair',
				description:
					'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
			};
		case 3:
			return {
				level: 'Moderate',
				description:
					'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
			};
		case 4:
			return {
				level: 'Poor',
				description:
					'Health alerts for everyone may be necessary. Members of sensitive groups may experience more serious health effects.',
			};
		case 5:
			return {
				level: 'Very Poor',
				description:
					'Health warnings of emergency conditions. The entire population is more likely to be affected.',
			};
		default:
			return {
				level: 'Unknown',
				description: 'Air quality information is not available.',
			};
	}
};
