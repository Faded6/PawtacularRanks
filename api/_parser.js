// Helper to parse YouTube XML feed in Node.js without heavy external dependencies
export function parseYouTubeFeed(xml) {
  const entries = [];
  const entryMatches = xml.match(/<entry>([\s\S]*?)<\/entry>/g) || [];

  for (const entryStr of entryMatches) {
    const videoIdMatch = entryStr.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    if (!videoIdMatch) continue;
    const videoId = videoIdMatch[1];

    const titleMatch = entryStr.match(/<title>([\s\S]*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : 'New Countdown';

    const publishedMatch = entryStr.match(/<published>([^<]+)<\/published>/);
    const published = publishedMatch ? publishedMatch[1] : '';

    const viewsMatch = entryStr.match(/<media:statistics views="([0-9]+)"/);
    const viewsCount = viewsMatch ? parseInt(viewsMatch[1], 10) : 0;

    const descMatch = entryStr.match(/<media:description>([\s\S]*?)<\/media:description>/);
    const rawDesc = descMatch ? descMatch[1] : '';

    // Extract ranks from description (e.g., "1. Window Gaze 😱")
    const rank1Match = rawDesc.match(/1\.\s*([^\n\r]+)/);
    const featuredRank1 = rank1Match ? rank1Match[1].trim() : 'Rank #1 Winner 👑';

    // Auto-categorize based on title text
    const lower = title.toLowerCase();
    let category = 'all-stars';
    let categoryName = 'All-Star Animals';
    let badge = '🐾 Top Pick';

    if (lower.includes('dog') || lower.includes('puppy') || lower.includes('chihuahua') || lower.includes('frenchie')) {
      category = 'dogs';
      categoryName = 'Dogs & Puppies';
      badge = '🐶 Canine Chaos';
    } else if (lower.includes('husky')) {
      category = 'dogs';
      categoryName = 'Huskies & Drama';
      badge = '🐺 Drama Kings';
    } else if (lower.includes('cat') || lower.includes('kitten')) {
      category = 'cats';
      categoryName = 'Cats & Felines';
      badge = '🐱 Feline Comedy';
    } else if (lower.includes('otter')) {
      category = 'aquatic';
      categoryName = 'Otters & Splash';
      badge = '🦦 Chaos Otters';
    } else if (lower.includes('duck') || lower.includes('bird')) {
      category = 'birds';
      categoryName = 'Ducks & Birds';
      badge = '🦆 Derp Squad';
    } else if (lower.includes('squirrel') || lower.includes('monkey') || lower.includes('horse') || lower.includes('raccoon')) {
      category = 'wild';
      categoryName = 'Wild & Farm';
      badge = '🐿️ Wild Legends';
    }

    // Clean description preview
    const cleanDesc = rawDesc
      .split('🎥 Original footage')[0]
      .split('#shorts')[0]
      .trim();

    entries.push({
      id: videoId,
      title: decodeHtmlEntities(title),
      published,
      category,
      categoryName,
      badge,
      views: viewsCount > 0 ? `${viewsCount.toLocaleString()} views` : 'New Drop',
      description: cleanDesc || 'Watch the latest Top 5 funniest animal countdown!',
      featuredRank1: decodeHtmlEntities(featuredRank1)
    });
  }

  return entries;
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
