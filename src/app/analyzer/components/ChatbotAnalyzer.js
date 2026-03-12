'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MdContentCopy } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const MODEL_CANDIDATES = [
	'gemini-2.0-flash',
	'gemini-1.5-flash',
	'gemini-1.5-pro',
];

function getFriendlyErrorMessage(error) {
	const message = error?.message || 'Unknown error';

	if (message.includes('[429')) {
		return 'Gemini quota exceeded. Please wait a minute and retry, or use a key/project with available quota.';
	}

	if (message.includes('[404') || message.includes('not supported')) {
		return 'Selected Gemini model is unavailable for this key/project. Try another key/project or redeploy with a supported model.';
	}

	if (message.includes('[403') || message.includes('permission')) {
		return 'Gemini key is blocked or restricted for this domain/project. Check API key restrictions.';
	}

	return 'Failed to generate response. Please try again.';
}

export default function ChatbotAnalyzer() {
	const [input, setInput] = useState('');
	const [chatHistory, setChatHistory] = useState([]);
	const [loading, setLoading] = useState(false);

	const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);

	const generateWithFallback = async (prompt) => {
		let lastError;

		for (const modelName of MODEL_CANDIDATES) {
			try {
				const model = genAI.getGenerativeModel({ model: modelName });
				const result = await model.generateContent(prompt);
				const response = result.response;
				return response.text();
			} catch (err) {
				lastError = err;
				const msg = err?.message || '';

				// Fallback on model-availability and per-model quota errors.
				if (
					!(
						msg.includes('[404') ||
						msg.includes('[429') ||
						msg.includes('not found') ||
						msg.includes('not supported') ||
						msg.includes('quota') ||
						msg.includes('Too Many Requests')
					)
				) {
					throw err;
				}
			}
		}

		throw lastError || new Error('No compatible Gemini model available');
	};

	const genText = async () => {
		if (!input.trim()) return; // Prevent empty input
		try {
			setLoading(true);

			const prompt = `Explain how the following activity contributes to the carbon footprint in detail: ${input}. Provide specific metrics or environmental impacts in a concise paragraph.`;
			const text = await generateWithFallback(prompt);

			// Update chat history
			setChatHistory((prev) => [...prev, { user: input, bot: text }]);
			setInput('');
			setLoading(false);
		} catch (error) {
			console.error('Error generating content: ', error);
			setLoading(false);
			alert(getFriendlyErrorMessage(error));
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
		<div className='space-y-6'>
			<div className='text-center mb-6'>
				<h2 className='text-2xl font-bold text-white mb-2'>Activity Analyzer</h2>
				<p className='text-gray-300 text-sm'>
					Ask about any activity to understand its carbon footprint impact
				</p>
			</div>

			{/* Chat History */}
			<div className='h-[400px] overflow-y-auto pr-2 space-y-4'>
				{chatHistory.length === 0 && (
					<div className='text-center text-gray-400 mt-20'>
						<p>Start a conversation about carbon footprint activities!</p>
						<p className='text-sm mt-2'>
							Try asking: "How does driving 50 miles affect my carbon footprint?"
						</p>
					</div>
				)}

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

							{/* Bot Response */}
							<div className='flex justify-start'>
								<div className='bg-slate-700/50 border border-slate-600 rounded-lg p-4 max-w-[80%] relative group'>
									<p className='text-gray-200 text-sm sm:text-base leading-relaxed'>
										<strong className='text-emerald-400'>AI:</strong> {chat.bot}
									</p>
									<button
										onClick={() => onCopyText(chat.bot)}
										className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-600 rounded'
										title='Copy response'
									>
										<MdContentCopy className='text-gray-400 hover:text-white text-sm' />
									</button>
								</div>
							</div>
						</motion.div>
					))}
				</AnimatePresence>

				{loading && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='flex justify-start'
					>
						<div className='bg-slate-700/50 border border-slate-600 rounded-lg p-4 max-w-[80%]'>
							<div className='flex items-center gap-2'>
								<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-400'></div>
								<p className='text-gray-200 text-sm'>AI is thinking...</p>
							</div>
						</div>
					</motion.div>
				)}
			</div>

			{/* Input Section */}
			<div className='flex flex-col sm:flex-row gap-3'>
				<input
					type='text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={(e) => e.key === 'Enter' && genText()}
					placeholder='Ask about any carbon footprint activity...'
					className='flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm sm:text-base'
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
	);
}
