async function getVideoDetails(videoId) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch video details");
    }
    const data = await response.json();
    return data.items[0];
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}

export default async function VideoPage({ params }) {
  const video = await getVideoDetails(params.id);

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        Video not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${params.id}`}
            className="w-full h-full rounded-lg"
            allowFullScreen
          />
        </div>
        <h1 className="text-2xl font-bold mt-4">{video.snippet.title}</h1>
        <p className="text-gray-400">{video.snippet.channelTitle}</p>
        <p className="text-gray-400 mt-2">{video.statistics.viewCount} views</p>
      </div>
    </div>
  );
}
