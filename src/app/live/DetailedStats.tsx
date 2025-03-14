// components/DetailedStats.js
import React from 'react';

export function DetailedStats({ current, forecast }) {
    const windDirection = (deg) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(deg / 45) % 8];
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-4">Weather Details</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-500">Wind</p>
                    <p className="text-lg font-semibold">
                        {Math.round(current.wind.speed * 3.6)} km/h {windDirection(current.wind.deg)}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500">Visibility</p>
                    <p className="text-lg font-semibold">{(current.visibility / 1000).toFixed(1)} km</p>
                </div>
                <div>
                    <p className="text-gray-500">UV Index</p>
                    <p className="text-lg font-semibold">
                        {current.uvi !== undefined ? current.uvi : 'N/A'}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500">Cloudiness</p>
                    <p className="text-lg font-semibold">{current.clouds.all}%</p>
                </div>
                <div>
                    <p className="text-gray-500">Sunrise</p>
                    <p className="text-lg font-semibold">{formatTime(current.sys.sunrise)}</p>
                </div>
                <div>
                    <p className="text-gray-500">Sunset</p>
                    <p className="text-lg font-semibold">{formatTime(current.sys.sunset)}</p>
                </div>
            </div>
        </div>
    );
}