import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ThumbsUp, Share2, MessageSquare } from "lucide-react";

async function getVideoDetails(videoId) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
  console.log(url);

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

async function getRelatedVideos(videoId) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${videoId}&maxResults=10&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching related videos:", error);
    return [];
  }
}

async function getComments(videoId) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export default async function VideoPage({ params }) {
  const video = await getVideoDetails(params.id);
  const relatedVideos = await getRelatedVideos(params.id);
  const comments = await getComments(params.id);

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        Video not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-8 grid grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="col-span-2">
        <div className="aspect-w-16 h-[500px]">
          <iframe
            src={`https://www.youtube.com/embed/${params.id}?autoplay=1`}
            className="w-full h-full rounded-xl"
            allowFullScreen
          />
        </div>

        {/* Video Metadata */}
        <h1 className="text-2xl font-bold mt-4">{video.snippet.title}</h1>

        {/* Channel Info and Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <img
              src={video.snippet.thumbnails.default.url}
              className="w-10 h-10 rounded-full"
              alt={video.snippet.channelTitle}
            />
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold">{video.snippet.channelTitle}</p>
                <CheckCircleIcon className="w-4 h-4 text-gray-600" />
              </div>
              <p className="text-sm text-gray-500">1.2M subscribers</p>
            </div>
            <button className="ml-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800">
              Subscribe
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <ThumbsUp className="w-5 h-5" />
              {Number(video.statistics.likeCount).toLocaleString()}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>

        {/* Video Stats */}
        <div className="mt-4 p-4 bg-gray-100 rounded-xl">
          <p className="font-semibold">
            {Number(video.statistics.viewCount).toLocaleString()} views
          </p>
          <p className="mt-2">{video.snippet.description}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            {Number(video.statistics.commentCount).toLocaleString()} Comments
          </h2>

          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 mt-4">
              <img
                src={
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                className="w-8 h-8 rounded-full"
                alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </p>
                  <span className="text-sm text-gray-500">
                    {new Date(
                      comment.snippet.topLevelComment.snippet.publishedAt
                    ).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1">
                  {comment.snippet.topLevelComment.snippet.textDisplay}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm text-gray-500">
                    {Number(
                      comment.snippet.topLevelComment.snippet.likeCount
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Videos Sidebar */}
      <div className="space-y-4">
        {relatedVideos.map((relatedVideo) => (
          <div key={relatedVideo.id.videoId} className="flex gap-3">
            <img
              src={relatedVideo.snippet.thumbnails.medium.url}
              className="w-40 h-24 rounded-xl"
              alt={relatedVideo.snippet.title}
            />
            <div>
              <h3 className="font-semibold line-clamp-2">
                {relatedVideo.snippet.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {relatedVideo.snippet.channelTitle}
              </p>
              <p className="text-sm text-gray-500">123K views • 2 days ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
