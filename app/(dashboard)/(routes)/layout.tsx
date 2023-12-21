import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: LayoutProps) => {
  return <div className="bg-[#111827] h-full text-white relative">
     <div className="hidden h-full   md:flex md:w-72 md:flex-col md:fixed md:inset-y-50 z-[80]">
       <SideBar/>
      </div>
      <main className="md:pl-72">
        <NavBar />
        {children}
      </main>
    
    
    </div>;
};

export default layout;
