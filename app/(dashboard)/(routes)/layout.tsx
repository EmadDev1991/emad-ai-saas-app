import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import { getApiLimitCount } from "@/lib/api-limit";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
const layout = async ({ children }: LayoutProps) => {
 const apiLimitCount = await getApiLimitCount()
   
  return <div className="bg-[#111827] min-h-full text-white relative">
     <div className="hidden h-full   md:flex md:w-72 md:flex-col md:fixed md:inset-y-50 z-[40]">
       <SideBar  apiLimitCount={apiLimitCount}/>
      </div>
      <main className="md:pl-72">
        <NavBar />
        {children}
      </main>
    
    
    </div>;
};

export default layout;
