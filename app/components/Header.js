"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Bell, CircleUser, Plus } from "lucide-react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Search from "./Search";
import SideBar from "./SideBar";
import { useState, Fragment } from "react";
import HeaderSlide from "./HeaderSlide";
import WarningModal from "./WarningModal";
import { usePathname } from "next/navigation";

const socials = [
  {
    id: 1,
    icon: "/socialIcons/facebook.svg",
    title: "Facebook",
    href: "https://www.facebook.com/tasnimulh.tas/",
  },
  {
    id: 2,
    icon: "/socialIcons/instagram.svg",
    title: "Instagram",
    href: "https://www.instagram.com/_tasnimul_haque/",
  },
  {
    id: 3,
    icon: "/socialIcons/linkedin.svg",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/tasnimul-haque-/",
  },
  {
    id: 4,
    icon: "/socialIcons/github.svg",
    title: "Github",
    href: "https://github.com/tasnimultas67",
  },
  {
    id: 5,
    icon: "/socialIcons/twitter.svg",
    title: "Twitter",
    href: "https://x.com/tasnimultas",
  },
];

export default function Header() {
  const [sideOpen, setSideOpen] = useState(false);
  const [wModal, setWModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="bg-white top-0 left-0 sticky z-[1000] pb-3 space-y-2">
      <header className="relative left-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-3 lg:px-8 gap-4"
        >
          <div>
            <button className="flex items-center">
              <Bars3Icon
                onClick={() => setSideOpen(true)}
                className="size-6"
                aria-label="Open sidebar"
              />
              <SideBar sideOpen={sideOpen} setSideOpen={setSideOpen} />
            </button>
          </div>

          <div className="flex lg:flex-1 pl-1 lg:pl-2">
            <Link href="/" className=" p-1.5">
              <div className="flex items-center justify-center gap-1">
                <Image
                  src="/mewmeww-logo.svg"
                  width={30}
                  height={50}
                  alt="logo"
                  className=""
                />
                <h3 className="font-bold text-xl">MEWMEWW</h3>
              </div>
            </Link>
          </div>

          <div>
            <Search />
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-5">
            <button
              onClick={() => setWModal(true)}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 px-3 text-sm"
            >
              <Plus className="size-5" /> Create
            </button>
            <button
              onClick={() => setWModal(true)}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <Bell className="size-5" />
            </button>

            <div className="relative top-0 right-0">
              <Popover className="relative">
                <PopoverButton>
                  <Image
                    src="https://tasnimul.vercel.app/_next/image?url=%2FTasnimul-Haque-3.jpg&w=1080&q=75"
                    width={30}
                    height={30}
                    alt="Account"
                    className="size-8 rounded-full"
                    unoptimized
                  />
                </PopoverButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-in duration-300"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel className="absolute right-0 z-10 w-60 lg:w-80 p-3 lg:p-4 bg-white shadow-2xl rounded-xl border border-gray-200">
                    <div className="space-y-1.5">
                      <Image
                        src="https://tasnimul.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co.com%2FZd9ZGjm%2FPortrait-of-Tasnimul-Haque.jpg&w=2048&q=75"
                        width={500}
                        height={500}
                        alt="Tasnimul Haque"
                        className="h-60 lg:h-80 w-full object-cover rounded-lg"
                      />
                      <h3 className="text-lg font-semibold">Tasnimul Haque</h3>
                      <div>
                        <p className="text-gray-500 text-xs lg:text-sm 2xl:text-sm">
                          Tasnimul Haque, a 24-year-old developer and student
                          based in Dhaka, Bangladesh.
                        </p>
                        <Link
                          className="text-xs underline"
                          href="https://tasnimul.vercel.app/about"
                          alt="Developer About Link"
                        >
                          See More
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 justify-between bg-red-50 p-2 rounded-lg">
                        {socials.map((social) => (
                          <Link
                            key={social.id}
                            href={social.href}
                            target="_blank"
                          >
                            <Image
                              className="size-4"
                              src={social.icon}
                              width={20}
                              height={20}
                              alt={social.title}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </Popover>
            </div>
          </div>
        </nav>
      </header>

      {isHomePage && <HeaderSlide />}

      <WarningModal wModal={wModal} setWModal={setWModal} />
    </div>
  );
}
