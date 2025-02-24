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
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { BoltIcon, HomeIcon, TvIcon } from "@heroicons/react/24/solid";
import { TvMinimalPlayIcon } from "lucide-react";

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
                    <Link
                      href="/"
                      className="-m-1.5 p-1 bg-red-400/10 rounded-lg px-3 border border-red-300 border-dashed"
                    >
                      <span className="sr-only">Video Motion</span>
                      <div className="flex items-center justify-start gap-1">
                        <Image
                          src="/favicon.ico"
                          width={15}
                          height={15}
                          alt="logo"
                          className="rotate-90"
                        ></Image>
                        <h3 className="font-bold text-base">Video Motion</h3>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="pb-3">
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <HomeIcon className="size-4"></HomeIcon>
                      Home
                    </button>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <BoltIcon className="size-4"></BoltIcon>
                      Shorts
                    </button>
                    <button className="flex items-center justify-start gap-4 hover:bg-gray-100 p-2 rounded-lg w-full">
                      <TvIcon className="size-4"></TvIcon>
                      Subscriptions
                    </button>
                  </div>
                  <hr />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
