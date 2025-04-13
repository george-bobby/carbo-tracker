import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Wind, Cloud } from 'lucide-react';

interface WeatherTrendsProps {
    data: Array<{
        dt: number;
        main: {
            temp: number;
            humidity: number;
            pressure: number;
        };
        wind: {
            speed: number;
        };
        pop: number;
    }>;
}

export function WeatherTrends({ data }: WeatherTrendsProps) {
    const [activeMetric, setActiveMetric] = useState<'temperature' | 'precipitation' | 'humidity' | 'wind'>('temperature');

    const formattedData = data.map(item => ({
        time: new Date(item.dt * 1000).toLocaleDateString(),
        temp: Math.round(item.main.temp),
        humidity: item.main.humidity,
        precipitation: Math.round(item.pop * 100),
        wind: Math.round(item.wind.speed * 3.6)
    }));

    const metrics = [
        { id: 'temperature', icon: Thermometer, label: 'Temperature', color: '#f97316' },
        { id: 'precipitation', icon: Cloud, label: 'Precipitation', color: '#3b82f6' },
        { id: 'humidity', icon: Droplets, label: 'Humidity', color: '#10b981' },
        { id: 'wind', icon: Wind, label: 'Wind', color: '#8b5cf6' }
    ];

    const renderGraph = () => {
        switch (activeMetric) {
            case 'temperature':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                            <XAxis dataKey="time" stroke="#94a3b8" />
                            <YAxis domain={[0, 40]} stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                            <Line type="monotone" dataKey="temp" stroke="#f97316" name="Temperature (°C)" strokeWidth={2} dot={{ fill: '#f97316', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'precipitation':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                            <XAxis dataKey="time" stroke="#94a3b8" />
                            <YAxis domain={[0, 100]} stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                            <Bar dataKey="precipitation" fill="#3b82f6" name="Precipitation (%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'humidity':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                            <XAxis dataKey="time" stroke="#94a3b8" />
                            <YAxis domain={[0, 100]} stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                            <Line type="monotone" dataKey="humidity" stroke="#10b981" name="Humidity (%)" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'wind':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                            <XAxis dataKey="time" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                            <Line type="monotone" dataKey="wind" stroke="#8b5cf6" name="Wind Speed (km/h)" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                );
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Weather Forecast</h2>

            <div className="flex flex-wrap gap-4 mb-8">
                {metrics.map(({ id, icon: Icon, label, color }) => (
                    <button
                        key={id}
                        onClick={() => setActiveMetric(id as typeof activeMetric)}
                        className={`flex items-center px-5 py-3 rounded-lg transition-all duration-300 ${activeMetric === id
                            ? 'bg-slate-700 border border-slate-600 text-white'
                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                            }`}
                    >
                        <Icon className="w-5 h-5 mr-3" style={{ color }} />
                        <div className='text-white'>{label}</div>
                    </button>
                ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                {renderGraph()}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {metrics.map(({ id, icon: Icon, label, color }) => {
                    const metricData = {
                        temperature: { value: formattedData[0]?.temp || 0, unit: '°C' },
                        precipitation: { value: formattedData[0]?.precipitation || 0, unit: '%' },
                        humidity: { value: formattedData[0]?.humidity || 0, unit: '%' },
                        wind: { value: formattedData[0]?.wind || 0, unit: 'km/h' }
                    };

                    return (
                        <div
                            key={id}
                            className="bg-slate-700/50 p-4 rounded-xl border border-slate-600 flex flex-col items-center justify-center"
                        >
                            <Icon className="h-6 w-6 mb-2" style={{ color }} />
                            <p className="text-xs text-gray-400 mb-1">{label}</p>
                            <p className="text-white font-medium">
                                {metricData[id as keyof typeof metricData].value}
                                {metricData[id as keyof typeof metricData].unit}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}