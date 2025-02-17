import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const VideoCard = ({ video }) => {
  return (
    <Link href={`/video/${video.id}`}>
      <div className=" p-2 rounded-lg  transition duration-300 cursor-pointer">
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h2 className="text-base font-medium line-clamp-2 ">
          {video.snippet.title}{" "}
        </h2>
        <p className="text-gray-600 flex items-center justify-start gap-1">
          {video.snippet.channelTitle}{" "}
          <CheckCircleIcon className="size-3.5  rounded-full text-gray-600"></CheckCircleIcon>
        </p>
        {/* <p>{video.snippet.channelTitle}</p> */}
      </div>
    </Link>
  );
};

export default VideoCard;
