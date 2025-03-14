// components/CurrentConditions.js
import React from 'react';

export function CurrentConditions({ temp, feels_like, humidity, pressure, weatherIcon, description }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
                <img
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                    alt={description}
                    className="w-24 h-24"
                />
                <div className="ml-4">
                    <h1 className="text-5xl font-bold">{Math.round(temp)}°C</h1>
                    <p className="text-gray-600 capitalize">{description}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-gray-500">Feels Like</p>
                    <p className="text-xl font-semibold">{Math.round(feels_like)}°C</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-500">Humidity</p>
                    <p className="text-xl font-semibold">{humidity}%</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-500">Pressure</p>
                    <p className="text-xl font-semibold">{pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}