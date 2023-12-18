import React from "react";
import Logo from "./logo";
import { Button } from "./ui/button";

const LandingNavbar = () => {
  return (
    <nav className="absolute w-full h-20 bg-[#111827]">
      <div className="max-w-screen-xl mx-auto px-2 md:px-6  h-full flex items-center justify-between">
        <Logo/>
        <Button variant='secondary'>Get Started</Button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
