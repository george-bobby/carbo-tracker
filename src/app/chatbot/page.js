import React from 'react';
import Parser from 'rss-parser';

const NewsPage = async () => {
  const parser = new Parser();

  // Fetching multiple RSS feed data from various environmental sources
  const guardianFeed = await parser.parseURL('https://www.theguardian.com/environment/rss');
  const bbcFeed = await parser.parseURL('http://feeds.bbci.co.uk/news/science_and_environment/rss.xml');
  const unFeed = await parser.parseURL('https://news.un.org/feed/subscribe/en/news/topic/climate-change/feed/rss.xml');
  const natGeoFeed = await parser.parseURL('https://www.nationalgeographic.com/environment/rss');
  const reutersFeed = await parser.parseURL('https://www.reuters.com/rssFeed/environment');
  const ennFeed = await parser.parseURL('https://www.enn.com/rss/enn.xml');
  const ecoWatchFeed = await parser.parseURL('https://www.ecowatch.com/rss');

  // Combine all feed items from the different sources
  const allFeedItems = [
    ...guardianFeed.items,
    ...bbcFeed.items,
    ...unFeed.items,
    ...natGeoFeed.items,
    ...reutersFeed.items,
    ...ennFeed.items,
    ...ecoWatchFeed.items,
  ];

  // Handle empty or error cases
  if (!allFeedItems || allFeedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-4 my-8 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4 text-white bg-green-800 rounded-md p-2">
            Environment & Carbon Footprint News
          </h1>
          <p className="text-center text-gray-600">No news available at the moment. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-4 my-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-white bg-green-800 rounded-md p-2">
          Environment & Carbon Footprint News
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFeedItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={item.enclosure?.url || 'https://via.placeholder.com/300'}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{item.contentSnippet || 'No description available.'}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm text-green-800 hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">&copy; 2024 Environmental News</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;