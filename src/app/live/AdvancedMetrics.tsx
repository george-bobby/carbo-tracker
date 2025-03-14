import React from 'react';
import { Droplets, Wind, Gauge, Sun, CloudRain, Thermometer } from 'lucide-react';

interface AdvancedMetricsProps {
    data: {
        main: {
            pressure: number;
            temp: number;
        };
        wind: {
            speed: number;
            deg: number;
        };
        visibility: number;
        weather: Array<{
            main: string;
            description: string;
        }>;
    };
}

export function AdvancedMetrics({ data }: AdvancedMetricsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Atmospheric Conditions Card */}
            <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-lg shadow-lg hover:border-emerald-500/50 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-4">Atmospheric Conditions</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Gauge className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-gray-400">Pressure</span>
                        </div>
                        <span className="font-semibold text-white">{data.main.pressure} hPa</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Wind className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-gray-400">Wind Direction</span>
                        </div>
                        <span className="font-semibold text-white">{data.wind.deg}°</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Droplets className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-gray-400">Visibility</span>
                        </div>
                        <span className="font-semibold text-white">{data.visibility / 1000} km</span>
                    </div>
                </div>
            </div>

            {/* Current Conditions Card */}
            <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-lg shadow-lg hover:border-emerald-500/50 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-4">Current Conditions</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Thermometer className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-gray-400">Temperature</span>
                        </div>
                        <span className="font-semibold text-white">{data.main.temp}°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <CloudRain className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-gray-400">Weather</span>
                        </div>
                        <span className="font-semibold text-white capitalize">{data.weather[0].description}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Wind className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-gray-400">Wind Speed</span>
                        </div>
                        <span className="font-semibold text-white">{Math.round(data.wind.speed * 3.6)} km/h</span>
                    </div>
                </div>
            </div>

            {/* Additional Information Card */}
            <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-lg shadow-lg hover:border-emerald-500/50 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-4">Additional Information</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Sun className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-gray-400">Weather Type</span>
                        </div>
                        <span className="font-semibold text-white">{data.weather[0].main}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Gauge className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-gray-400">Pressure Trend</span>
                        </div>
                        <span className="font-semibold text-white">
                            {data.main.pressure > 1013 ? 'High' : 'Low'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Wind className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-gray-400">Wind Category</span>
                        </div>
                        <span className="font-semibold text-white">
                            {data.wind.speed < 5 ? 'Light' : data.wind.speed < 10 ? 'Moderate' : 'Strong'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}