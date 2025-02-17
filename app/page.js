import Link from "next/link";
import VideoCard from "./components/VideoCard";

async function getTrendingVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=101&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch trending videos");
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    return []; // Return an empty array if there's an error
  }
}

export default async function Home() {
  const videos = await getTrendingVideos();
  // console.log(videos);

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 items-stretch">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
