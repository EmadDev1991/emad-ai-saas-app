import React from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const LandingNavbar = () => {
  const user = auth()
  return (
    <nav className="absolute w-full h-20 bg-[#111827]">
      <div className="max-w-screen-xl mx-auto px-2 md:px-6  h-full flex items-center justify-between">
        <Logo/>
        <Link href={user ? '/dashboard': 'sign-in'}>
          <Button variant='secondary'>{user? "Dashboard": "Get Started"}</Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
