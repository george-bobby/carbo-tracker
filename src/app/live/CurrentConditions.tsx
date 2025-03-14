import React from 'react';

export function CurrentConditions({ temp, feels_like, humidity, pressure, weatherIcon, description }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Weather Icon and Temperature */}
            <div className="flex items-center mb-4 md:mb-0">
                <img
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                    alt={description}
                    className="w-24 h-24"
                />
                <div className="ml-4">
                    <h1 className="text-5xl font-bold text-white">{Math.round(temp)}°C</h1>
                    <p className="text-gray-400 capitalize">{description}</p>
                </div>
            </div>

            {/* Additional Weather Details */}
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-gray-400">Feels Like</p>
                    <p className="text-xl font-semibold text-white">{Math.round(feels_like)}°C</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-400">Humidity</p>
                    <p className="text-xl font-semibold text-white">{humidity}%</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-400">Pressure</p>
                    <p className="text-xl font-semibold text-white">{pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}