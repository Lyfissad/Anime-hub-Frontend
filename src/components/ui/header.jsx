import { SlMenu } from "react-icons/sl";
import { IoMdSearch } from "react-icons/io";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import IsAdult from "./adultfilter.jsx";
import { useState } from "react";
import logo from "@/assets/icon-anime.svg"; 
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "@/Context/useAuth";
import SearchInput from "./SearchInput.jsx";


  


export default function Header(props){
    const [open,setOpen] = useState(false)
    const { user } = useAuth()
    






    return(
        <div className="flex justify-center items-center bg-vibeBlack h-15 p-4 w-full">
            <Drawer className = "">
            <DrawerTrigger><SlMenu className = "fill-crimAccent size-8 phone:block minitab:hidden"/></DrawerTrigger>
            <DrawerContent className="h-[70%] bg-vibeBlack fade-in">
                {user? 
                <div>
                    <h1 className="text-crimAccent mt-4 ml-12 text-3xl font-headings">Welcome back</h1>
                    <h1 className="text-text-pri my-8 ml-12 text-2xl font-playful"> {user.username}</h1>
                </div> : <Link to={"/auth/login"} className="h-10 w-40 my-15 text-center flex items-center justify-center bg-darkCrim mx-auto rounded-3xl text-text-pri font-headings">Login/SignUp</Link>}
                <h2 className="my-6 ml-12 text-lg text-text-pri font-headings" >NSFW Filter:</h2>
                <div className="flex justify-center border-2 border-darkCrim mx-auto">
                    <IsAdult className = "phone:block minitab:hidden border-2 border-crimAccent"/>
                </div>
                <ul className="space-y-5 text-xl ml-12 mt-4 text-text-pri font-playful">
                    <li className="">New</li>
                    <li className="">Popular</li>
                    <li className="">Browse all</li>
                </ul>
                {user? <button className="h-10 w-40 my-15 text-center flex items-center justify-center bg-crimAccent mx-auto rounded-3xl text-vibeBlack font-headings" onClick={() => props.setShowLC(true)}>Log Out</button> : null}
            </DrawerContent>
            </Drawer>
            <a href="https://anime-hub-ebon.vercel.app/" className="cursor-pointer">
                <img src={logo} alt="logo" className="h-10 w-auto ml-2" />
            </a>
            
                    <a
                    href="/"
                    className={`flex phone:items-center transition-all duration-300 transform origin-left `}
                >
                    <h1 className="text-3xl flex font-logo ml-2 font-extrabold text-crimAccent">
                    <span>Anime</span>{" "}
                    <span>Hub</span>
                    </h1>
            </a>
             <ul className="phone:hidden minitab:flex space-x-5 text-md ml-12 text-text-pri font-playful">
                    <li className="h-13 px-5 flex items-center font-headings cursor-pointer transition-all duration-75 hover:border-b-2 hover:border-b-crimAccent text-center">New</li>
                    <li className="h-13 px-5 flex items-center font-headings cursor-pointer transition-all duration-75 hover:border-b-2 hover:border-b-crimAccent text-center">Popular</li>
                    <li className="h-13 px-5 flex items-center font-headings cursor-pointer transition-all duration-75 hover:border-b-2 hover:border-b-crimAccent text-center">Browse all</li>
            </ul>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="ml-auto">
                    <IoMdSearch className="size-9 fill-crimAccent ml-3 justify-center cursor-pointer" onClick={()=>setOpen(true)}/>
                </PopoverTrigger>
                <PopoverContent className="bg-vibeBlack border-none mt-2 mx-2 h-80 phone:w-95 minitab:w-150">
                    <div className="bg-vibeBlack h-70 phone:w-90 minitab:w-140">
                        <SearchInput/>
                    </div>
                </PopoverContent>
            </Popover>
            
            
            {user? 
            <Popover className = "justify-start">
                <PopoverTrigger>
                    <CgProfile className="size-10 mr-1 ml-2 text-crimAccent phone:hidden minitab:flex cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className={`bg-grayishDark outline-none shadow-none border-vibeBlack rounded-xl mr-3`}>
                        <ul className="my-5 ml-5">
                            <li className="my-3 cursor-pointer hover:text-lightSlate text-text-pri font-logo text-2xl">{user.username}</li>
                            <li className="my-3 cursor-pointer hover:text-crimAccent text-text-pri font-headings text-lg">Setting</li>
                                <li className="my-3 text-text-pri font-headings">NSFW filter:</li>
                                <li className="my-3">
                                <IsAdult className = "phone:hidden minitab:block"/>
                                </li>
                            <li  onClick={() => props.setShowLC(true)} className="h-10 w-30 my-15 text-center flex items-center justify-center cursor-pointer bg-crimAccent mx-auto rounded-3xl text-vibeBlack font-headings">Log Out</li>
                        </ul>
                </PopoverContent>
            </Popover> : 
            <Link to={"/auth/login"} className="h-8 w-35 text-center phone:hidden minitab:flex items-center justify-center bg-darkCrim ml-2 rounded-lg text-text-pri font-playful">Login/SignUp</Link>}
        </div>
    )
}


{/**/}