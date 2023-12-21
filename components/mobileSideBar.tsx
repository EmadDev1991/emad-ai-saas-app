"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SideBar from "./sideBar";
import { useState } from "react";


const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-gray-900 hover:text-accent"
          onClick={() => console.log("menu clicked")}
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent  side='left' className="p-0 w-full  sm:w-[300px] md:hidden bg-[#141d2f] text-white ">
        <SideBar linkClicked ={()=>setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
