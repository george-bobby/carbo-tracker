// NewsAPI integration for climate-related news
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2/everything';

// Climate and sustainability related keywords for NewsAPI search
const CLIMATE_KEYWORDS = [
	'carbon footprint',
	'climate change',
	'sustainability',
	'environmental news',
	'green technology',
	'renewable energy',
	'eco-friendly',
	'emissions',
	'net zero',
	'clean energy',
	'global warming',
	'environmental protection',
];

export async function GET() {
	try {
		// Check if API key is available
		if (!NEWS_API_KEY) {
			console.error('NEWS_API_KEY is not configured');
			return new Response(
				JSON.stringify({ error: 'News API key not configured' }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Create search query with climate keywords
		const searchQuery = CLIMATE_KEYWORDS.slice(0, 5).join(' OR '); // Use first 5 keywords to avoid URL length issues

		// Calculate date for last 7 days to get recent articles
		const fromDate = new Date();
		fromDate.setDate(fromDate.getDate() - 7);
		const fromDateString = fromDate.toISOString().split('T')[0];

		// Build NewsAPI request URL
		const params = new URLSearchParams({
			q: searchQuery,
			from: fromDateString,
			sortBy: 'publishedAt',
			language: 'en',
			pageSize: '50', // Get more articles to have good selection
			apiKey: NEWS_API_KEY,
		});

		const newsApiUrl = `${NEWS_API_BASE_URL}?${params}`;

		console.log(
			'Fetching from NewsAPI:',
			newsApiUrl.replace(NEWS_API_KEY, '[API_KEY]')
		);

		// Fetch from NewsAPI
		const response = await fetch(newsApiUrl, {
			headers: {
				'User-Agent': 'CarbonTracker/1.0',
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('NewsAPI error:', response.status, errorText);

			if (response.status === 429) {
				return new Response(
					JSON.stringify({
						error: 'Rate limit exceeded. Please try again later.',
					}),
					{ status: 429, headers: { 'Content-Type': 'application/json' } }
				);
			}

			throw new Error(
				`NewsAPI request failed: ${response.status} ${errorText}`
			);
		}

		const newsData = await response.json();

		if (newsData.status !== 'ok') {
			console.error('NewsAPI returned error:', newsData);
			throw new Error(`NewsAPI error: ${newsData.message || 'Unknown error'}`);
		}

		// Transform NewsAPI articles to match existing format
		const transformedArticles = newsData.articles
			.filter(
				(article) =>
					article.title &&
					article.url &&
					article.title !== '[Removed]' &&
					article.description !== '[Removed]'
			)
			.map((article) => ({
				title: article.title,
				link: article.url,
				contentSnippet: article.description || 'No description available.',
				pubDate: article.publishedAt,
				enclosure: { url: article.urlToImage || null },
				image: article.urlToImage || null,
				sourceName: article.source?.name || 'Unknown Source',
			}))
			.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)); // Sort newest first

		const formattedFeed = {
			items: transformedArticles,
			totalResults: newsData.totalResults,
			source: 'NewsAPI',
		};

		return new Response(JSON.stringify(formattedFeed), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
			},
		});
	} catch (error) {
		console.error('Error fetching news from NewsAPI:', error);

		// Return a more specific error message
		const errorMessage = error.message.includes('fetch')
			? 'Network error while fetching news. Please check your internet connection.'
			: 'Failed to fetch news articles. Please try again later.';

		return new Response(JSON.stringify({ error: errorMessage }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
