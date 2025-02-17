"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Bell, Plus, Search } from "lucide-react";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white  top-0 left-0 sticky z-[1000] border-b">
      <header className="relative left-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 bg-red-400/20 rounded-lg px-3 border border-red-300 border-dashed"
            >
              <span className="sr-only">Video Motion</span>
              <div className="flex items-center justify-start gap-1">
                <Image
                  src="/favicon.ico"
                  width={20}
                  height={20}
                  alt="logo"
                  className="rotate-90"
                ></Image>
                <h3 className="font-bold text-lg">Video Motion</h3>
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div> */}

          {/* Search Button */}
          <div className="group flex items-center">
            <div className="flex h-9 md:ml-10 md:pl-5 border border-gray-400 rounded-l-3xl group-focus-within:border-black md:group-focus-within:ml-5 md:group-focus-within:pl-0 ">
              <div className="w-10 justify-center items-center hidden group-focus-within:md:flex">
                {/* <IoIosSearch className="text-black/[0.7] dark:text-white text-xl" /> */}
                <Search className="size-4" />
              </div>
              <input
                type="text"
                // value={searchQuery}
                placeholder="Search"
                // onChange={(e) => setSearchQuery(e.target.value)}
                // onKeyUp={searchQueryHandler}
                className="w-44 px-5 bg-transparent outline-none text-black dark:text-white md:pl-0 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
              />
            </div>
            <button
              // onClick={searchQueryHandler2}
              className="w-[40px] md:w-[60px] h-8 md:h-9 flex items-center justify-center border border-l-0 border-gray-400 rounded-r-3xl bg-gray-100 hover:bg-gray-200"
            >
              <Search className="size-5" />
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-5">
            <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 px-3 text-sm">
              <Plus className="size-5"></Plus> Create
            </button>
            <Bell className="size-6"></Bell>
            <Image
              src="https://tasnimul.vercel.app/_next/image?url=%2FTasnimul-Haque-3.jpg&w=1080&q=75"
              width={30}
              height={30}
              alt="Account"
              className="size-8 rounded-full"
            ></Image>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Video Motion</span>
                <h3 className="font-bold text-lg">Video Motion</h3>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
