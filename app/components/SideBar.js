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

export default function SideBar({ setSideOpen, sideOpen }) {
  return (
    <Dialog open={sideOpen} onClose={setSideOpen} className="relative z-[2000]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/45 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
            <Transition
              show={true}
              as={Fragment}
              enter="transition ease-in duration-300"
              enterFrom="opacity-0 translate-x-1"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-1"
            >
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-xs transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  {/* <div className="absolute top-0 right-0  flex pt-4 duration-500 ease-in-out data-closed:opacity-0 ">
                  <button
                    type="button"
                    onClick={() => setSideOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div> */}
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-4 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      <div className="flex items-center justify-start gap-2">
                        <button className="flex items-center ">
                          <Bars3Icon
                            onClick={() => setSideOpen(false)}
                            className="size-6"
                          ></Bars3Icon>
                        </button>
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
                              <h3 className="font-bold text-base">
                                Video Motion
                              </h3>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Your content */}
                  </div>
                </div>
              </DialogPanel>
            </Transition>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
