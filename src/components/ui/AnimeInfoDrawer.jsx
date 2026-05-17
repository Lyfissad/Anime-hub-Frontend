import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect, useState } from "react"
import { StringCleanDescription } from "../BannerOverlay"
import TrailerButton from "../TrailerButton";
import { IoIosCloseCircle } from "react-icons/io";
import { SliceStingByWords } from "./topAnime";

  export default function AnimeInfoDrawer({ item }) {

  const [imageLoaded, setImageLoaded] = useState(false)


  useEffect(()=>{
    setImageLoaded(false)
  },[item])


  return (

    <>
      <DrawerHeader>
        <DrawerClose asChild>
            <IoIosCloseCircle 
            className="size-10 minitab:hover:-translate-y-1 transition-all duration-200 origin-center absolute top-0 right-0 m-5 cursor-pointer fill-crimAccent hover:fill-crimAccent/80 text-vibeBlack" />
        </DrawerClose>
        {!imageLoaded && <div className="w-full phone:h-[6rem] minitab:h-[15rem] mt-6 bg-neutral-800 animate-pulse rounded-lg">
           </div>}
        <img 
        className={`mt-8 rounded-sm object-cover fade-in phone:max-h-[6rem] minitab:max-h-[18rem] ${imageLoaded ? "block" : "hidden"}`} 
        src={item.bannerImage || item.coverImage.extraLarge} 
        alt="Cover"
        onLoad={() => {
          console.log("images loaded")
          setImageLoaded(true)}} />
        <h2 className="font-bold text-text-pri text-2xl minitab:text-3xl mx-5 mt-6 -mb-2">
          {item.title.english || item.title.romaji || item.title.native}
        </h2>
    </DrawerHeader>
        <DrawerDescription className="my-6 mx-12 text-lg text-text-mute">
            {StringCleanDescription(SliceStingByWords(item.description || "No description", 60))}
        </DrawerDescription>
      <DrawerFooter>
        <div className="block space-y-2 mb-10 text-vibeBlacks mx-3">
            <div className = "h-[3rem] w-full bg-crimAccent flex items-center justify-center cursor-pointer text-center rounded-lg">
            <TrailerButton trailer = {item.trailer} />
            </div>
            <button 
            onClick={()=>{alert("Not Implemented yet...")}}
            className = "h-[3rem] w-full cursor-pointer font-semibold rounded-lg bg-crimAccent">Watch Now</button>
        </div>
      </DrawerFooter>
    </>
  );
}
