import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ThumbsUp, Share2, MessageSquare } from "lucide-react";
import Link from "next/link";

// Fetch video details
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

// Fetch related videos
async function getRelatedVideos(videoId) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${videoId}&maxResults=14&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch related videos");
    }
    const data = await response.json();
    return data.items || []; // Return an empty array if `items` is undefined
  } catch (error) {
    console.error("Error fetching related videos:", error);
    return []; // Return an empty array in case of an error
  }
}

// Fetch popular videos as fallback
async function getPopularVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=40&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch popular videos");
    }
    const data = await response.json();
    return data.items || []; // Return an empty array if `items` is undefined
  } catch (error) {
    console.error("Error fetching popular videos:", error);
    return []; // Return an empty array in case of an error
  }
}

// Fetch comments
async function getComments(videoId) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const data = await response.json();
    return data.items || []; // Return an empty array if `items` is undefined
  } catch (error) {
    console.error("Error fetching comments:", error);
    return []; // Return an empty array in case of an error
  }
}

export default async function VideoPage({ params }) {
  const video = await getVideoDetails(params.id);
  const relatedVideos = await getRelatedVideos(params.id);
  const popularVideos = await getPopularVideos();
  const comments = await getComments(params.id);

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        Video not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 py-2 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="col-span-2">
        {/* Video Player */}
        <div className="aspect-w-16 h-[16rem] md:h-[500px]">
          <iframe
            src={`https://www.youtube.com/embed/${params.id}?autoplay=1`}
            className="w-full h-full rounded-xl"
            allowFullScreen
          />
        </div>

        {/* Video Metadata */}
        <h1 className="text-2xl font-bold mt-4">{video.snippet.title}</h1>

        {/* Channel Info and Actions */}
        <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
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
          <p className="mt-2 break-words">{video.snippet.description}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            {Number(video.statistics.commentCount).toLocaleString()} Comments
          </h2>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 mt-4">
                <img
                  src={
                    comment.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  className="w-8 h-8 rounded-full"
                  alt={
                    comment.snippet.topLevelComment.snippet.authorDisplayName
                  }
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">
                      {
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
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
            ))
          ) : (
            <p className="text-gray-500">No comments available.</p>
          )}
        </div>
      </div>

      {/* Related Videos Sidebar */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Related Videos</h2>
        {relatedVideos.length > 0 ? (
          relatedVideos.map((relatedVideo) => (
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
          ))
        ) : (
          <>
            <p className="text-gray-500">
              No related videos found. Here are some popular videos:
            </p>
            <div className="space-y-2">
              {popularVideos.map((video) => (
                <div key={video.id}>
                  <Link key={video.id} href={`/video/${video.id}`} className="">
                    <div className="flex gap-3">
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        className="w-40 h-24 rounded-xl"
                        alt={video.snippet.title}
                      />
                      <div>
                        <h3 className="font-semibold line-clamp-2">
                          {video.snippet.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {video.snippet.channelTitle}
                        </p>
                        <p className="text-sm text-gray-500">
                          123K views • 2 days ago
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
