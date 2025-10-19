'use client';

import { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { FaLeaf, FaRobot, FaReceipt, FaCreditCard, FaPlane, FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Import components for each tab
import ChatbotAnalyzer from './components/ChatbotAnalyzer';
import ReceiptAnalyzer from './components/ReceiptAnalyzer';
import PaymentIntegration from './components/PaymentIntegration';
import TravelTracking from './components/TravelTracking';
import AIToolsTracking from './components/AIToolsTracking';

export default function AnalyzerPage() {
	const [selectedTab, setSelectedTab] = useState(0);

	const tabs = [
		{
			id: 'chatbot',
			name: 'Chatbot',
			icon: FaRobot,
			component: ChatbotAnalyzer,
			description: 'AI-powered carbon footprint analysis',
		},
		{
			id: 'receipts',
			name: 'Receipts',
			icon: FaReceipt,
			component: ReceiptAnalyzer,
			description: 'Analyze receipts for carbon impact',
		},
		{
			id: 'payments',
			name: 'Payments',
			icon: FaCreditCard,
			component: PaymentIntegration,
			description: 'Connect payment providers',
		},
		{
			id: 'travel',
			name: 'Travel',
			icon: FaPlane,
			component: TravelTracking,
			description: 'Track travel carbon footprint',
		},
		{
			id: 'ai',
			name: 'AI Tools',
			icon: FaBrain,
			component: AIToolsTracking,
			description: 'Monitor AI tool usage',
		},
	];

	return (
		<div className='relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden'>
			{/* Background Elements */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			{/* Main Container */}
			<div className='relative z-10 min-h-screen px-4 py-12'>
				<div className='max-w-7xl mx-auto'>
					{/* Header */}
					<div className='flex items-center justify-center gap-2 mb-8'>
						<FaLeaf className='text-3xl sm:text-4xl text-emerald-400' />
						<h1 className='text-xl sm:text-3xl font-bold text-white'>
							Carbon Footprint Analyzer
						</h1>
					</div>

					{/* Vertical Tab Layout */}
					<TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
						<div className='flex gap-6'>
							{/* Vertical Tab List */}
							<div className='w-64 flex-shrink-0'>
								<TabList className='flex flex-col space-y-2'>
									{tabs.map((tab, index) => (
										<Tab
											key={tab.id}
											className={({ selected }) =>
												`w-full text-left rounded-lg py-4 px-4 text-sm font-medium leading-5 transition-all duration-200 ${
													selected
														? 'bg-emerald-900/50 text-emerald-400 shadow-lg border border-emerald-500/20'
														: 'text-gray-300 hover:bg-slate-800/50 hover:text-white border border-transparent'
												}`
											}
										>
											<div className='flex items-center gap-3'>
												<tab.icon className='text-lg flex-shrink-0' />
												<div className='flex-1 min-w-0'>
													<div className='font-semibold'>{tab.name}</div>
													<div className='text-xs opacity-75 truncate'>
														{tab.description}
													</div>
												</div>
											</div>
										</Tab>
									))}
								</TabList>
							</div>

							{/* Content Area */}
							<div className='flex-1 min-w-0'>
								<TabPanels>
									{tabs.map((tab, index) => (
										<TabPanel key={tab.id}>
											<motion.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.3 }}
												className='bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8'
											>
												<tab.component />
											</motion.div>
										</TabPanel>
									))}
								</TabPanels>
							</div>
						</div>
					</TabGroup>
				</div>
			</div>
		</div>
	);
}
