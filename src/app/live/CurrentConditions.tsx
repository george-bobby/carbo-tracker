import React from 'react';
import { Thermometer, Droplet, Gauge } from 'lucide-react';

export function CurrentConditions({ temp, feels_like, humidity, pressure, weatherIcon, description }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            {/* Weather Icon and Temperature */}
            <div className="flex items-center mb-6 md:mb-0">
                <img
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                    alt={description}
                    className="w-28 h-28"
                />
                <div className="ml-6">
                    <h1 className="text-6xl font-bold text-white">{Math.round(temp)}°C</h1>
                    <p className="text-lg text-gray-300 capitalize mt-2">{description}</p>
                </div>
            </div>

            {/* Additional Weather Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/70 transition-all">
                    <Thermometer className="w-10 h-10 mx-auto text-blue-400" />
                    <p className="text-gray-300 mt-3 text-sm">Feels Like</p>
                    <p className="text-2xl font-semibold text-white mt-1">{Math.round(feels_like)}°C</p>
                </div>
                <div className="text-center bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/70 transition-all">
                    <Droplet className="w-10 h-10 mx-auto text-cyan-400" />
                    <p className="text-gray-300 mt-3 text-sm">Humidity</p>
                    <p className="text-2xl font-semibold text-white mt-1">{humidity}%</p>
                </div>
                <div className="text-center bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/70 transition-all">
                    <Gauge className="w-10 h-10 mx-auto text-purple-400" />
                    <p className="text-gray-300 mt-3 text-sm">Pressure</p>
                    <p className="text-2xl font-semibold text-white mt-1">{pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}