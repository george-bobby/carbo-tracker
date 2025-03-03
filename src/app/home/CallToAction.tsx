"use client";
import React, { useState } from 'react';
import { Users, Heart, TreePine } from 'lucide-react';

const actions = [
  {
    icon: Users,
    title: 'Join Community',
    description: 'Connect with climate activists and make a difference together.',
    buttonText: 'Join Now',
    link: 'https://www.instagram.com/cca.christ/?igsh=ZnhkeDFsNmoxeHBj#'
  },
  {
    icon: Heart,
    title: 'Donate',
    description: 'Support organizations fighting climate change globally.',
    buttonText: 'Donate',
    link: 'https://sankalptaru.org/location/'
  },
  {
    icon: TreePine,
    title: 'Volunteer',
    description: 'Participate in local tree-planting and clean-up events.',
    buttonText: 'Get Started',
    link: 'https://chat.whatsapp.com/D3dPl12GYDaGksPmOKrRPD'
  },
];

export function CallToAction() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-12">
        {/* <div className="flex justify-center mb-4">
          <div className="inline-block px-4 py-1 bg-emerald-900/50 rounded-full backdrop-blur-sm border border-emerald-500/20">
            <p className="text-xs md:text-sm font-medium text-emerald-400 tracking-wide text-center">
              CONNECT · SUPPORT · VOLUNTEER
            </p>
          </div>
        </div> */}

        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Get <span className="text-emerald-400">Involved</span> Today
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {actions.map((action, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/80 hover:translate-y-1 transform opacity-0 motion-safe:animate-[fadeIn_0.5s_ease-out_forwards] ${index === 1 ? 'motion-safe:animation-delay-300' : index === 2 ? 'motion-safe:animation-delay-500' : ''
                }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`h-16 w-16 rounded-md flex items-center justify-center mb-6 mx-auto transition-all duration-300 ${hoveredCard === index
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-900/50 text-emerald-400'
                  }`}
              >
                <action.icon className="h-8 w-8" />
              </div>

              <h3 className="text-2xl font-semibold text-white text-center mb-4">
                {action.title}
              </h3>

              <p className="text-gray-300 text-center mb-8">
                {action.description}
              </p>

              {action.link ? (
                <a
                  href={action.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block text-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:translate-y-1"
                >
                  {action.buttonText}
                </a>
              ) : (
                <button className="w-full px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:translate-y-1">
                  {action.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}