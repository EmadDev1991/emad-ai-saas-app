import Image from "next/image";
import React from "react";

const Logo = () => {
  return <div className="flex justify-center items-center gap-2">
    <Image src='/images/logo.png' width={40} height={40} alt="logo"/>
    <span className="text-white font-semibold text-xl hidden md:block">Emad AI</span>
  </div>;
};

export default Logo;
