// OCR.space API integration for text extraction from receipt images
const OCR_SPACE_API_KEY = process.env.OCR_SPACE_API_KEY;
const OCR_SPACE_API_URL = 'https://api.ocr.space/parse/image';

export async function POST(req) {
	try {
		// Check if API key is available
		if (!OCR_SPACE_API_KEY) {
			console.error('OCR_SPACE_API_KEY is not configured');
			return new Response(
				JSON.stringify({ error: 'OCR API key not configured' }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const { image } = await req.json();

		if (!image) {
			return new Response(
				JSON.stringify({ error: 'No image provided' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Convert base64 image to blob for multipart form data
		const imageBuffer = Buffer.from(image, 'base64');
		
		// Create form data for OCR.space API
		const formData = new FormData();
		formData.append('apikey', OCR_SPACE_API_KEY);
		formData.append('file', new Blob([imageBuffer], { type: 'image/jpeg' }), 'receipt.jpg');
		formData.append('language', 'eng');
		formData.append('isOverlayRequired', 'false');
		formData.append('OCREngine', '2'); // Engine 2 is optimized for receipts
		formData.append('isTable', 'true'); // Optimized for structured/tabular data

		console.log('Sending image to OCR.space API...');

		// Send request to OCR.space API
		const response = await fetch(OCR_SPACE_API_URL, {
			method: 'POST',
			body: formData,
			headers: {
				'User-Agent': 'CarbonTracker/1.0',
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('OCR.space API error:', response.status, errorText);
			throw new Error(`OCR API request failed: ${response.status} ${errorText}`);
		}

		const ocrData = await response.json();

		// Check for OCR processing errors
		if (ocrData.IsErroredOnProcessing) {
			console.error('OCR processing error:', ocrData.ErrorMessage);
			throw new Error(`OCR processing failed: ${ocrData.ErrorMessage || 'Unknown OCR error'}`);
		}

		// Check if we have parsed results
		if (!ocrData.ParsedResults || ocrData.ParsedResults.length === 0) {
			throw new Error('No text could be extracted from the image');
		}

		const parsedResult = ocrData.ParsedResults[0];

		// Check for file-specific errors
		if (parsedResult.FileParseExitCode !== 1) {
			console.error('File parsing error:', parsedResult.ErrorMessage);
			throw new Error(`File parsing failed: ${parsedResult.ErrorMessage || 'Unknown parsing error'}`);
		}

		// Extract the parsed text
		const extractedText = parsedResult.ParsedText;

		if (!extractedText || extractedText.trim().length === 0) {
			throw new Error('No text could be extracted from the image. Please ensure the image is clear and contains readable text.');
		}

		console.log('OCR extraction successful, text length:', extractedText.length);

		return new Response(
			JSON.stringify({
				success: true,
				extractedText: extractedText.trim(),
				processingTime: ocrData.ProcessingTimeInMilliseconds,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);

	} catch (error) {
		console.error('Error in OCR extraction:', error);

		// Return specific error messages based on error type
		let errorMessage = 'Failed to extract text from image';
		
		if (error.message.includes('fetch')) {
			errorMessage = 'Network error while processing image. Please check your internet connection.';
		} else if (error.message.includes('OCR')) {
			errorMessage = error.message;
		} else if (error.message.includes('API key')) {
			errorMessage = 'OCR service configuration error. Please try again later.';
		}

		return new Response(
			JSON.stringify({ 
				success: false,
				error: errorMessage 
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
