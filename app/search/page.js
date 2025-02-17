import Link from "next/link";

async function getSearchResults(query) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${query}&key=${apiKey}`;

  try {
    // Fetch search results
    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) throw new Error("Failed to fetch search results");
    const searchData = await searchResponse.json();

    // Extract video IDs and channel IDs
    const videoIds = searchData.items.map((item) => item.id.videoId).join(",");
    const channelIds = searchData.items
      .map((item) => item.snippet.channelId)
      .join(",");

    // Fetch video details
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    // Fetch channel details
    const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${apiKey}`;
    const channelsResponse = await fetch(channelsUrl);
    const channelsData = await channelsResponse.json();

    // Create lookup objects
    const videoDetails = videosData.items.reduce((acc, item) => {
      acc[item.id] = {
        viewCount: item.statistics.viewCount,
        duration: item.contentDetails.duration,
      };
      return acc;
    }, {});

    const channelDetails = channelsData.items.reduce((acc, item) => {
      acc[item.id] = item.snippet.thumbnails.default.url;
      return acc;
    }, {});

    // Merge data
    return searchData.items.map((item) => ({
      ...item,
      statistics: videoDetails[item.id.videoId],
      contentDetails: videoDetails[item.id.videoId],
      channelThumbnail: channelDetails[item.snippet.channelId],
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Utility functions
function formatViewCount(viewCount) {
  if (!viewCount) return "No views";
  return new Intl.NumberFormat().format(viewCount) + " views";
}

function formatPublishedAt(publishedAt) {
  const date = new Date(publishedAt);
  const now = new Date();
  const diffYears = now.getFullYear() - date.getFullYear();
  if (diffYears >= 1) return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;

  const diffMonths = now.getMonth() - date.getMonth();
  if (diffMonths >= 1)
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays >= 1) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
  return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
}

const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return `${hours ? `${hours}:` : ""}${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const videos = await getSearchResults(query);

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="flex flex-col gap-3">
        {videos.map((video) => (
          <Link
            key={video.id.videoId}
            href={`/video/${video.id.videoId}`} // Redirect to single video page
            className="flex gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            {/* Thumbnail Section */}
            <div className="relative flex-shrink-0">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-[460px] h-[302px] rounded-lg object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-2 py-1 rounded text-white">
                {formatDuration(video.contentDetails.duration || "PT0S")}
              </span>
            </div>

            {/* Video Details Section */}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">{video.snippet.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                {video.channelThumbnail && (
                  <img
                    src={video.channelThumbnail}
                    alt={video.snippet.channelTitle}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>{video.snippet.channelTitle}</span>
              </div>
              <div className="text-sm text-gray-400">
                {formatViewCount(video.statistics?.viewCount)} •
                {formatPublishedAt(video.snippet.publishedAt)}
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {video.snippet.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
