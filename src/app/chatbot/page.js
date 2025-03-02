'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MdContentCopy } from 'react-icons/md';
import { FaLeaf } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
	const [input, setInput] = useState('');
	const [chatHistory, setChatHistory] = useState([]);
	const [loading, setLoading] = useState(false);

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
			console.log('Error: ', error);
			setLoading(false);
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

	return (
		<div className='relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
			{/* Background Elements */}
			<div className='absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
			<div className='absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>

			{/* Chatbot Container */}
			<div className='relative z-10 flex items-center justify-center min-h-screen px-4 py-12'>
				<div className='max-w-2xl w-full bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8'>
					{/* Header */}
					<div className='flex items-center justify-center gap-2 mb-6'>
						<FaLeaf className='text-3xl sm:text-4xl text-emerald-400' />
						<h1 className='text-xl sm:text-3xl font-bold text-white'>
							Carbon Footprint Analyzer
						</h1>
					</div>

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

						{/* Footer Message */}
						<p className='text-xs sm:text-sm text-gray-400 text-center'>
							This tool calculates carbon footprints for common activities.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
