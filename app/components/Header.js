"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Bell, CircleUser, Plus } from "lucide-react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import Search from "./Search";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import HeaderSlide from "./HeaderSlide";
import WarningModal from "./WarningModal";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const isHomePage = router.pathname === "/";

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
                />
                <h3 className="font-bold text-base">Video Motion</h3>
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
          {/* Search Button */}
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
            {/* Profile Icon */}
            <div className="relative top-0 right-0 cursor-pointer">
              <HoverCard className="bg-white relative">
                <HoverCardTrigger>
                  <Image
                    src="https://tasnimul.vercel.app/_next/image?url=%2FTasnimul-Haque-3.jpg&w=1080&q=75"
                    width={30}
                    height={30}
                    alt="Account"
                    className="size-8 rounded-full"
                    unoptimized // Disable Next.js image optimization
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="absolute top-0 right-0 w-[300px] space-y-4 bg-white p-2 drop-shadow-2xl rounded-xl border">
                    <div className="flex items-center gap-2">
                      <Image
                        className="rounded-full w-16 h-16 object-cover"
                        src="https://tasnimul.vercel.app/_next/image?url=%2FTasnimul-Haque-3.jpg&w=1080&q=75"
                        width={50}
                        height={50}
                        alt="Profile"
                        unoptimized // Disable Next.js image optimization
                      />
                      <div>
                        <h3 className="text-xs font-semibold text-black">
                          Tasnimul Haque
                        </h3>
                        <p className="!text-xs font-light text-themeColor/80 flex items-center gap-1 justify-center">
                          Web Developer{" "}
                          <CheckBadgeIcon className="size-3 -mb-0.5" />
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-light line-clamp-2 leading-tight">
                        Since the internet was introduced to me at an early age,
                        I always aspired to use the internet to benefit myself
                        or other people. I realised that the internet is a
                        powerful tool capable of solving any problem.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 justify-start">
                      {socials.map((social) => (
                        <Link
                          key={social.id}
                          href={social.href}
                          target="_blank"
                          className=""
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
                    <div>
                      <Link
                        href="https://tasnimul.vercel.app/about"
                        target="_blank"
                      >
                        <button className="bg-red-700 w-full p-2 text-white rounded text-xs font-light flex items-center justify-center gap-2">
                          <CircleUser className="size-4" /> About
                        </button>
                      </Link>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </nav>
      </header>
      <HeaderSlide />
      <WarningModal wModal={wModal} setWModal={setWModal} />
    </div>
  );
}
