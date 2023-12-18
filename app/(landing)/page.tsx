import LandingHero from "@/components/landingHero";
import Testimonials from "@/components/testimonials";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className=" h-full px-2 md:px-6">
      <LandingHero />
      <Testimonials/>
    </div>
  );
}
