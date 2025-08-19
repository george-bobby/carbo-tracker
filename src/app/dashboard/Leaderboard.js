'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { FaTrophy, FaArrowDown, FaArrowUp } from 'react-icons/fa';

// Leaderboard of lowest total emissions
// Uses /api/fetch which returns documents from the `overall` collection
// Each document is expected to have: { clerkId, categories, monthlyData, updatedAt }

const formatNumber = (n) =>
	typeof n === 'number' && isFinite(n) ? n.toLocaleString() : '-';

const formatDate = (d) => {
	try {
		const dt = typeof d === 'string' ? new Date(d) : d;
		if (!dt || isNaN(dt)) return '-';
		return dt.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	} catch {
		return '-';
	}
};

export default function Leaderboard({ clerkId: currentClerkId }) {
	const [allUsers, setAllUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchAll = async () => {
			try {
				const res = await fetch('/api/leaderboard');
				const data = await res.json();
				setAllUsers(Array.isArray(data) ? data : []);
			} catch (e) {
				console.error('Failed to load leaderboard data', e);
				setError('Failed to load leaderboard data');
			} finally {
				setLoading(false);
			}
		};
		fetchAll();
	}, []);

	const ranked = useMemo(() => {
		// Prefer server-computed fields from /api/leaderboard
		const shaped = allUsers.map((u) => ({
			clerkId: u.clerkId,
			displayName: u.displayName,
			imageUrl: u.imageUrl,
			total: u.total ?? 0,
			categories: u.categories || {},
			updatedAt: u.updatedAt,
			belowAverageCount: u.belowAverageCount ?? 0,
			recentReductionPct: u.recentReductionPct ?? null,
			composite: u.composite ?? 0,
		}));
		return shaped.sort(
			(a, b) => b.composite - a.composite || a.total - b.total
		);
	}, [allUsers]);

	const top10 = ranked.slice(0, 10);
	const top3 = ranked.slice(0, 3);

	const currentUserRank = useMemo(() => {
		if (!currentClerkId) return null;
		const idx = ranked.findIndex((r) => r.clerkId === currentClerkId);
		return idx >= 0 ? idx + 1 : null;
	}, [ranked, currentClerkId]);

	if (loading) {
		return (
			<div className='flex flex-col items-center justify-center text-center py-12'>
				<div className='h-16 w-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-4'>
					<div className='h-8 w-8 text-emerald-400 animate-pulse'>●</div>
				</div>
				<p className='text-gray-400 text-lg'>Loading leaderboard...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='text-center py-8'>
				<p className='text-red-400'>{error}</p>
			</div>
		);
	}

	if (!ranked.length) {
		return (
			<div className='text-center py-8'>
				<p className='text-gray-400'>No data available yet.</p>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			{/* Leaderboard list */}
			<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl shadow-xl'>
				<div className='flex items-center gap-3 mb-4'>
					<div className='h-8 w-8 rounded-md bg-emerald-900/50 flex items-center justify-center text-emerald-400'>
						<FaTrophy />
					</div>
					<h2 className='text-xl font-bold text-white'>Leaderboard</h2>
				</div>
				<div className='overflow-x-auto'>
					<table className='min-w-full text-sm'>
						<thead>
							<tr className='text-left text-gray-300'>
								<th className='py-2 pr-4'>Rank</th>
								<th className='py-2 pr-4'>User</th>
								<th className='py-2 pr-4'>Score</th>
								<th className='py-2 pr-4'>Total (kg CO₂)</th>
								<th className='py-2 pr-4'>Below Avg Cats</th>
								<th className='py-2 pr-4'>Recent Change</th>
								<th className='py-2 pr-4'>Last Updated</th>
							</tr>
						</thead>
						<tbody>
							{top10.map((u, i) => {
								const isCurrent = u.clerkId === currentClerkId;
								const idShort = u.clerkId?.slice(-6) || 'unknown';
								return (
									<tr
										key={u.clerkId + i}
										className={`${
											isCurrent ? 'bg-emerald-900/20' : ''
										} border-t border-slate-700/70 text-gray-200`}
									>
										<td className='py-3 pr-4'>
											<span
												className={`inline-flex items-center gap-2 px-2 py-1 rounded-md ${
													i === 0
														? 'bg-amber-500/20 text-amber-300'
														: i === 1
														? 'bg-slate-500/20 text-slate-300'
														: i === 2
														? 'bg-orange-500/20 text-orange-300'
														: 'bg-slate-700/50 text-slate-300'
												}`}
											>
												<FaTrophy /> #{i + 1}
											</span>
										</td>
										<td className='py-3 pr-4'>
											<div className='flex items-center gap-2'>
												{u.imageUrl ? (
													// eslint-disable-next-line @next/next/no-img-element
													<img
														src={u.imageUrl}
														alt='avatar'
														className='w-6 h-6 rounded-full'
													/>
												) : null}
												<span className='font-medium'>
													{u.displayName ||
														(isCurrent
															? `You (${idShort})`
															: `User • ${idShort}`)}
												</span>
											</div>
										</td>
										<td className='py-3 pr-4'>{formatNumber(u.composite)}</td>
										<td className='py-3 pr-4'>
											{formatNumber(Math.round(u.total))}
										</td>
										<td className='py-3 pr-4'>{u.belowAverageCount}</td>
										<td className='py-3 pr-4'>
											{u.recentReductionPct != null ? (
												<span
													className={
														u.recentReductionPct > 0
															? 'text-emerald-300'
															: 'text-gray-300'
													}
												>
													{u.recentReductionPct > 0 ? '+' : ''}
													{u.recentReductionPct}%
												</span>
											) : (
												<span className='text-gray-400'>—</span>
											)}
										</td>
										<td className='py-3 pr-4'>{formatDate(u.updatedAt)}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{currentUserRank && currentUserRank > 10 && (
					<div className='mt-3 text-sm text-gray-400'>
						Your current rank:{' '}
						<span className='text-emerald-300'>#{currentUserRank}</span>
					</div>
				)}
			</div>

			{/* Top performers details */}
			<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl shadow-xl'>
				<div className='flex items-center gap-3 mb-4'>
					<div className='h-8 w-8 rounded-md bg-emerald-900/50 flex items-center justify-center text-emerald-400'>
						<FaTrophy />
					</div>
					<h2 className='text-xl font-bold text-white'>
						Top Performers — Details
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{top3.map((u, i) => {
						// Compute top 3 categories for detail
						const entries = Object.entries(u.categories || {});
						const topCats = entries.sort((a, b) => b[1] - a[1]).slice(0, 4);
						const idShort = u.clerkId?.slice(-6) || 'unknown';
						return (
							<div
								key={u.clerkId + 'detail'}
								className='bg-slate-900/40 border border-slate-700 rounded-lg p-4'
							>
								<div className='text-xs text-gray-300 mb-2'>
									Below-avg categories: {u.belowAverageCount}{' '}
									{u.recentReductionPct != null ? (
										<span
											className={
												u.recentReductionPct > 0
													? 'text-emerald-300'
													: 'text-gray-400'
											}
										>
											• Recent change: {u.recentReductionPct > 0 ? '+' : ''}
											{u.recentReductionPct}%
										</span>
									) : null}
								</div>
								<div className='flex items-center justify-between mb-2'>
									<div className='flex items-center gap-2'>
										<span
											className={`inline-flex items-center gap-2 px-2 py-1 rounded-md ${
												i === 0
													? 'bg-amber-500/20 text-amber-300'
													: i === 1
													? 'bg-slate-500/20 text-slate-300'
													: 'bg-orange-500/20 text-orange-300'
											}`}
										>
											<FaTrophy /> #{i + 1}
											{u.imageUrl ? (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													src={u.imageUrl}
													alt='avatar'
													className='w-6 h-6 rounded-full'
												/>
											) : null}
											<span className='text-gray-200 font-semibold'>
												{u.displayName || `User • ${idShort}`}
											</span>
										</span>
									</div>
									<div className='text-right'>
										<div className='text-emerald-300 font-semibold'>
											Score: {formatNumber(u.composite)}
										</div>
										<div className='text-gray-300'>
											{formatNumber(Math.round(u.total))} kg CO₂
										</div>
									</div>
								</div>
								<div className='text-xs text-gray-400 mb-3'>
									Updated: {formatDate(u.updatedAt)}
								</div>
								<div className='space-y-2'>
									{topCats.map(([k, v]) => {
										const label = k
											.replace(/([A-Z])/g, ' $1')
											.replace(/^./, (s) => s.toUpperCase());
										const pct =
											u.total > 0
												? Math.min(100, Math.round((v / u.total) * 100))
												: 0;
										return (
											<div key={k}>
												<div className='flex items-center justify-between text-sm text-gray-300'>
													<span>{label}</span>
													<span>{formatNumber(Math.round(v))} kg</span>
												</div>
												<div className='w-full h-2 bg-slate-700 rounded'>
													<div
														className='h-2 bg-emerald-500 rounded'
														style={{ width: `${pct}%` }}
													/>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
