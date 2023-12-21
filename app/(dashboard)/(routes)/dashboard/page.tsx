"use client";
import Link from "next/link";

import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tools = [
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
];

const DashboardPage = () => {
  return (
    <div className="pt-6 md:pt-10">
      <div className="mb-8 space-y-4 w-full">
        <h2 className="text-xl md:text-4xl font-bold text-center ">
          {" "}
          Explore The power of AI
        </h2>
        <p className="text-gray-400 text-center font-light text-sm md:text-lg">
          {" "}
          chat with the smartest AI - Experience the power of AI{" "}
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-8 ">
        {tools.map(
          (tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className=" bg-[#141d2f]   flex items-center justify-between gap-4 p-4 border-[1px]  border-gray-900 rounded-lg hover:bg-[#1c2a45] hover:text-white transition duration-200"
            >
              <tool.icon
                className={cn("w-6 h-6 m-1", tool.color, `bg-${tool.color}`)}
              />
              <p className="flex-1 font-semibold">{tool.label}</p>

              <ArrowRight />
            </Link>
          ),
          []
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
