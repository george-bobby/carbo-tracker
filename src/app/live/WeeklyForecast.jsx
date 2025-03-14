// components/WeeklyForecast.js
'use client';
import React from 'react';
import { useWeatherData } from '../../whetherAPI';

export function WeeklyForecast({ location }) {
    const { forecast, loading, error } = useWeatherData(location);

    // Process 5-day forecast into daily forecast (using the standard forecast endpoint)
    const processWeeklyForecast = (forecastData) => {
        if (!forecastData || !forecastData.list || !Array.isArray(forecastData.list)) {
            return [];
        }

        // Group forecast by day
        const dailyForecasts = {};

        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toISOString().split('T')[0]; // YYYY-MM-DD format

            if (!dailyForecasts[day]) {
                dailyForecasts[day] = {
                    dt: item.dt,
                    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: {
                        min: item.main.temp,
                        max: item.main.temp
                    },
                    weather: item.weather[0],
                    precipitation: item.pop || 0
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
        const desc = description.toLowerCase();
        if (desc.includes('rain') || desc.includes('drizzle')) {
            return "🌧️";
        } else if (desc.includes('cloud')) {
            return "☁️";
        } else if (desc.includes('snow')) {
            return "❄️";
        } else if (desc.includes('thunder') || desc.includes('storm')) {
            return "⛈️";
        } else if (desc.includes('mist') || desc.includes('fog')) {
            return "🌫️";
        } else {
            return "☀️"; // Default to sunny
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/2">
                <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
                <p>Loading forecast data...</p>
            </div>
        );
    }

    if (error || !weeklyForecast || weeklyForecast.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/2">
                <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
                <p className="text-sm text-gray-500 mb-4">Cannot load forecast data</p>
                <p className="text-red-500 text-sm">{error || "No forecast data available"}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
            <div className="space-y-3">
                {weeklyForecast.slice(0, 5).map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="w-1/5">
                            <p className="font-semibold">{index === 0 ? 'Today' : day.day}</p>
                        </div>
                        <div className="w-1/5 flex items-center">
                            {day.weather && day.weather.icon ? (
                                <img
                                    src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                                    alt={day.weather.description}
                                    className="w-10 h-10"
                                />
                            ) : (
                                <span className="text-2xl">{getWeatherIcon(day.weather?.description || "clear")}</span>
                            )}
                        </div>
                        <div className="w-2/5">
                            <p className="text-sm text-gray-600 capitalize">
                                {day.weather?.description || "Unknown"}
                            </p>
                            {day.precipitation > 0 && (
                                <p className="text-xs text-blue-600">
                                    {Math.round(day.precipitation * 100)}% precipitation
                                </p>
                            )}
                        </div>
                        <div className="w-1/5 text-right">
                            <p>{Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}