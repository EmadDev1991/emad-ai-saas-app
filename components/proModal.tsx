"use client";

import { useProModal } from "@/app/hooks/use-pro-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Check,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Zap,
  Loader,
} from "lucide-react";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-400/20",
  },

  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-500/20",
  },

  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-500/20",
  },

  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-400/20",
  },

  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-400/20",
  },
];

const ProModal = () => {
  const proModal = useProModal();
  const [ loading, setLoading] = useState(false)
 
  const onSubscribe =async ()=>{
    try{
      setLoading(true)
      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url; 

    }catch(error){
      console.log(error, 'stripe_client_error')
    }finally{
      setLoading(false)
    }
  }


  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="z-50 bg-[#141d2f] text-white border-0 rounded-md">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center gap-2 py-4">
            <div className="text-sm">Upgrade to EmadAI </div>
            <span className="text-xs bg-gradient-to-r from-purple-400 to-pink-600 text-white px-3 py-1 rounded-full ">
              PRO
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {tools.map((tool) => (
            <Card
              key={tool.label}
              className="p-3 border-2 border-[#111827] bg-transparent flex justify-between items-center gap-4 text-white"
            >
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-6", tool.color)} />
              </div>
              <div className="w-full">{tool.label}</div>
              <Check />
            </Card>
          ))}
        </div>
        <DialogFooter>
          <Button disabled={loading} onClick={onSubscribe} className="w-full my-4 bg-gradient-to-r from-purple-400 to-pink-600 flex justify-center items-center gap-2">
            <Zap className="w-4" />
            <p>Upgrade</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
