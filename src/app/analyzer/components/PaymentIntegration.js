'use client';

import { useState } from 'react';
import {
	FaCreditCard,
	FaPaypal,
	FaStripe,
	FaGooglePay,
	FaPlus,
} from 'react-icons/fa';
import { SiGooglepay } from 'react-icons/si';
import { useUser } from '@clerk/nextjs';

export default function PaymentIntegration() {
	const { user } = useUser();
	const [connectedProviders, setConnectedProviders] = useState([]);
	const [connecting, setConnecting] = useState(null);
	const [showTransactions, setShowTransactions] = useState(false);

	const isSignedIn = !!user?.id;

	const paymentProviders = [
		{
			id: 'gpay',
			name: 'Google Pay',
			icon: SiGooglepay,
			color: 'bg-blue-500',
			description: 'Connect your Google Pay transactions',
		},
		{
			id: 'paypal',
			name: 'PayPal',
			icon: FaPaypal,
			color: 'bg-blue-600',
			description: 'Import PayPal payment history',
		},
		{
			id: 'stripe',
			name: 'Stripe',
			icon: FaStripe,
			color: 'bg-purple-600',
			description: 'Connect Stripe payment data',
		},
	];

	// Sample transaction data with realistic and comprehensive examples
	const sampleTransactions = [
		{
			id: 1,
			merchant: 'Whole Foods Market',
			amount: '$87.43',
			date: '2024-10-18',
			category: 'Food Consumption',
			estimatedCO2: 15.8,
			provider: 'Apple Pay',
		},
		{
			id: 2,
			merchant: 'Shell Gas Station',
			amount: '$65.20',
			date: '2024-10-17',
			category: 'Transportation',
			estimatedCO2: 22.4,
			provider: 'Credit Card',
		},
		{
			id: 3,
			merchant: 'Home Depot',
			amount: '$234.56',
			date: '2024-10-16',
			category: 'Building & Home Maintenance',
			estimatedCO2: 38.7,
			provider: 'PayPal',
		},
		{
			id: 4,
			merchant: 'Starbucks',
			amount: '$12.75',
			date: '2024-10-15',
			category: 'Food Consumption',
			estimatedCO2: 3.2,
			provider: 'Google Pay',
		},
		{
			id: 5,
			merchant: 'Amazon',
			amount: '$156.89',
			date: '2024-10-14',
			category: 'Shopping & Online Purchases',
			estimatedCO2: 28.3,
			provider: 'Credit Card',
		},
		{
			id: 6,
			merchant: 'Pacific Gas & Electric',
			amount: '$145.67',
			date: '2024-10-13',
			category: 'Energy Use',
			estimatedCO2: 52.1,
			provider: 'Bank Transfer',
		},
		{
			id: 7,
			merchant: 'Waste Management Inc',
			amount: '$45.00',
			date: '2024-10-12',
			category: 'Waste Management',
			estimatedCO2: 8.9,
			provider: 'Credit Card',
		},
		{
			id: 8,
			merchant: 'City Water Department',
			amount: '$78.32',
			date: '2024-10-11',
			category: 'Water Usage',
			estimatedCO2: 12.6,
			provider: 'Bank Transfer',
		},
		{
			id: 9,
			merchant: 'Netflix',
			amount: '$15.99',
			date: '2024-10-10',
			category: 'Social Activities',
			estimatedCO2: 2.8,
			provider: 'Credit Card',
		},
		{
			id: 10,
			merchant: 'Best Buy',
			amount: '$899.99',
			date: '2024-10-09',
			category: 'Shopping & Online Purchases',
			estimatedCO2: 125.4,
			provider: 'Credit Card',
		},
	];

	const handleConnect = async (providerId) => {
		if (!isSignedIn) {
			alert('Please sign in to connect payment providers');
			return;
		}

		setConnecting(providerId);

		// Simulate connection process
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setConnectedProviders((prev) => [...prev, providerId]);
		setConnecting(null);
		setShowTransactions(true);

		alert('Connected successfully!');
	};

	const handleAddToDashboard = async (transaction) => {
		if (!isSignedIn) {
			alert('Please sign in to add transactions to dashboard');
			return;
		}

		try {
			const months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			];
			const currentMonth = months[new Date().getMonth()];

			// Map transaction category to dashboard categories
			const categories = {
				'Transportation': 0,
				'Energy Use': 0,
				'Food Consumption': 0,
				'Waste Management': 0,
				'Water Usage': 0,
				'Social Activities': 0,
				'Shopping & Online Purchases': 0,
				'Building & Home Maintenance': 0,
			};

			categories[transaction.category] = transaction.estimatedCO2;

			const payload = {
				clerkId: user.id,
				updatedAt: new Date().toISOString(),
				categories,
				monthlyData: { [currentMonth]: transaction.estimatedCO2 },
				displayName:
					user?.fullName ||
					[user?.firstName, user?.lastName].filter(Boolean).join(' '),
				imageUrl: user?.imageUrl || '',
				merchant: transaction.merchant,
				date: transaction.date,
				amount: transaction.amount,
				provider: transaction.provider,
				totalKg: transaction.estimatedCO2,
			};

			const res = await fetch('/api/footprint/save', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!res.ok) throw new Error('Failed to add to dashboard');

			alert('Transaction added to dashboard!');
		} catch (err) {
			console.error(err);
			alert('Failed to add to dashboard');
		}
	};

	return (
		<div className='space-y-6'>
			<div className='text-center mb-6'>
				<h2 className='text-2xl font-bold text-white mb-2'>
					Payment Integration
				</h2>
				<p className='text-gray-300 text-sm'>
					Connect your payment providers to automatically track carbon footprint
					from purchases
				</p>
			</div>

			{/* Payment Providers */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{paymentProviders.map((provider) => {
					const isConnected = connectedProviders.includes(provider.id);
					const isConnecting = connecting === provider.id;

					return (
						<div
							key={provider.id}
							className='bg-slate-700/30 border border-slate-600 rounded-lg p-6 text-center'
						>
							<div
								className={`w-16 h-16 ${provider.color} rounded-full flex items-center justify-center mx-auto mb-4`}
							>
								<provider.icon className='text-white text-2xl' />
							</div>
							<h3 className='text-white font-semibold mb-2'>{provider.name}</h3>
							<p className='text-gray-400 text-sm mb-4'>
								{provider.description}
							</p>

							<button
								onClick={() => handleConnect(provider.id)}
								disabled={isConnected || isConnecting}
								className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
									isConnected
										? 'bg-green-600 text-white cursor-not-allowed'
										: isConnecting
										? 'bg-gray-600 text-white cursor-not-allowed'
										: 'bg-emerald-500 text-white hover:bg-emerald-600'
								}`}
							>
								{isConnected ? (
									'Connected ✓'
								) : isConnecting ? (
									<div className='flex items-center justify-center gap-2'>
										<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
										Connecting...
									</div>
								) : (
									'Connect'
								)}
							</button>
						</div>
					);
				})}
			</div>

			{/* Sample Transactions */}
			{(showTransactions || connectedProviders.length > 0) && (
				<div className='bg-slate-700/30 border border-slate-600 rounded-lg p-6'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-white font-semibold flex items-center gap-2'>
							<FaCreditCard className='text-emerald-400' />
							Recent Transactions
						</h3>
						<span className='text-gray-400 text-sm'>
							{sampleTransactions.length} transactions
						</span>
					</div>

					<div className='space-y-3'>
						{sampleTransactions.map((transaction) => (
							<div
								key={transaction.id}
								className='bg-slate-800/50 border border-slate-600 rounded-lg p-4 flex items-center justify-between'
							>
								<div className='flex-1'>
									<div className='flex items-center justify-between mb-2'>
										<h4 className='text-white font-medium'>
											{transaction.merchant}
										</h4>
										<span className='text-emerald-400 font-semibold'>
											{transaction.amount}
										</span>
									</div>
									<div className='flex items-center gap-4 text-sm text-gray-400'>
										<span>{transaction.date}</span>
										<span>•</span>
										<span>{transaction.category}</span>
										<span>•</span>
										<span className='text-orange-400'>
											{transaction.estimatedCO2} kg CO₂e
										</span>
										<span>•</span>
										<span className='text-blue-400'>
											{transaction.provider}
										</span>
									</div>
								</div>

								<button
									onClick={() => handleAddToDashboard(transaction)}
									className='ml-4 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm flex items-center gap-2'
								>
									<FaPlus className='text-xs' />
									Add to Dashboard
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{!isSignedIn && (
				<div className='bg-amber-500/20 border border-amber-500 text-amber-300 text-sm p-3 rounded-lg text-center'>
					Please sign in to connect payment providers and add transactions to
					your dashboard
				</div>
			)}
		</div>
	);
}
