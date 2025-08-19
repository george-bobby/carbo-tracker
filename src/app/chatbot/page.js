'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MdContentCopy, MdReceiptLong } from 'react-icons/md';
import { FaLeaf } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

export default function Page() {
	const { user } = useUser();

	const [input, setInput] = useState('');
	const [chatHistory, setChatHistory] = useState([]);
	const [loading, setLoading] = useState(false);

	// Receipt upload/demo states

	const [receiptPreview, setReceiptPreview] = useState(null);
	const [parsed, setParsed] = useState(null);
	const [saving, setSaving] = useState(false);
	const [analyzing, setAnalyzing] = useState(false);

	const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);

	const genText = async () => {
		if (!input.trim()) return; // Prevent empty input
		try {
			setLoading(true);
			const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

			const prompt = `Explain how the following activity contributes to the carbon footprint in detail: ${input}. Provide specific metrics or environmental impacts in a concise paragraph.`;

			const result = await model.generateContent(prompt);
			const response = result.response;
			const text = response.text();

			// Update chat history
			setChatHistory([...chatHistory, { user: input, bot: text }]);
			setInput('');
			setLoading(false);
		} catch (error) {
			console.error('Error generating content: ', error);
			setLoading(false);
			// You could add user-friendly error handling here
			alert('Failed to generate response. Please try again.');
		}
	};

	const onCopyText = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			alert('Text copied to clipboard!');
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	const handleUseSample = async () => {
		setAnalyzing(true);
		setParsed(null);
		setReceiptPreview('/sample-recipt.png');

		// Simulate analyzing for 1 second
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Set realistic sample data based on a grocery receipt
		const sampleData = {
			merchant: 'FreshMart Grocery Store',
			date: new Date().toISOString().slice(0, 10),
			categories: {
				foodConsumption: 12.5,
				shopping: 8.3,
				transportation: 2.1,
			},
		};
		sampleData.totalKg = Object.values(sampleData.categories).reduce(
			(a, b) => a + b,
			0
		);

		setParsed(sampleData);
		setAnalyzing(false);
	};

	return (
		<div className='relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden'>
			{/* Background Elements */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			{/* Main Container */}
			<div className='relative z-10 flex items-center justify-center min-h-screen px-4 py-12'>
				<div className='max-w-4xl w-full'>
					{/* Header */}
					<div className='flex items-center justify-center gap-2 mb-8'>
						<FaLeaf className='text-3xl sm:text-4xl text-emerald-400' />
						<h1 className='text-xl sm:text-3xl font-bold text-white'>
							Carbon Footprint Analyzer
						</h1>
					</div>

					{/* Tabs wrapper for two sections */}
					<TabGroup>
						<TabList className='grid grid-cols-2 gap-3 mb-6'>
							{['Activity Analyzer', 'Receipt Analyzer'].map((label) => (
								<Tab
									key={label}
									className={({ selected }) =>
										`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-emerald-400 ring-white ring-opacity-60 ring-offset-2 ring-offset-emerald-400 focus:outline-none focus:ring-2 ${
											selected
												? 'bg-emerald-900/50 shadow'
												: 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
										}`
									}
								>
									{label}
								</Tab>
							))}
						</TabList>

						<TabPanels>
							{/* Activity Analyzer */}
							<TabPanel>
								<div className='bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8'>
									{/* Chat Interface */}
									<div className='space-y-6'>
										{/* Chat History */}
										<div className='h-[400px] overflow-y-auto pr-2'>
											<AnimatePresence>
												{chatHistory.map((chat, index) => (
													<motion.div
														key={index}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														exit={{ opacity: 0, y: -20 }}
														transition={{ duration: 0.3 }}
														className='space-y-4'
													>
														{/* User Message */}
														<div className='flex justify-end'>
															<div className='bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 max-w-[80%]'>
																<p className='text-white text-sm sm:text-base'>
																	<strong>You:</strong> {chat.user}
																</p>
															</div>
														</div>

														{/* Bot Message */}
														<div className='flex justify-start'>
															<div className='bg-slate-700/50 border border-slate-600 rounded-lg p-4 max-w-[80%] relative'>
																<p className='text-gray-200 text-sm sm:text-base whitespace-pre-wrap'>
																	<strong>Bot:</strong> {chat.bot}
																</p>
																<button
																	onClick={() => onCopyText(chat.bot)}
																	className='absolute top-2 right-2 text-gray-400 hover:text-emerald-400 transition-all'
																>
																	<MdContentCopy size={16} />
																</button>
															</div>
														</div>
													</motion.div>
												))}
											</AnimatePresence>
										</div>

										{/* Input Field */}
										<div className='flex flex-col sm:flex-row items-center gap-4'>
											<input
												type='text'
												value={input}
												onChange={(e) => setInput(e.target.value)}
												placeholder='Enter an activity (e.g., flying, meat consumption)'
												className='w-full sm:flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base text-white placeholder-gray-400'
												onKeyDown={(e) => {
													if (e.key === 'Enter') genText();
												}}
											/>
											<button
												onClick={genText}
												disabled={loading}
												className='w-full sm:w-auto bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed'
											>
												{loading ? 'Generating...' : 'Generate'}
											</button>
										</div>
									</div>
								</div>
							</TabPanel>

							{/* Receipt Analyzer */}
							<TabPanel>
								<div className='bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8'>
									<h2 className='text-white font-bold text-lg mb-4'>
										Receipts Analyzer
									</h2>
									<p className='text-sm text-gray-300 mb-4'>
										Upload a receipt image (JPG/PNG).
									</p>

									<div className='space-y-4'>
										<div className='flex flex-col sm:flex-row gap-3'>
											<label className='flex items-center gap-2 text-gray-200 text-sm cursor-pointer bg-slate-700/50 px-4 py-2 rounded-lg hover:bg-slate-700/70 transition-colors'>
												<MdReceiptLong className='text-emerald-400' /> Upload
												receipt image
												<input
													type='file'
													accept='image/*'
													onChange={(e) => {
														const file = e.target.files?.[0];
														if (!file) return;
														setReceiptPreview(URL.createObjectURL(file));
														const demo = {
															merchant: 'Green Grocers',
															date: new Date().toISOString().slice(0, 10),
															categories: {
																shopping: 14,
																foodConsumption: 8,
																transportation: 3,
															},
														};
														demo.totalKg = Object.values(
															demo.categories
														).reduce((a, b) => a + b, 0);
														setParsed(demo);
													}}
													className='hidden'
												/>
											</label>

											<button
												onClick={handleUseSample}
												disabled={analyzing}
												className='flex items-center gap-2 text-gray-200 text-sm bg-emerald-600/20 px-4 py-2 rounded-lg hover:bg-emerald-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
											>
												<MdReceiptLong className='text-emerald-400' />
												{analyzing ? 'Analyzing...' : 'Use Sample'}
											</button>
										</div>

										{/* Receipt Preview */}
										{receiptPreview && (
											<div className='flex items-center gap-3'>
												<div className='w-16 h-16 rounded-md bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden'>
													<img
														src={receiptPreview}
														alt='receipt preview'
														className='w-full h-full object-cover'
													/>
												</div>
												<div className='text-sm text-gray-300'>
													Receipt loaded successfully
												</div>
											</div>
										)}

										{/* Analyzing State */}
										{analyzing && (
											<div className='mt-4 space-y-3 bg-slate-700/30 border border-slate-600 rounded-lg p-4'>
												<div className='flex items-center gap-3'>
													<div className='animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-400'></div>
													<h3 className='text-white font-semibold text-sm'>
														Analyzing Receipt...
													</h3>
												</div>
												<p className='text-gray-300 text-sm'>
													Processing receipt data and calculating carbon
													footprint...
												</p>
											</div>
										)}

										{parsed && (
											<div className='mt-4 space-y-3 bg-slate-700/30 border border-slate-600 rounded-lg p-4'>
												<h3 className='text-white font-semibold text-sm'>
													Parsed Summary
												</h3>
												<p className='text-gray-300 text-sm'>
													<span className='text-gray-400'>Merchant:</span>{' '}
													{parsed.merchant}
												</p>
												<p className='text-gray-300 text-sm'>
													<span className='text-gray-400'>Date:</span>{' '}
													{parsed.date}
												</p>
												<div className='text-gray-300 text-sm'>
													<span className='text-gray-400'>
														Estimated kg CO₂ by category:
													</span>
													<ul className='list-disc list-inside'>
														{Object.entries(parsed.categories).map(([k, v]) => (
															<li key={k}>
																{k
																	.replace(/([A-Z])/g, ' $1')
																	.replace(/^./, (s) => s.toUpperCase())}
																: <span className='text-emerald-300'>{v}</span>
															</li>
														))}
													</ul>
												</div>
												<p className='text-gray-200 font-medium'>
													Total:{' '}
													<span className='text-emerald-300'>
														{Math.round(parsed.totalKg)} kg CO₂e
													</span>
												</p>
												<button
													onClick={async () => {
														if (!user?.id || !parsed)
															return alert(
																'Please sign in and upload a receipt first.'
															);
														try {
															setSaving(true);
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
															const currentMonth =
																months[new Date().getMonth()];
															const payload = {
																clerkId: user.id,
																updatedAt: new Date().toISOString(),
																categories: parsed.categories,
																monthlyData: {
																	[currentMonth]: Math.round(parsed.totalKg),
																},
																displayName:
																	user?.fullName ||
																	[user?.firstName, user?.lastName]
																		.filter(Boolean)
																		.join(' ') ||
																	undefined,
																imageUrl: user?.imageUrl,
															};
															const res = await fetch('/api/save', {
																method: 'POST',
																headers: { 'Content-Type': 'application/json' },
																body: JSON.stringify(payload),
															});
															if (!res.ok)
																throw new Error('Failed to add to dashboard');
															alert('Added to dashboard!');
														} catch (e) {
															console.error(e);
															alert('Failed to add to dashboard');
														} finally {
															setSaving(false);
														}
													}}
													disabled={saving || !user?.id}
													className='mt-2 bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed'
												>
													{!user?.id
														? 'Sign in to add to Dashboard'
														: saving
														? 'Adding...'
														: 'Add to Dashboard'}
												</button>
											</div>
										)}
									</div>
								</div>
							</TabPanel>
						</TabPanels>
					</TabGroup>
				</div>
			</div>
		</div>
	);
}
