import { SlMenu } from "react-icons/sl";
import { IoMdSearch } from "react-icons/io";
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

  


export default function Header(){
    const [searchActive,setSearchActive] = useState(false)
    const { user, logOut } = useAuth()
    



    return(
        <div className="flex justify-center items-center bg-vibeBlack h-13 p-4 w-full">

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
                {user? <button className="h-10 w-40 my-15 text-center flex items-center justify-center bg-crimAccent mx-auto rounded-3xl text-vibeBlack font-headings" onClick={logOut}>Log Out</button> : null}
            </DrawerContent>
            </Drawer>
            <a href="https://anime-hub-ebon.vercel.app/" className="cursor-pointer">
                <img src={logo} alt="logo" className="h-10 w-auto ml-2" />
            </a>
            
                    <a
                    href="/"
                    className={`flex items-center transition-all duration-300 transform origin-left ${
                    searchActive ? "phone:opacity-0 phone:scale-0 minitab:opacity-100 minitab:scale-100" : "opacity-100 scale-100"
                    }`}
                >
                    <h1 className="text-3xl font-logo ml-2 font-extrabold text-crimAccent">
                    <span>Anime</span>{" "}
                    <span>Hub</span>
                    </h1>
            </a>
             <ul className="phone:hidden minitab:flex space-x-5 text-md ml-12 text-text-pri font-playful">
                    <li className="h-13 px-5 flex items-center cursor-pointer hover:bg-vibeBlack text-center">New</li>
                    <li className="h-13 px-5 flex items-center cursor-pointer hover:bg-vibeBlack text-center">Popular</li>
                    <li className="h-13 px-5 flex items-center cursor-pointer hover:bg-vibeBlack text-center">Browse all</li>
                </ul>
            <input type="text" placeholder="Search" className={`ml-auto h-8 border-2 border-text-mute outline-none
                 active:border-crimAccent transition-all duration-300 ease-in-out focus:border-crimAccent
                  rounded-sm p-3 ${searchActive? 'text-white opacity-100 phone:w-2/3 minitab:w-1/6 tab:w-2/6': 'w-0 overflow-hidden opacity-0'}`}/>

            <IoMdSearch className="size-9 fill-crimAccent ml-3 justify-center cursor-pointer" onClick={()=>setSearchActive(!searchActive)}/>

            {user? 
            <Popover className = "justify-start">
                <PopoverTrigger>
                    <CgProfile className="size-10 mr-1 ml-2 text-text-pri phone:hidden minitab:flex cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className={`bg-grayishDark outline-none shadow-none border-vibeBlack rounded-xl mr-3`}>
                        <ul className="my-5 ml-5">
                            <li className="my-3 cursor-pointer hover:text-lightSlate text-text-pri font-logo text-2xl">{user.username}</li>
                            <li className="my-3 cursor-pointer hover:text-crimAccent text-text-pri font-headings text-lg">Setting</li>
                                <li className="my-3 text-text-pri font-headings">NSFW filter:</li>
                                <li className="my-3">
                                <IsAdult className = "phone:hidden minitab:block"/>
                                </li>
                            <li  onClick={logOut} className="my-3 cursor-pointer hover:text-crimAccent text-text-pri font-headings">Log Out</li>
                        </ul>
                </PopoverContent>
            </Popover> : 
            <Link to={"/auth/login"} className="h-8 w-35 text-center phone:hidden minitab:flex items-center justify-center bg-darkCrim ml-2 rounded-lg text-text-pri font-playful">Login/SignUp</Link>}
        </div>
    )
}


{/**/}