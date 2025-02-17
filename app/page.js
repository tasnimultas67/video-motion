import Link from "next/link";

async function getTrendingVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=21&key=${apiKey}`;

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link key={video.id} href={`/video/${video.id}`}>
            <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{video.snippet.title}</h2>
              <p className="text-gray-400">{video.snippet.channelTitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
