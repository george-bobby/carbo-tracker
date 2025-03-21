import React from 'react';

interface ForecastItem {
    time: string;
    temp: number;
    weather: {
        main: string;
        icon: string;
        description: string;
    };
}

interface DailyForecastProps {
    data: ForecastItem[];
}

export function DailyForecast({ data }: DailyForecastProps) {
    return (
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-lg shadow-lg hover:border-emerald-500/50 transition-all duration-300 overflow-x-auto">
            <h3 className="text-xl font-semibold text-white mb-4">24-Hour Forecast</h3>
            <div className="flex space-x-8 min-w-max">
                {data.map((item) => (
                    <div key={item.time} className="flex flex-col items-center">
                        <span className="text-sm text-gray-400">{item.time}</span>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather.icon}@2x.png`}
                            alt={item.weather.description}
                            className="w-12 h-12 my-2"
                        />
                        <span className="font-semibold text-white">{Math.round(item.temp)}°C</span>
                        <span className="text-xs text-gray-400 capitalize">{item.weather.description}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}