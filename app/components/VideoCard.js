import Image from "next/image";
import Link from "next/link";
import React from "react";

const VideoCard = ({ video }) => {
  return (
    <Link href={`/video/${video.id}`}>
      <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer">
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold line-clamp-2">
          {video.snippet.title}
        </h2>
        <p className="text-gray-400">{video.snippet.channelTitle}</p>
      </div>
    </Link>
  );
};

export default VideoCard;
