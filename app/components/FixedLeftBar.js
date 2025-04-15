"use client";
import React, { useState } from "react";
import { BoltIcon, HomeIcon, TvIcon } from "@heroicons/react/24/solid";
import { ArrowDownToLine, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import WarningModal from "./WarningModal";

const FixedLeftBar = () => {
  const [wModal, setWModal] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  return (
    <>
      <div className="fixed top-14 h-screen w-20 m-auto z-[1000]">
        <button
          onClick={() => setWModal(!wModal)}
          className="flex items-center justify-center flex-col text-[10px] rounded-lg m-auto text-center p-3 hover:bg-gray-200 w-16"
        >
          <HomeIcon className="size-5"></HomeIcon> Home
        </button>
        <button
          onClick={() => setWModal(!wModal)}
          className="flex items-center justify-center flex-col text-[10px] rounded-lg m-auto text-center p-3 hover:bg-gray-200 w-16"
        >
          <BoltIcon className="size-5"></BoltIcon> Shorts
        </button>
        <button
          onClick={() => setWModal(!wModal)}
          className="flex items-center justify-center flex-col text-[10px] rounded-lg m-auto text-center p-3 hover:bg-gray-200 w-16"
        >
          <TvIcon className="size-5"></TvIcon> Subscription
        </button>
        <button
          onClick={() => setWModal(!wModal)}
          className="flex items-center justify-center flex-col text-[10px] rounded-lg m-auto text-center p-3 hover:bg-gray-200 w-16"
        >
          <UserCircle className="size-5"></UserCircle> You
        </button>
        <button
          onClick={() => setWModal(!wModal)}
          className="flex items-center justify-center flex-col text-[10px] rounded-lg m-auto text-center p-3 hover:bg-gray-200 w-16"
        >
          <ArrowDownToLine className="size-5"></ArrowDownToLine> Downlaods
        </button>
        <WarningModal wModal={wModal} setWModal={setWModal} />
      </div>
    </>
  );
};

export default FixedLeftBar;
