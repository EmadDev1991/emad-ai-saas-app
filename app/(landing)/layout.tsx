import LandingNavbar from "@/components/landingNavbar";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <LandingNavbar/>
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </main>
  );
};

export default LandingLayout;
