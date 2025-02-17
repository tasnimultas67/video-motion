import {} from "lucide-react";

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
    <div className="min-h-screen bg-white text-black p-8 grid grid-cols-3">
      <div className="col-span-2">
        <div className="aspect-w-16 h-[500px]">
          <iframe
            src={`https://www.youtube.com/embed/${params.id}?autoplay=1`}
            className="w-full h-full rounded-xl"
            allowFullScreen
          />
          {/* <ReactPlayer
            url={`https://www.youtube.com/watch?v=${params.id}`}
            controls
            width="100%"
            height="100%"
            style={{ backgroundColor: "#000000" }}
            playing={true}
          /> */}
        </div>
        <h1 className="text-xl font-semibold mt-4">{video.snippet.title}</h1>
        <div className="flex items-center justify-start gap-1">
          <div className="size-6 rounded-full border bg-slate-400"></div>
          <p className="text-black font-semibold">
            {video.snippet.channelTitle}{" "}
            {/* <CheckCircle className="size-4  rounded-full text-gray-600"></CheckCircle> */}
          </p>
        </div>
        <div className="mt-2 p-2 rounded-xl bg-gray-200 text-sm">
          <p className="font-semibold">{video.statistics.viewCount} views</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
