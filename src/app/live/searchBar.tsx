// components/searchBar.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        router.push(`/live?location=${encodeURIComponent(searchQuery.trim())}`);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full px-4 py-3 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-300"
                >
                    Search
                </button>
            </div>
        </form>

    );
}