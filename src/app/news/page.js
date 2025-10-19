'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const NewsPage = () => {
	const [initialFeeds, setInitialFeeds] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 15;
	const [hoveredCard, setHoveredCard] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch data from NewsAPI route
	const fetchFeeds = async () => {
		try {
			setLoading(true);
			setError(null);

			const res = await fetch('/api/news');
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || `HTTP error! status: ${res.status}`);
			}

			setInitialFeeds([data]);
		} catch (error) {
			console.error('Error fetching news:', error);
			setError(error.message || 'Failed to fetch news articles');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFeeds();
	}, []);

	// Combine all news items
	const allNewsItems = useMemo(
		() =>
			initialFeeds.flatMap((feed) =>
				feed.items.map((item) => ({
					...item,
					sourceName: feed.sourceName,
				}))
			),
		[initialFeeds]
	);

	// Filter by search
	const filteredItems = useMemo(() => {
		if (!searchTerm) return initialFeeds[0]?.items || [];
		const term = searchTerm.toLowerCase();
		return (
			initialFeeds[0]?.items.filter(
				(item) =>
					item.title.toLowerCase().includes(term) ||
					(item.contentSnippet &&
						item.contentSnippet.toLowerCase().includes(term))
			) || []
		);
	}, [searchTerm, initialFeeds]);

	// Pagination
	const paginatedItems = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredItems.slice(startIndex, endIndex);
	}, [currentPage, searchTerm, filteredItems]);

	const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

	return (
		<div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
			{/* Background */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			<div className='container mx-auto px-4 py-20 md:py-28'>
				{/* Header */}
				<div className='text-center space-y-6 mb-12'>
					<div className='inline-block px-4 py-1 bg-emerald-900/50 rounded-full mb-2 backdrop-blur-sm border border-emerald-500/20'>
						<p className='text-xs md:text-sm font-medium text-emerald-400 tracking-wide'>
							CLIMATE · UPDATES · NEWS
						</p>
					</div>
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white'>
						Latest <span className='text-emerald-400'>Climate News</span> &
						Updates
					</h1>
					<p className='text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed font-light'>
						Stay informed about climate change and carbon footprint news from
						trusted sources.
					</p>
				</div>

				{/* Search Bar */}
				<div className='max-w-2xl mx-auto mb-10 relative'>
					<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
						<svg
							className='h-5 w-5 text-emerald-500'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
						>
							<path
								fillRule='evenodd'
								d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.398 2.269a.75.75 0 11-1.132 1.082l-3.398-2.269A7 7 0 012 9z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
					<input
						type='text'
						placeholder='Search news articles...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full pl-12 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300'
					/>
				</div>

				{/* Loading State */}
				{loading && (
					<div className='flex justify-center items-center py-20'>
						<div className='text-center'>
							<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4'></div>
							<p className='text-gray-300'>Loading latest climate news...</p>
						</div>
					</div>
				)}

				{/* Error State */}
				{error && !loading && (
					<div className='max-w-2xl mx-auto mb-10'>
						<div className='bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center'>
							<div className='text-red-400 mb-2'>
								<svg
									className='w-8 h-8 mx-auto mb-2'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<h3 className='text-lg font-semibold text-red-300 mb-2'>
								Failed to Load News
							</h3>
							<p className='text-red-200 mb-4'>{error}</p>
							<button
								onClick={fetchFeeds}
								className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300'
							>
								Try Again
							</button>
						</div>
					</div>
				)}

				{/* Results Summary */}
				{!loading && !error && searchTerm && (
					<div className='mb-6 text-gray-400 text-center'>
						Found {filteredItems.length} results for "{searchTerm}"
					</div>
				)}

				{/* News Grid */}
				{!loading && !error && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{paginatedItems.map((item, index) => (
							<div
								key={index}
								className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/80'
								onMouseEnter={() => setHoveredCard(index)}
								onMouseLeave={() => setHoveredCard(null)}
							>
								{(item.enclosure?.url || item.image) && (
									<div className='relative overflow-hidden h-56'>
										<img
											src={item.enclosure?.url || item.image}
											alt={item.title}
											className='w-full h-full object-cover transition-transform duration-500 hover:scale-110'
										/>
									</div>
								)}

								<div className='p-6'>
									{searchTerm && (
										<div className='text-xs text-emerald-400 mb-2 font-medium'>
											{item.sourceName}
										</div>
									)}
									<h2 className='text-xl font-semibold text-white mb-3 line-clamp-2'>
										{item.title}
									</h2>
									<p className='text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3'>
										{item.contentSnippet || 'No description available.'}
									</p>
									<div className='mt-4 flex justify-between items-center'>
										<div className='text-xs text-gray-500'>
											{new Date(item.pubDate).toLocaleDateString()}
										</div>
										<a
											href={item.link}
											target='_blank'
											rel='noopener noreferrer'
											className={`flex items-center gap-2 text-sm transition-colors duration-300 group ${
												hoveredCard === index
													? 'text-emerald-400'
													: 'text-emerald-500'
											}`}
										>
											Read More
											<FaArrowRight className='w-3 h-3 group-hover:translate-x-1 transition-transform duration-300' />
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* No Results */}
				{!loading && !error && searchTerm && filteredItems.length === 0 && (
					<div className='text-center py-12'>
						<div className='mx-auto h-24 w-24 rounded-full bg-emerald-900/30 flex items-center justify-center mb-4'>
							<FaSearch className='h-10 w-10 text-emerald-500/50' />
						</div>
						<h3 className='text-xl font-medium text-white mb-2'>
							No results found
						</h3>
						<p className='text-gray-400'>
							No news items found matching "{searchTerm}"
						</p>
					</div>
				)}

				{/* Pagination */}
				{!loading && !error && filteredItems.length > 0 && (
					<div className='mt-12 flex justify-center items-center gap-4'>
						<button
							onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
							disabled={currentPage === 1}
							className='px-4 py-2 flex items-center gap-2 bg-slate-800 border border-slate-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors duration-300'
						>
							<FaArrowLeft className='w-3 h-3' />
							Previous
						</button>
						<div className='text-gray-300'>
							Page{' '}
							<span className='text-emerald-400 font-medium'>
								{currentPage}
							</span>{' '}
							of{' '}
							<span className='text-emerald-400 font-medium'>{totalPages}</span>
						</div>
						<button
							onClick={() =>
								setCurrentPage((page) => Math.min(page + 1, totalPages))
							}
							disabled={currentPage === totalPages}
							className='px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300'
						>
							Next
							<FaArrowRight className='w-3 h-3' />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default NewsPage;
