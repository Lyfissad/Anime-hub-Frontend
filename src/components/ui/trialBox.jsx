import { useState, useEffect } from "react"
import logo from "@/assets/icon-anime.svg";


export default function TrialBox(){
    const [place, setPlace] = useState(true)

    useEffect(()=>{
            setTimeout(()=>{
                setPlace(false)
            },600)
        },[])
    


    return(
        <div>
            {place? <div className="bg-neutral-800 animate-pulse rounded-3xl phone:w-[21rem] minitab:w-[76%] h-[12rem] my-10 mx-auto"></div> : 
            
            <div className="max-w-[110rem] phone:w-[21rem] minitab:w-[76%] minitab:max-w-[120rem]
             minitab:flex minitab:justify-center minitab:item-center h-[12rem] 
            phone:grid phone:place-items-center mx-auto my-10 bg-vibeBlack
            rounded-3xl font-playful text-text-mute text-sm shadow-[0_0_40px_rgba(220,20,60,0.35)] fade-in">

                <img src={logo} alt="logo" className="phone:hidden minitab:block minitab:size-18 minitab:ml-5 laptop:size-28 pc:size-36" />
                
                <div className="minitab:block space-y-4 laptop:mr-35 pc:max-mr-50">
                    <h2 className="font-headings phone:text-lg laptop:text-2xl pc:text-3xl text-text-pri phone:text-center minitab:text-left mx-5">AnimeHub: Watch anime. Anytime and Anywhere</h2>
                    <p className="mx-5 phone:text-center minitab:text-left laptop:text-lg pc:text-2xl">All anime ad-free with downloads.Try it for free for 7 days and Cancel anytime!</p>
                </div>

                <button className="phone:h-[2.5rem] phone:w-[18rem] minitab:w-[12rem] minitab:mr-5 minitab:relative
                 minitab:top-5 pc:h-[3.2rem] pc:w-[20rem] pc:text-xl
                -mt-4 mb-3 bg-crimAccent cursor-pointer font-headings text-vibeBlack rounded-md"
                onClick={()=>{alert("Not Implemented yet...")}}
                >START FREE TRIAL</button>

            </div>}
        </div>
    )
}