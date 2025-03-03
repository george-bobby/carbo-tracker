"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Leaf,
    Users,
    Target,
    Award,
    Calendar,
    ChevronRight,
    MapPin
} from 'lucide-react';

export default function ClimateAction() {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const features = [
        {
            icon: <Leaf className="h-6 w-6" />,
            title: 'Track Your Impact',
            description: 'Monitor your carbon footprint and see your environmental impact in real-time.',
        },
        {
            icon: <Target className="h-6 w-6" />,
            title: 'Join Initiatives',
            description: 'Participate in community projects and make a measurable difference.',
        },
        {
            icon: <Calendar className="h-6 w-6" />,
            title: 'Attend Events',
            description: 'Connect with like-minded individuals and learn from experts.',
        },
    ];

    const stats = [
        { icon: Users, value: "1000+", label: "Active Members" },
        { icon: Target, value: "50+", label: "Projects Completed" },
        { icon: Award, value: "15+", label: "Awards Won" },
        { icon: Calendar, value: "100+", label: "Events Organized" }
    ];

    const upcomingEvents = [
        {
            title: "Green Campus Initiative",
            description: "Over 1000 trees planted across campus",
            date: "March 15, 2024"
        },
        {
            title: "Zero Waste Campaign",
            description: "Teaching sustainable waste practices",
            date: "March 20, 2024"
        },
        {
            title: "Climate Action Summit",
            description: "Annual conference on climate change",
            date: "April 5, 2024"
        },
        {
            title: "Earth Hour Celebration",
            description: "Campus-wide energy conservation",
            date: "March 30, 2024"
        }
    ];

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background Elements */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-20 md:pt-28 pb-12">
                <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
                    {/* Left Content - Text */}
                    <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                        <div className="inline-block px-4 py-1 bg-emerald-900/50 rounded-full mb-2 backdrop-blur-sm border border-emerald-500/20">
                            <p className="text-xs md:text-sm font-medium text-emerald-400 tracking-wide">
                                PRESERVE · PROTECT · ACT
                            </p>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Christites for{' '}
                            <span className="text-emerald-400">Climate Action</span>
                        </h1>

                        <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed font-light">
                            Preserve nature, protect the future, act for change. Join our student-led movement to combat climate change.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                Join Our Movement
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </motion.button>

                            <Link href="/gallery">
                                <button className="px-8 py-3 bg-transparent border border-emerald-500/30 text-emerald-400 rounded-md font-medium hover:bg-emerald-500/10 transition-all duration-300 hover:border-emerald-500">
                                    View Gallery
                                </button>
                            </Link>
                        </div>

                        <div className="pt-6">
                            <p className="text-gray-400 text-sm">
                                Join <span className="text-white font-medium">1,000+</span>{' '}
                                eco-conscious students making a difference
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Card */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 rounded-2xl blur-xl transform rotate-3"></div>
                            <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                                            <Leaf className="text-white h-5 w-5" />
                                        </div>
                                        <span className="text-white font-bold">
                                            CCA Impact Dashboard
                                        </span>
                                    </div>
                                    <div className="text-emerald-400 text-sm font-medium">
                                        2024
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full w-3/4 bg-emerald-500 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Trees Planted</span>
                                        <span className="text-white font-medium">5,280 this year</span>
                                    </div>

                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full w-1/2 bg-emerald-500 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Campus Initiatives</span>
                                        <span className="text-white font-medium">18 completed</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-700/50 p-4 rounded-lg">
                                        <div className="text-xs text-gray-400 mb-1">Members</div>
                                        <div className="text-white font-medium">1,260</div>
                                    </div>
                                    <div className="bg-slate-700/50 p-4 rounded-lg">
                                        <div className="text-xs text-gray-400 mb-1">Events</div>
                                        <div className="text-white font-medium">42</div>
                                    </div>
                                    <div className="bg-slate-700/50 p-4 rounded-lg">
                                        <div className="text-xs text-gray-400 mb-1">Campuses</div>
                                        <div className="text-white font-medium">5</div>
                                    </div>
                                    <div className="bg-slate-700/50 p-4 rounded-lg">
                                        <div className="text-xs text-gray-400 mb-1">CO₂ Saved</div>
                                        <div className="text-white font-medium">125 tons</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Get Involved</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/80"
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div
                                className={`h-12 w-12 rounded-md flex items-center justify-center mb-4 transition-all duration-300 ${hoveredCard === index
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-emerald-900/50 text-emerald-400'
                                    }`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-900/80 py-16 border-y border-slate-700/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <stat.icon className="h-12 w-12 text-emerald-400" />
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">About CCA</h2>
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl">
                        <p className="text-gray-300 leading-relaxed mb-6">
                            CHRISTITES FOR CLIMATE ACTION (CCA) is a movement initiated by Rev.Fr.Dr.Jose CC,
                            Vice Chancellor, CHRIST (Deemed to be University), to campaign for climate changes
                            and its consequences on Mother Earth. This student-led movement started with an
                            ultimate goal to take up the responsibility of conserving the environment from
                            campus to societal level.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            The emphasis in CCA is given on developing an Eco-friendly lifestyle. CCA believes
                            that it's the primary responsibility of every CHRISTITE to be aware and create
                            awareness about climatic changes which is a looming threat to all life on mother Earth.
                        </p>
                    </div>
                </div>
            </div>

            {/* Vision & Mission */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl transition-all duration-300 hover:border-emerald-500/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Vision</h3>
                        </div>
                        <p className="text-gray-300">
                            To foster a harmonious coexistence between humanity and nature through proactive
                            environmental stewardship, ensuring a sustainable future for generations to come.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl transition-all duration-300 hover:border-emerald-500/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Mission</h3>
                        </div>
                        <p className="text-gray-300">
                            Engage, educate, and empower communities to take tangible actions towards environmental
                            preservation. Take up grassroots initiatives, advocacy, and collaboration, to protect
                            ecosystems, conserve resources, and promote eco-conscious lifestyles.
                        </p>
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {upcomingEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-emerald-500/30 hover:translate-y-1"
                        >
                            <div className="relative h-48 bg-emerald-900/50">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Leaf className="h-20 w-20 text-emerald-500/30" />
                                </div>
                                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                                    {event.date}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                <p className="text-gray-400 mb-4">{event.description}</p>
                                <button className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1">
                                    Learn More <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Contact/CTA Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-white mb-8">Contact Us</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-emerald-300 mb-2">Office Location</h4>
                                        <p className="text-gray-300">
                                            Cabin 20, Block 3,<br />
                                            CHRIST (Deemed to be University),<br />
                                            Bangalore Central Campus
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Leaf className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-emerald-300 mb-2">Contact Coordinators</h4>
                                        <div className="space-y-2">
                                            <p className="text-gray-300">
                                                <span className="font-medium">Suhas LS:</span>
                                                <a href="tel:+918217029775" className="ml-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                                                    +91 82170 29775
                                                </a>
                                            </p>
                                            <p className="text-gray-300">
                                                <span className="font-medium">Sahil Gupta:</span>
                                                <a href="tel:+917860959337" className="ml-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                                                    +91 78609 59337
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 md:p-12 text-white">
                            <h3 className="text-2xl font-bold mb-8">Join Our Movement</h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-emerald-600 text-2xl font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Register as a Volunteer</h4>
                                        <p className="text-emerald-100">Join our community of change-makers</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-emerald-600 text-2xl font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Attend Orientation</h4>
                                        <p className="text-emerald-100">Learn about our mission and activities</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-emerald-600 text-2xl font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Start Making Impact</h4>
                                        <p className="text-emerald-100">Participate in our initiatives</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors z-50"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </motion.button>
        </div>
    );
}