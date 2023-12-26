"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Settings,
  Zap,
} from "lucide-react";
import FreeCounter from "./freeCounter";

const monserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface sidebarProps {
  linkClicked?: () => void;
  apiLimitCount?: number;
  isPro: boolean
}

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },

  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image-generation",
    color: "text-pink-700",
  },

  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video-generation",
    color: "text-orange-700",
  },

  {
    label: "Music Generation",
    icon: Music,
    href: "/music-generation",
    color: "text-emerald-500",
  },

  {
    label: "Code Generation",
    icon: Code,
    href: "/code-generation",
    color: "text-green-700",
  },

  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
];

const SideBar = ({ linkClicked, apiLimitCount= 0, isPro=false }: sidebarProps) => {
  const pathName = usePathname();
  return (
    <div className="space-y-4 py-4 h-full bg-[#141d2f] text-white  z-30">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14 w-fit ">
          <div className="relative w-8 h-8 mr-4">
            <Image sizes="1px" fill alt="logo" src="/images/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", monserrat.className)}>
            Emad AI
          </h1>
        </Link>

        <div className="space-y-1 flex flex-col">
          {routes.map((route) => (
            <Link
              onClick={linkClicked}
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-[#1c2a45] rounded-lg",
                pathName === route.href
                  ? "text-white bg-[#1c2a45]"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FreeCounter apiLimitCount={apiLimitCount}  isPro={isPro}/>
    </div>
  );
};

export default SideBar;
