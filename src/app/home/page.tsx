"use client";
import React from 'react';
// import { SearchBar } from '../live/searchBar';
import { Features } from './Features';
import Stats from './Stats';
import { CallToAction } from './CallToAction';
import { NewsSection } from './NewsSection';
import { useClerk } from '@clerk/clerk-react';

export default function Home() {
    const { user } = useClerk();
    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="flex-grow">
                <main >
                    <Stats />
                    <Features />
                    <NewsSection />
                    <CallToAction />
                </main>

            </div>
        </div>
    );
}