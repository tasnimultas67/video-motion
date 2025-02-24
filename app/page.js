import Link from "next/link";
import VideoCard from "./components/VideoCard";

async function getTrendingVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=101&key=${apiKey}`;

  try {
    // Fetch trending videos
    const videosResponse = await fetch(videosUrl);
    if (!videosResponse.ok) {
      throw new Error("Failed to fetch trending videos");
    }
    const videosData = await videosResponse.json();

    // Extract unique channel IDs from the videos
    const channelIds = [
      ...new Set(videosData.items.map((video) => video.snippet.channelId)),
    ];

    // Fetch channel details for all unique channel IDs
    const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds.join(
      ","
    )}&key=${apiKey}`;
    const channelsResponse = await fetch(channelsUrl);
    if (!channelsResponse.ok) {
      throw new Error("Failed to fetch channel details");
    }
    const channelsData = await channelsResponse.json();

    // Create a map of channelId to channel details (including profile picture)
    const channelMap = {};
    channelsData.items.forEach((channel) => {
      channelMap[channel.id] = channel.snippet.thumbnails.default.url; // Use default or medium thumbnail
    });

    // Add channel profile picture URL to each video
    const videosWithChannelDetails = videosData.items.map((video) => ({
      ...video,
      channelProfilePicture: channelMap[video.snippet.channelId],
    }));

    return videosWithChannelDetails;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array if there's an error
  }
}
export default async function Home() {
  const videos = await getTrendingVideos();
  // console.log(videos);

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-stretch">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
