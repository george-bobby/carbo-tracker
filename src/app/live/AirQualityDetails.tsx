import React from 'react';
import { getAQIDescription } from '../../whetherAPI';
import { FaLeaf, FaExclamationTriangle, FaWind, FaTemperatureHigh } from 'react-icons/fa';

export function AirQualityDetails({ data }) {
    if (!data || !data.main || data.main.aqi === undefined) {
        return null;
    }

    const aqiInfo = getAQIDescription(data.main.aqi);

    const getAQIColor = (aqi) => {
        switch (aqi) {
            case 1: return 'bg-emerald-500 text-white';
            case 2: return 'bg-emerald-300 text-slate-800';
            case 3: return 'bg-yellow-400 text-slate-800';
            case 4: return 'bg-orange-500 text-white';
            case 5: return 'bg-red-500 text-white';
            default: return 'bg-slate-500 text-white';
        }
    };

    const getAQIIcon = (aqi) => {
        switch (aqi) {
            case 1: return <FaLeaf className="h-6 w-6" />;
            case 2: return <FaLeaf className="h-6 w-6" />;
            case 3: return <FaWind className="h-6 w-6" />;
            case 4: return <FaExclamationTriangle className="h-6 w-6" />;
            case 5: return <FaTemperatureHigh className="h-6 w-6" />;
            default: return <FaWind className="h-6 w-6" />;
        }
    };

    const getPollutantName = (pollutant) => {
        const names = {
            co: 'Carbon Monoxide (CO)',
            no: 'Nitric Oxide (NO)',
            no2: 'Nitrogen Dioxide (NO₂)',
            o3: 'Ozone (O₃)',
            so2: 'Sulfur Dioxide (SO₂)',
            pm2_5: 'Fine Particulate Matter (PM2.5)',
            pm10: 'Coarse Particulate Matter (PM10)',
            nh3: 'Ammonia (NH₃)'
        };
        return names[pollutant] || pollutant;
    };

    return (
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Air Quality Index</h3>
                <div className="text-emerald-400 text-sm font-medium bg-slate-700/50 px-3 py-1.5 rounded-full">Today</div>
            </div>

            <div className="flex flex-col md:flex-row items-center mb-8 bg-slate-700/50 p-6 rounded-xl border border-slate-600/50">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${getAQIColor(data.main.aqi)}`}>
                    {data.main.aqi}
                </div>
                <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="text-white font-semibold text-xl">{aqiInfo.level}</span>
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getAQIColor(data.main.aqi)}`}>
                            {getAQIIcon(data.main.aqi)}
                        </div>
                    </div>
                    <p className="text-gray-300 mt-2">{aqiInfo.description}</p>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-emerald-400 font-medium mb-4 text-lg">Pollutant Levels</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {Object.entries(data.components).map(([pollutant, value]) => (
                        <div
                            key={pollutant}
                            className="bg-slate-700/50 p-5 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-700/80 border border-slate-600/50"
                        >
                            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">{getPollutantName(pollutant)}</p>
                            <p className="text-white font-medium text-lg">
                                {(typeof value === 'number' ? value : 0).toFixed(1)} <span className="text-sm text-gray-400">μg/m³</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}