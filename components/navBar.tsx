import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobileSideBar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const NavBar =async () => {
  const apiLimitCount = await getApiLimitCount()
  
 const isPro = await checkSubscription();


  return (
    <div className=" flex items-center md:justify-end justify-between p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavBar;
