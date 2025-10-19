import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

// Zod schema for structured receipt analysis
const ReceiptAnalysisSchema = z.object({
	merchant: z.string().describe('The name of the merchant/store'),
	date: z.string().describe('The date of the transaction (YYYY-MM-DD format)'),
	items: z
		.array(
			z.object({
				name: z.string().describe('The name of the item'),
				emissionKg: z.number().describe('Estimated CO2 emissions in kg'),
				category: z
					.string()
					.describe(
						'Category: Transportation, Energy Use, Food Consumption, Waste Management, Water Usage, Social Activities, Shopping & Online Purchases, or Building & Home Maintenance'
					),
			})
		)
		.describe('Array of items found on the receipt'),
	totalKg: z.number().describe('Total estimated CO2 emissions in kg'),
});

// Carbon emission factors for common items
const carbonFactors = {
	// Food items (kg CO2 per kg of product)
	beef: 60.0,
	lamb: 24.0,
	pork: 7.0,
	chicken: 6.0,
	fish: 5.0,
	milk: 3.0,
	cheese: 21.0,
	eggs: 4.5,
	bread: 1.8,
	rice: 4.0,
	pasta: 1.6,
	bananas: 0.8,
	apples: 0.4,
	tomatoes: 2.1,
	potatoes: 0.3,
	coffee: 15.0,
	tea: 1.9,
	// Non-food items
	plastic_bag: 0.5,
	paper_bag: 0.1,
	bottle: 0.6,
	can: 0.3,
	// Default factors
	food_default: 2.0,
	non_food_default: 1.0,
};

export async function POST(req) {
	try {
		const { image } = await req.json();

		if (!image) {
			return Response.json({ error: 'No image provided' }, { status: 400 });
		}

		// Step 1: Extract text using OCR.space API
		console.log('Step 1: Extracting text using OCR.space...');

		const ocrResponse = await fetch(
			`${req.nextUrl.origin}/api/receipts/extract`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ image }),
			}
		);

		if (!ocrResponse.ok) {
			const ocrError = await ocrResponse.json();
			throw new Error(
				`OCR extraction failed: ${ocrError.error || 'Unknown OCR error'}`
			);
		}

		const ocrData = await ocrResponse.json();

		if (!ocrData.success || !ocrData.extractedText) {
			throw new Error('Failed to extract text from receipt image');
		}

		const extractedText = ocrData.extractedText;
		console.log(
			'OCR extraction successful, text length:',
			extractedText.length
		);

		// Step 2: Parse extracted text using Gemini AI with Vercel AI SDK
		console.log('Step 2: Parsing text with Gemini AI...');

		const result = await generateObject({
			model: google('gemini-2.0-flash'),
			schema: ReceiptAnalysisSchema,
			messages: [
				{
					role: 'user',
					content: `Parse this receipt text and extract the following information:

1. Merchant name
2. Transaction date (YYYY-MM-DD format)
3. List of items with estimated carbon emissions

Receipt text:
${extractedText}

For each item, estimate the carbon footprint based on these guidelines:
- Food items: Use typical carbon factors (beef ~60kg CO2/kg, chicken ~6kg CO2/kg, milk ~3kg CO2/kg, etc.)
- Assume typical serving sizes if quantities aren't clear
- For non-food items, estimate based on material and manufacturing
- Categorize each item into one of these categories:
  * Transportation
  * Energy Use
  * Food Consumption
  * Waste Management
  * Water Usage
  * Social Activities
  * Shopping & Online Purchases
  * Building & Home Maintenance

Provide realistic carbon emission estimates in kg CO2 equivalent.

If the text doesn't clearly show a receipt, return minimal data with merchant "Unknown" and empty items array.`,
				},
			],
		});

		// Validate and return the structured result
		const parsed = result.object;

		// Ensure totalKg is calculated correctly
		parsed.totalKg = parsed.items.reduce(
			(sum, item) => sum + item.emissionKg,
			0
		);

		console.log('Receipt analysis completed successfully');

		return Response.json({
			success: true,
			parsed,
			extractedText, // Include extracted text for debugging
			ocrProcessingTime: ocrData.processingTime,
		});
	} catch (error) {
		console.error('Error analyzing receipt:', error);

		// Return specific error messages based on error type
		let errorMessage = 'Failed to analyze receipt';

		if (error.message.includes('OCR')) {
			errorMessage = error.message;
		} else if (error.message.includes('fetch')) {
			errorMessage = 'Network error during receipt analysis. Please try again.';
		} else if (error.message.includes('API key')) {
			errorMessage = 'Service configuration error. Please try again later.';
		}

		// Fallback response if analysis fails
		return Response.json({
			success: false,
			parsed: {
				merchant: 'Unknown',
				date: new Date().toISOString().slice(0, 10),
				items: [],
				totalKg: 0,
			},
			error: errorMessage,
		});
	}
}
