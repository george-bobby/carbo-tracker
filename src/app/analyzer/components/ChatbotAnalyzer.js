'use client';

import { useState } from 'react';
import { MdContentCopy } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

function MarkdownResponse({ text }) {
	return (
		<ReactMarkdown
			components={{
				p: ({ children }) => <p className='mb-3 last:mb-0'>{children}</p>,
				strong: ({ children }) => <strong className='font-semibold text-white'>{children}</strong>,
				em: ({ children }) => <em className='italic text-gray-100'>{children}</em>,
				ul: ({ children }) => <ul className='mb-3 list-disc space-y-1 pl-5'>{children}</ul>,
				ol: ({ children }) => <ol className='mb-3 list-decimal space-y-1 pl-5'>{children}</ol>,
				li: ({ children }) => <li className='pl-1'>{children}</li>,
				h1: ({ children }) => <h3 className='mb-2 text-base font-bold text-white'>{children}</h3>,
				h2: ({ children }) => <h4 className='mb-2 text-sm font-semibold text-white'>{children}</h4>,
				h3: ({ children }) => <h5 className='mb-2 text-sm font-semibold text-gray-100'>{children}</h5>,
				code: ({ children }) => (
					<code className='rounded bg-slate-800 px-1.5 py-0.5 text-emerald-300'>{children}</code>
				),
			}}
		>
			{text}
		</ReactMarkdown>
	);
}

function getFriendlyErrorMessage(error) {
	const message = error?.message || 'Unknown error';

	if (message.includes('[429')) {
		return 'Gemini quota exceeded. Please wait a minute and retry, or use a key/project with available quota.';
	}

	if (message.includes('[404') || message.includes('not supported')) {
		return 'The chatbot model is unavailable right now. Please retry in a moment.';
	}

	if (message.includes('[403') || message.includes('permission')) {
		return 'The Gemini API key is blocked or misconfigured on the server.';
	}

	return 'Failed to generate response. Please try again.';
}

export default function ChatbotAnalyzer() {
	const [input, setInput] = useState('');
	const [chatHistory, setChatHistory] = useState([]);
	const [loading, setLoading] = useState(false);

	const genText = async () => {
		if (!input.trim()) return; // Prevent empty input
		try {
			setLoading(true);

			const userInput = input.trim();
			const response = await fetch('/api/chatbot/analyze', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ input: userInput }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data?.error || 'Failed to generate response.');
			}

			// Update chat history
			setChatHistory((prev) => [...prev, { user: userInput, bot: data.text }]);
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
									<div className='text-gray-200 text-sm sm:text-base leading-relaxed'>
										<p className='mb-2 font-semibold text-emerald-400'>AI:</p>
										<MarkdownResponse text={chat.bot} />
									</div>
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
