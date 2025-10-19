import clientPromise from '../../../dbConnect';

export async function POST(req) {
	try {
		console.log('Received request to /api/footprint/save');
		const client = await clientPromise;
		const db = client.db('carbo');

		let data;
		try {
			data = await req.json();
			console.log('Payload:', data);
		} catch (err) {
			console.error('Failed to parse JSON:', err);
			return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const { clerkId, monthlyData, updatedAt, categories, ...restData } = data;

		if (!clerkId || !monthlyData) {
			console.error('Missing clerkId or monthlyData');
			return new Response(
				JSON.stringify({ error: 'Missing clerkId or monthlyData' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

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

		// Fetch existing document
		const existingDocument = await db
			.collection('overall')
			.findOne({ clerkId });
		const existingMonthlyData = existingDocument?.monthlyData || {};

		// Initialize default months with 0 if missing
		const initialMonthlyData = Object.fromEntries(months.map((m) => [m, 0]));

		// Properly merge monthly data by incrementing existing values
		const mergedMonthlyData = { ...initialMonthlyData, ...existingMonthlyData };
		Object.entries(monthlyData).forEach(([month, value]) => {
			if (value > 0) {
				// Only process months with actual values
				mergedMonthlyData[month] = (mergedMonthlyData[month] || 0) + value;
			}
		});

		// Properly merge categories by incrementing existing values instead of replacing
		const existingCategories = existingDocument?.categories || {};
		const mergedCategories = { ...existingCategories };
		Object.entries(categories).forEach(([category, value]) => {
			if (value > 0) {
				// Only process categories with actual values
				mergedCategories[category] = (mergedCategories[category] || 0) + value;
			}
		});

		// Update or insert the document
		const result = await db.collection('overall').findOneAndUpdate(
			{ clerkId },
			{
				$set: {
					...restData,
					updatedAt: updatedAt ? new Date(updatedAt) : new Date(),
					monthlyData: mergedMonthlyData,
					categories: mergedCategories,
				},
				$setOnInsert: {
					createdAt: new Date(),
				},
			},
			{ upsert: true, returnDocument: 'after' }
		);

		console.log('Saved document:', result.value);

		return new Response(
			JSON.stringify({
				message: 'Document saved successfully',
				data: result.value,
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('Error in /api/footprint/save route:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
