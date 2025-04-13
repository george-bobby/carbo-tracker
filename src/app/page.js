'use client';
import React, { useState } from 'react';
import NewsSection from '../components/News';
import CallToAction from '../components/Action';
import ComingSoon from '../components/Coming';
import Hero from '../components/Hero';

export default function HeroSection() {
	return (
		<div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
			<Hero />
			<NewsSection />
			<ComingSoon />
			<CallToAction />
		</div>
	);
}
