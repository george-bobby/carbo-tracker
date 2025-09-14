import Parser from "rss-parser";

const parser = new Parser();

const FEED_SOURCES = [
  {
    name: "UN News",
    url: "https://news.un.org/feed/subscribe/en/news/topic/climate-change/feed/rss.xml",
  },
  {
    name: "Guardian Environment",
    url: "https://www.theguardian.com/environment/rss",
  },
  {
    name: "WWF Climate",
    url: "https://wwf.panda.org/rss/feeds/publications/"
  },
  {
    name: "ScienceDaily Environment",
    url: "https://www.sciencedaily.com/rss/top/environment.xml",
  },
  {
    name: "UN Climate Change",
    url: "https://unfccc.int/rss.xml",
  },
  {
    name: "NASA Climate",
    url: "https://climate.nasa.gov/news/rss.xml",
  },
  {
    name: "BBC Climate / Environment",
    url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
  },
  {
    name: "Yale Environment 360",
    url: "https://e360.yale.edu/feed",
  },
  {
    name: "Mongabay Environment",
    url: "https://news.mongabay.com/feed/",
  },
  {
    name: "WWF News",
    url: "https://wwf.panda.org/rss/feeds/publications/",
  },
];

// keywords to filter
const KEYWORDS = [
  "carbon footprint",
  "eco-friendly",
  "eco friendly",
  "sustainable",
  "renewable",
  "green energy",
  "environment friendly",
  "emissions",
  "net zero",
  "recycling",
  "clean energy",
  "climate change",
  "weather conditions",
];

export async function GET() {
  try {
    const allFeeds = await Promise.all(
      FEED_SOURCES.map(async (src) => {
        try {
          const feed = await parser.parseURL(src.url);
          return {
            name: src.name,
            items: feed.items || [],
          };
        } catch (err) {
          console.error("Error parsing feed", src.name, err);
          return {
            name: src.name,
            items: [],
          };
        }
      })
    );

    // Combine items, tag source
    let combinedItems = [];
    allFeeds.forEach((f) => {
      f.items.forEach((item) => {
        combinedItems.push({
          title: item.title,
          link: item.link,
          contentSnippet: item.contentSnippet,
          pubDate: item.pubDate,
          enclosure: { url: item.enclosure?.url || null },
          sourceName: f.name,
        });
      });
    });

    // Filter by keywords
    const filtered = combinedItems.filter((item) => {
      const text = (item.title + " " + (item.contentSnippet || "")).toLowerCase();
      return KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
    });

    const formattedFeed = {
      items: filtered.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)),  // sort newest first
    };

    return new Response(JSON.stringify(formattedFeed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching multiple feeds:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch feeds" }), { status: 500 });
  }
}
