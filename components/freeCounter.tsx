'use client'

import React, { useEffect, useState } from "react";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

import { Zap } from "lucide-react";
import { useProModal } from "@/app/hooks/use-pro-modal";

interface FreeCounterProps {
  apiLimitCount?: number;
  isPro: boolean
}

const FreeCounter = ({ apiLimitCount = 0, isPro }: FreeCounterProps) => {
const proModal = useProModal()
const [ mounted , setMounted] = useState(false)

useEffect(()=>{
  setMounted(true)
},[])

if(!mounted) return null

if(isPro){
  return null
}

  return (
    <div className="absolute  w-full bottom-0  ">
      <div className="flex flex-col justify-center items-center gap-4 bg-[#111827] m-6 p-6 rounded-md">
        <p className="text-sm">
          {apiLimitCount}/ {MAX_FREE_COUNTS} Free Generations
        </p>
        <Progress value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
        <Button onClick={proModal.onOpen} className="w-full bg-gradient-to-r from-purple-400 to-pink-600 flex justify-center items-center gap-2">
          <Zap className="w-4" />
          <p>Upgrade</p>
        </Button>
      </div>
    </div>
  );
};

export default FreeCounter;
