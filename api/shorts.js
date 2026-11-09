import { parseYouTubeFeed } from './_parser.js';

const CHANNEL_ID = 'UC9eK_GJDUAqx0YEtqQoJ0vw';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  // Cache at Vercel Edge for 5 minutes, stale-while-revalidate for 10 minutes
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(FEED_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`YouTube RSS responded with HTTP ${response.status}`);
    }

    const xmlText = await response.text();
    const shorts = parseYouTubeFeed(xmlText);

    return res.status(200).json({
      success: true,
      updatedAt: new Date().toISOString(),
      channelId: CHANNEL_ID,
      count: shorts.length,
      shorts
    });
  } catch (error) {
    console.error('Failed to fetch YouTube feed:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch YouTube RSS feed'
    });
  }
}

