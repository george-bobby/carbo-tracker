'use client';

import { useState } from 'react';
import { FaBrain, FaRobot, FaPlus, FaComments } from 'react-icons/fa';
import { SiOpenai, SiGoogle, SiAnthropic } from 'react-icons/si';
import { useUser } from '@clerk/nextjs';

export default function AIToolsTracking() {
	const { user } = useUser();
	const [connectedTools, setConnectedTools] = useState([]);
	const [connecting, setConnecting] = useState(null);
	const [showUsageData, setShowUsageData] = useState(false);

	const isSignedIn = !!user?.id;

	const aiTools = [
		{
			id: 'chatgpt',
			name: 'ChatGPT',
			icon: SiOpenai,
			color: 'bg-green-600',
			description: 'Track ChatGPT conversations',
		},
		{
			id: 'gemini',
			name: 'Google Gemini',
			icon: SiGoogle,
			color: 'bg-blue-500',
			description: 'Monitor Gemini AI interactions',
		},
		{
			id: 'claude',
			name: 'Claude',
			icon: SiAnthropic,
			color: 'bg-orange-500',
			description: 'Connect Claude AI usage data',
		},
	];

	// Sample AI usage data with realistic and comprehensive examples
	const sampleUsageData = [
		{
			id: 1,
			tool: 'ChatGPT',
			sessions: 25,
			date: '2024-10-18',
			estimatedCO2: 0.375,
			service: 'OpenAI',
			icon: SiOpenai,
			description: 'Code generation, debugging, and technical documentation',
		},
		{
			id: 2,
			tool: 'Google Gemini',
			sessions: 12,
			date: '2024-10-17',
			estimatedCO2: 0.192,
			service: 'Google',
			icon: SiGoogle,
			description: 'Document analysis, image processing, and data extraction',
		},
		{
			id: 3,
			tool: 'Claude',
			sessions: 18,
			date: '2024-10-16',
			estimatedCO2: 0.288,
			service: 'Anthropic',
			icon: SiAnthropic,
			description: 'Creative writing, research assistance, and content editing',
		},
		{
			id: 4,
			tool: 'ChatGPT',
			sessions: 35,
			date: '2024-10-15',
			estimatedCO2: 0.525,
			service: 'OpenAI',
			icon: SiOpenai,
			description: 'Data analysis, API development, and system architecture',
		},
		{
			id: 5,
			tool: 'Google Gemini',
			sessions: 8,
			date: '2024-10-14',
			estimatedCO2: 0.128,
			service: 'Google',
			icon: SiGoogle,
			description: 'Multimodal analysis and video content processing',
		},
		{
			id: 6,
			tool: 'Claude',
			sessions: 14,
			date: '2024-10-13',
			estimatedCO2: 0.224,
			service: 'Anthropic',
			icon: SiAnthropic,
			description: 'Legal document review and compliance analysis',
		},
		{
			id: 7,
			tool: 'ChatGPT',
			sessions: 28,
			date: '2024-10-12',
			estimatedCO2: 0.42,
			service: 'OpenAI',
			icon: SiOpenai,
			description: 'Machine learning model training and optimization',
		},
		{
			id: 8,
			tool: 'Google Gemini',
			sessions: 16,
			date: '2024-10-11',
			estimatedCO2: 0.256,
			service: 'Google',
			icon: SiGoogle,
			description: 'Scientific research and academic paper analysis',
		},
	];

	const handleConnect = async (toolId) => {
		if (!isSignedIn) {
			alert('Please sign in to connect AI tools');
			return;
		}

		setConnecting(toolId);

		// Simulate connection process
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setConnectedTools((prev) => [...prev, toolId]);
		setConnecting(null);
		setShowUsageData(true);

		alert('Connected successfully!');
	};

	const handleAddToDashboard = async (usageData) => {
		if (!isSignedIn) {
			alert('Please sign in to add AI usage data to dashboard');
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

			// Map AI usage to the new AI Tool Usage category
			const categories = {
				'Transportation': 0,
				'Energy Use': 0,
				'Food Consumption': 0,
				'Waste Management': 0,
				'Water Usage': 0,
				'Social Activities': 0,
				'Shopping & Online Purchases': 0,
				'Building & Home Maintenance': 0,
				'AI Tool Usage': usageData.estimatedCO2,
				'Digital & Cloud Services': 0,
			};

			const payload = {
				clerkId: user.id,
				updatedAt: new Date().toISOString(),
				categories,
				monthlyData: { [currentMonth]: usageData.estimatedCO2 },
				displayName:
					user?.fullName ||
					[user?.firstName, user?.lastName].filter(Boolean).join(' '),
				imageUrl: user?.imageUrl || '',
				aiTool: usageData.tool,
				sessions: usageData.sessions,
				date: usageData.date,
				service: usageData.service,
				description: usageData.description,
				totalKg: usageData.estimatedCO2,
			};

			const res = await fetch('/api/footprint/save', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!res.ok) throw new Error('Failed to add to dashboard');

			alert('AI usage data added to dashboard!');
		} catch (err) {
			console.error(err);
			alert('Failed to add to dashboard');
		}
	};

	return (
		<div className='space-y-6'>
			<div className='text-center mb-6'>
				<h2 className='text-2xl font-bold text-white mb-2'>
					AI Tools Tracking
				</h2>
				<p className='text-gray-300 text-sm'>
					Connect your AI tools to track carbon footprint from AI model usage
				</p>
			</div>

			{/* AI Tools */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{aiTools.map((tool) => {
					const isConnected = connectedTools.includes(tool.id);
					const isConnecting = connecting === tool.id;

					return (
						<div
							key={tool.id}
							className='bg-slate-700/30 border border-slate-600 rounded-lg p-6 text-center'
						>
							<div
								className={`w-16 h-16 ${tool.color} rounded-full flex items-center justify-center mx-auto mb-4`}
							>
								<tool.icon className='text-white text-2xl' />
							</div>
							<h3 className='text-white font-semibold mb-2'>{tool.name}</h3>
							<p className='text-gray-400 text-sm mb-4'>{tool.description}</p>

							<button
								onClick={() => handleConnect(tool.id)}
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

			{/* Sample Usage Data */}
			{(showUsageData || connectedTools.length > 0) && (
				<div className='bg-slate-700/30 border border-slate-600 rounded-lg p-6'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-white font-semibold flex items-center gap-2'>
							<FaComments className='text-emerald-400' />
							Recent AI Usage
						</h3>
						<span className='text-gray-400 text-sm'>
							{sampleUsageData.length} sessions
						</span>
					</div>

					<div className='space-y-3'>
						{sampleUsageData.map((usage) => (
							<div
								key={usage.id}
								className='bg-slate-800/50 border border-slate-600 rounded-lg p-4 flex items-center justify-between'
							>
								<div className='flex items-center gap-4'>
									<div className='w-10 h-10 bg-emerald-900/50 rounded-full flex items-center justify-center'>
										<usage.icon className='text-emerald-400 text-lg' />
									</div>
									<div className='flex-1'>
										<div className='flex items-center gap-2 mb-1'>
											<h4 className='text-white font-medium'>{usage.tool}</h4>
											<span className='text-gray-400 text-sm'>
												({usage.sessions} sessions)
											</span>
										</div>
										<div className='text-sm text-gray-400 mb-1'>
											{usage.description}
										</div>
										<div className='flex items-center gap-4 text-sm text-gray-400'>
											<span>{usage.date}</span>
											<span>•</span>
											<span className='text-orange-400'>
												{usage.estimatedCO2} kg CO₂e
											</span>
											<span>•</span>
											<span className='text-blue-400'>{usage.service}</span>
										</div>
									</div>
								</div>

								<button
									onClick={() => handleAddToDashboard(usage)}
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
					Please sign in to connect AI tools and add usage data to your
					dashboard
				</div>
			)}
		</div>
	);
}
