"use client";
import React, { useRef, useState } from 'react';
import { Thermometer, Wind, Droplets, TreePine } from 'lucide-react';

const features = [
  {
    icon: Thermometer,
    title: 'Temperature Tracking',
    description: 'Monitor global and local temperature changes with precise data visualization.',
  },
  {
    icon: Wind,
    title: 'Air Quality Index',
    description: 'Real-time air quality measurements and pollution level monitoring.',
  },
  {
    icon: Droplets,
    title: 'Precipitation Data',
    description: 'Track rainfall patterns and analyze precipitation trends over time.',
  },
  {
    icon: TreePine,
    title: 'Forest Coverage',
    description: 'Monitor deforestation rates and forest conservation efforts globally.',
  },
];

export function Features() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Track What <span className="text-emerald-400">Matters</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-800/80 hover:translate-y-1 transition-all duration-300"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`h-16 w-16 rounded-md flex items-center justify-center mb-6 mx-auto transition-all duration-300 ${hoveredCard === index
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-900/50 text-emerald-400'
                  }`}
              >
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white text-center">{feature.title}</h3>
              <p className="text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}