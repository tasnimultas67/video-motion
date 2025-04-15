"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, FireIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { BoltIcon, HomeIcon, TvIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownToLine,
  Clock,
  Gamepad2,
  History,
  ListVideo,
  Music,
  ThumbsUp,
  Trophy,
  TvMinimalPlayIcon,
} from "lucide-react";

export default function SideBar({ setSideOpen, sideOpen }) {
  return (
    <Dialog open={sideOpen} onClose={setSideOpen} className="relative z-[1000]">
      {/* Backdrop with transition */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/45 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Panel container */}
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
            {/* Panel with transition */}
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-[16rem] transform transition-all duration-500 ease-in-out data-[closed]:-translate-x-full"
            >
              {/* Panel content */}
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6 flex items-center justify-start gap-4">
                  <button className="flex items-center ">
                    <Bars3Icon
                      onClick={() => setSideOpen(false)}
                      className="size-6"
                    ></Bars3Icon>
                  </button>
                  {/* Logo */}
                  <div className="flex lg:flex-1">
                    <Link href="/" className=" p-1.5">
                      <div className="">
                        <Image
                          src="/MewMeww Logo.png"
                          width={120}
                          height={70}
                          alt="logo"
                          className=""
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-4">
                  {/* Youtube Nav */}
                  <div className="pb-3">
                    <button className="flex items-center justify-start gap-4 bg-gray-100 p-2 rounded-lg w-full">
                      <HomeIcon className="size-5"></HomeIcon>
                      Home
                    </button>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <BoltIcon className="size-5"></BoltIcon>
                      Shorts
                    </button>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <TvIcon className="size-5"></TvIcon>
                      Subscriptions
                    </button>
                  </div>
                  {/* Youtube Nav Ends */}
                  <hr />
                  {/* Personal Nav */}
                  <div className="mt-4 mb-3">
                    <h3 className="text-sm font-semibold text-gray-500 pb-2">
                      You {` `}
                      {`>`}
                    </h3>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <History className="size-5"></History>
                      History
                    </button>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <ListVideo className="size-5"></ListVideo>
                      Platlists
                    </button>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <TvMinimalPlayIcon className="size-5"></TvMinimalPlayIcon>
                      Your videos
                    </button>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <Clock className="size-5"></Clock>
                      Watch later
                    </button>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <ThumbsUp className="size-5"></ThumbsUp>
                      Liked Videos
                    </button>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <ArrowDownToLine className="size-5"></ArrowDownToLine>
                      Downloads
                    </button>
                  </div>
                  {/* Personal Nav Ends */}
                  <hr />
                  <div>
                    {/* Explores Nav */}
                    <div className="mt-4 mb-3">
                      <h3 className="text-sm font-semibold text-gray-500 pb-2">
                        Explore
                      </h3>
                      <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                        <FireIcon className="size-5"></FireIcon>
                        Trending
                      </button>
                      <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                        <Music className="size-5"></Music>
                        Music
                      </button>
                      <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                        <Gamepad2 className="size-5"></Gamepad2>
                        Gaming
                      </button>
                      <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                        <Trophy className="size-5"></Trophy>
                        Sports
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
