import React from 'react';
import {
    FaWind,
    FaEye,
    FaSun,
    FaCloud
} from 'react-icons/fa';
import { WiSunrise, WiSunset } from 'react-icons/wi';

export function DetailedStats({ current, forecast }) {
    const windDirection = (deg) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(deg / 45) % 8];
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    // Calculate UV index severity
    const getUviClass = (uvi) => {
        if (uvi >= 8) return 'bg-red-500';
        if (uvi >= 6) return 'bg-orange-500';
        if (uvi >= 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const stats = [
        {
            icon: <FaWind className="h-5 w-5" />,
            label: 'Wind',
            value: `${Math.round(current.wind.speed * 3.6)} km/h ${windDirection(current.wind.deg)}`
        },
        {
            icon: <FaEye className="h-5 w-5" />,
            label: 'Visibility',
            value: `${(current.visibility / 1000).toFixed(1)} km`
        },
        {
            icon: <FaSun className="h-5 w-5" />,
            label: 'UV Index',
            value: current.uvi !== undefined ? current.uvi : 'N/A',
            uvi: true
        },
        {
            icon: <FaCloud className="h-5 w-5" />,
            label: 'Cloudiness',
            value: `${current.clouds.all}%`
        },
        {
            icon: <WiSunrise className="h-6 w-6" />,
            label: 'Sunrise',
            value: formatTime(current.sys.sunrise)
        },
        {
            icon: <WiSunset className="h-6 w-6" />,
            label: 'Sunset',
            value: formatTime(current.sys.sunset)
        }
    ];

    return (
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl shadow-lg w-full md:w-1/2 transition-all duration-300 hover:border-emerald-500/30">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-emerald-900/50 flex items-center justify-center">
                    <FaCloud className="text-emerald-400 h-4 w-4" />
                </span>
                Weather Details
            </h3>

            <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="transition-all duration-300 hover:translate-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-emerald-400">{stat.icon}</span>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                        </div>
                        {stat.uvi ? (
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-semibold text-white">{stat.value}</p>
                                <span className={`h-3 w-3 rounded-full ${getUviClass(current.uvi)}`}></span>
                            </div>
                        ) : (
                            <p className="text-lg font-semibold text-white">{stat.value}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}