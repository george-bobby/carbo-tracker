'use client';

import { useState } from 'react';
import { MdReceiptLong, MdUpload, MdAnalytics } from 'react-icons/md';
import { useUser } from '@clerk/nextjs';
import { z } from 'zod';

// Zod schema for receipt analysis output
const ReceiptAnalysisSchema = z.object({
	merchant: z.string(),
	date: z.string(),
	items: z.array(
		z.object({
			name: z.string(),
			emissionKg: z.number(),
			category: z.string(),
		})
	),
	totalKg: z.number(),
	categories: z.record(z.number()),
});

export default function ReceiptAnalyzer() {
	const { user } = useUser();
	const [receiptPreview, setReceiptPreview] = useState(null);
	const [parsed, setParsed] = useState(null);
	const [isSample, setIsSample] = useState(false);
	const [analyzing, setAnalyzing] = useState(false);
	const [ocrStep, setOcrStep] = useState(false);
	const [aiStep, setAiStep] = useState(false);
	const [saving, setSaving] = useState(false);
	const [processingStatus, setProcessingStatus] = useState('');

	const isSignedIn = !!user?.id;

	// Map items to dashboard categories
	const mapItemsToDashboard = (items) => {
		const dashboardCategories = {
			'Transportation': 0,
			'Energy Use': 0,
			'Food Consumption': 0,
			'Waste Management': 0,
			'Water Usage': 0,
			'Social Activities': 0,
			'Shopping & Online Purchases': 0,
			'Building & Home Maintenance': 0,
		};

		items.forEach((item) => {
			const cat = item.category.toLowerCase();

			if (cat.includes('transport')) {
				dashboardCategories['Transportation'] += item.emissionKg;
			} else if (cat.includes('energy')) {
				dashboardCategories['Energy Use'] += item.emissionKg;
			} else if (
				cat.includes('food') ||
				cat.includes('grocery') ||
				cat.includes('drink') ||
				cat.includes('snack') ||
				cat.includes('meat') ||
				cat.includes('dairy') ||
				cat.includes('egg') ||
				cat.includes('plant') ||
				cat.includes('grain') ||
				cat.includes('vegetable') ||
				cat.includes('fruit') ||
				cat.includes('packaged')
			) {
				dashboardCategories['Food Consumption'] += item.emissionKg;
			} else if (cat.includes('waste')) {
				dashboardCategories['Waste Management'] += item.emissionKg;
			} else if (cat.includes('water')) {
				dashboardCategories['Water Usage'] += item.emissionKg;
			} else if (cat.includes('social') || cat.includes('entertainment')) {
				dashboardCategories['Social Activities'] += item.emissionKg;
			} else if (cat.includes('shopping') || cat.includes('purchase')) {
				dashboardCategories['Shopping & Online Purchases'] += item.emissionKg;
			} else if (cat.includes('building') || cat.includes('maintenance')) {
				dashboardCategories['Building & Home Maintenance'] += item.emissionKg;
			} else {
				// Default to Shopping for unmatched items
				dashboardCategories['Shopping & Online Purchases'] += item.emissionKg;
			}
		});

		return dashboardCategories;
	};

	// Sample receipt demo
	const handleUseSample = () => {
		const demoItems = [
			{
				name: 'Organic Bananas',
				emissionKg: 0.8,
				category: 'Food Consumption',
			},
			{ name: 'Chicken Breast', emissionKg: 6.0, category: 'Food Consumption' },
			{ name: 'Milk (1L)', emissionKg: 3.0, category: 'Food Consumption' },
			{ name: 'Bread', emissionKg: 1.8, category: 'Food Consumption' },
			{ name: 'Plastic Bags', emissionKg: 0.5, category: 'Waste Management' },
		];

		const categories = mapItemsToDashboard(demoItems);
		const totalKg = Object.values(categories).reduce(
			(sum, val) => sum + val,
			0
		);

		setParsed({
			merchant: 'Green Grocers',
			date: new Date().toISOString().slice(0, 10),
			items: demoItems,
			categories,
			totalKg,
		});
		setIsSample(true);
		setReceiptPreview('/sample-receipt.png');
	};

	const handleCloseSample = () => {
		setParsed(null);
		setIsSample(false);
		setReceiptPreview(null);
	};

	// Upload receipt with two-step OCR and AI analysis
	const handleUpload = async (file) => {
		if (!file) return;

		setParsed(null);
		setIsSample(false);
		setReceiptPreview(URL.createObjectURL(file));
		setAnalyzing(true);
		setOcrStep(true);
		setAiStep(false);
		setProcessingStatus('Extracting text from receipt...');

		try {
			// Convert image to base64
			const base64 = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result.split(',')[1]);
				reader.readAsDataURL(file);
			});

			// Call enhanced receipt analysis API (which now uses two-step process)
			const res = await fetch('/api/analyze_receipt_enhanced', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ image: base64 }),
			});

			// Update status to AI processing after OCR completes
			setOcrStep(false);
			setAiStep(true);
			setProcessingStatus('Analyzing receipt data with AI...');

			const data = await res.json();

			if (!res.ok || !data.success) {
				throw new Error(data.error || 'Failed to analyze receipt');
			}

			// Validate with Zod schema
			const validatedData = ReceiptAnalysisSchema.parse(data.parsed);
			validatedData.categories = mapItemsToDashboard(validatedData.items);

			setParsed(validatedData);
			setProcessingStatus('Analysis complete!');
		} catch (err) {
			console.error('Failed to analyze receipt:', err);

			// Show specific error message
			const errorMessage = err.message.includes('OCR')
				? 'Failed to extract text from receipt. Please ensure the image is clear and try again.'
				: err.message.includes('API key')
				? 'Service temporarily unavailable. Please try again later.'
				: 'Failed to analyze receipt. Please try again.';

			alert(errorMessage);
			setProcessingStatus('');
		} finally {
			setAnalyzing(false);
			setOcrStep(false);
			setAiStep(false);
		}
	};

	// Add parsed receipt to dashboard
	const handleAddToDashboard = async () => {
		if (!isSignedIn || !parsed)
			return alert('Please sign in and upload a receipt first.');

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
			const currentMonth = months[new Date().getMonth()];

			const payload = {
				clerkId: user.id,
				updatedAt: new Date().toISOString(),
				categories: parsed.categories,
				monthlyData: { [currentMonth]: parsed.totalKg },
				displayName:
					user?.fullName ||
					[user?.firstName, user?.lastName].filter(Boolean).join(' '),
				imageUrl: user?.imageUrl || '',
				merchant: parsed.merchant,
				date: parsed.date,
				items: parsed.items,
				totalKg: parsed.totalKg,
			};

			const res = await fetch('/api/save', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!res.ok) throw new Error('Failed to add to dashboard');

			alert('Added to dashboard!');
		} catch (err) {
			console.error(err);
			alert('Failed to add to dashboard');
		} finally {
			setSaving(false);
		}
	};

	const isImageLowQuality =
		parsed &&
		(!parsed.merchant || parsed.merchant === 'Unknown') &&
		(!parsed.totalKg || parsed.totalKg === 0);

	return (
		<div className='space-y-6'>
			<div className='text-center mb-6'>
				<h2 className='text-2xl font-bold text-white mb-2'>Receipt Analyzer</h2>
				<p className='text-gray-300 text-sm'>
					Upload receipts to automatically calculate carbon footprint
				</p>
			</div>

			{/* Upload Section */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{/* Upload Button */}
				<label className='cursor-pointer'>
					<input
						type='file'
						accept='image/*'
						onChange={(e) => handleUpload(e.target.files[0])}
						className='hidden'
					/>
					<div className='border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors'>
						<MdUpload className='mx-auto text-3xl text-gray-400 mb-2' />
						<p className='text-white font-medium'>Upload Receipt</p>
						<p className='text-gray-400 text-sm'>Click to select image</p>
					</div>
				</label>

				{/* Sample Button */}
				<button
					onClick={handleUseSample}
					className='border-2 border-slate-600 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors'
				>
					<MdAnalytics className='mx-auto text-3xl text-emerald-400 mb-2' />
					<p className='text-white font-medium'>Try Sample</p>
					<p className='text-gray-400 text-sm'>See how it works</p>
				</button>
			</div>

			{/* Receipt Preview */}
			{receiptPreview && (
				<div className='bg-slate-700/30 border border-slate-600 rounded-lg p-4'>
					<div className='flex items-center justify-between mb-3'>
						<h3 className='text-white font-semibold text-sm flex items-center gap-2'>
							<MdReceiptLong className='text-emerald-400' />
							Receipt Preview
						</h3>
						{isSample && (
							<button
								onClick={handleCloseSample}
								className='text-gray-400 hover:text-white text-sm'
							>
								Close Sample
							</button>
						)}
					</div>
					<img
						src={receiptPreview}
						alt='Receipt'
						className='max-w-full h-auto rounded border border-slate-600'
					/>
				</div>
			)}

			{/* Analysis Loading with Two-Step Process */}
			{analyzing && (
				<div className='bg-slate-700/30 border border-slate-600 rounded-lg p-4'>
					<div className='flex items-center gap-3 mb-3'>
						<div className='animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-400'></div>
						<h3 className='text-white font-semibold text-sm'>
							Analyzing Receipt...
						</h3>
					</div>

					{/* Processing Steps */}
					<div className='space-y-2'>
						<div className='flex items-center gap-3'>
							<div
								className={`w-4 h-4 rounded-full ${
									ocrStep
										? 'bg-emerald-400 animate-pulse'
										: ocrStep === false && aiStep
										? 'bg-emerald-600'
										: 'bg-slate-500'
								}`}
							></div>
							<span
								className={`text-sm ${
									ocrStep
										? 'text-emerald-300'
										: ocrStep === false && aiStep
										? 'text-emerald-400'
										: 'text-gray-400'
								}`}
							>
								Step 1: Extracting text from image
							</span>
						</div>
						<div className='flex items-center gap-3'>
							<div
								className={`w-4 h-4 rounded-full ${
									aiStep
										? 'bg-emerald-400 animate-pulse'
										: aiStep === false && !ocrStep && !analyzing
										? 'bg-emerald-600'
										: 'bg-slate-500'
								}`}
							></div>
							<span
								className={`text-sm ${
									aiStep
										? 'text-emerald-300'
										: aiStep === false && !ocrStep && !analyzing
										? 'text-emerald-400'
										: 'text-gray-400'
								}`}
							>
								Step 2: Analyzing data with AI
							</span>
						</div>
					</div>

					{processingStatus && (
						<p className='text-gray-300 text-sm mt-3 italic'>
							{processingStatus}
						</p>
					)}
				</div>
			)}

			{/* Low Quality Warning */}
			{isImageLowQuality && (
				<div className='bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded-lg'>
					⚠️ Unable to extract details. The receipt image might be unclear or
					low quality.
				</div>
			)}

			{/* Analysis Results */}
			{parsed && !isImageLowQuality && (
				<div className='bg-slate-700/30 border border-slate-600 rounded-lg p-4 space-y-4'>
					<h3 className='text-white font-semibold text-sm'>Analysis Results</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
						<div>
							<span className='text-gray-400'>Merchant:</span>
							<span className='text-white ml-2'>{parsed.merchant}</span>
						</div>
						<div>
							<span className='text-gray-400'>Date:</span>
							<span className='text-white ml-2'>{parsed.date}</span>
						</div>
					</div>

					<div className='text-sm'>
						<span className='text-gray-400'>Carbon Impact by Category:</span>
						<ul className='list-disc list-inside mt-2 space-y-1'>
							{Object.entries(parsed.categories).map(([category, value]) => (
								<li key={category} className='text-gray-300'>
									{category}:{' '}
									<span className='text-emerald-300 font-medium'>
										{value.toFixed(2)}
									</span>{' '}
									kg CO₂e
								</li>
							))}
						</ul>
					</div>

					<div className='flex items-center justify-between pt-4 border-t border-slate-600'>
						<div className='text-sm'>
							<span className='text-gray-400'>Total Impact:</span>
							<span className='text-emerald-300 font-bold ml-2 text-lg'>
								{parsed.totalKg.toFixed(2)} kg CO₂e
							</span>
						</div>

						{isSignedIn && (
							<button
								onClick={handleAddToDashboard}
								disabled={saving}
								className='bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 text-sm'
							>
								{saving ? 'Adding...' : 'Add to Dashboard'}
							</button>
						)}
					</div>
				</div>
			)}

			{!isSignedIn && (
				<div className='bg-amber-500/20 border border-amber-500 text-amber-300 text-sm p-3 rounded-lg text-center'>
					Please sign in to add receipts to your dashboard
				</div>
			)}
		</div>
	);
}
