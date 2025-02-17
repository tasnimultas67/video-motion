import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { timeAgo } from "../utils/timeAgo";

const VideoCard = ({ video }) => {
  // Function to format the duration (e.g., PT1H5M30S -> 1:05:30)
  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return `${hours ? `${hours}:` : ""}${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Link href={`/video/${video.id}`}>
      <div className="p-2 rounded-lg transition duration-300 cursor-pointer">
        <div className="relative">
          <Image
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.contentDetails.duration)}
          </span>
        </div>
        <div className="flex items-start gap-2">
          {/* Channel Profile Picture */}
          <div className="shrink-0">
            <Image
              src={video.channelProfilePicture}
              alt={video.snippet.channelTitle}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-base font-medium line-clamp-2">
              {video.snippet.title}
            </h2>
            <p className="text-gray-600 flex items-center justify-start gap-1">
              {video.snippet.channelTitle}{" "}
              <CheckCircleIcon className="size-3.5 rounded-full text-gray-600" />
            </p>
            <p className="text-gray-600 text-sm">
              {parseInt(video.statistics.viewCount).toLocaleString()} views •{" "}
              {timeAgo(video.snippet.publishedAt)} {/* Display upload time */}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
