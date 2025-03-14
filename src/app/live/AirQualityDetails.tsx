// components/AirQualityDetails.js
import React from 'react';
import { getAQIDescription } from '../../whetherAPI';

export function AirQualityDetails({ data }) {
    if (!data || !data.main || data.main.aqi === undefined) {
        return null;
    }

    const aqiInfo = getAQIDescription(data.main.aqi);

    // Color mapping for AQI levels
    const getAQIColor = (aqi) => {
        switch (aqi) {
            case 1: return 'bg-green-500'; // Good
            case 2: return 'bg-yellow-300'; // Fair
            case 3: return 'bg-yellow-500'; // Moderate
            case 4: return 'bg-orange-500'; // Poor
            case 5: return 'bg-red-500'; // Very Poor
            default: return 'bg-gray-500'; // Unknown
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
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Air Quality</h3>

            <div className="flex items-center mb-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getAQIColor(data.main.aqi)}`}>
                    {data.main.aqi}
                </div>
                <div className="ml-6">
                    <h4 className="text-lg font-semibold">{aqiInfo.level}</h4>
                    <p className="text-gray-600">{aqiInfo.description}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(data.components).map(([pollutant, value]) => (
                    <div key={pollutant} className="border p-3 rounded-lg">
                        <p className="text-sm text-gray-500">{getPollutantName(pollutant)}</p>
                        <p className="text-lg font-semibold">
                            {(typeof value === 'number' ? value : 0).toFixed(1)} μg/m³
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}