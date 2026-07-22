import { useAuth } from "@/Context/useAuth"
import { useState, useEffect } from "react"




export default function ConfirmLogOut(props){
    const { logOut } = useAuth()
    const [visible, setVisible] = useState(false)


    useEffect(() => {
    requestAnimationFrame(() => {
        setVisible(true);
    });
}, []);

    const logOutClick = () => {
        setVisible(false)

        setTimeout(() => {
            props.setShowLC(false)
            logOut()
        }, 250)       
    } 

    const cancelClick = () => {
        setVisible(false)

        setTimeout(() => {
            props.setShowLC(false)
            
        }, 250)       
    } 

    return(
        <div className={`fixed inset-0 z-50 bg-black/60 flex items-center justify-center transition-all duration-250 ease-in-out ${visible? "opacity-100" : "opacity-0"}`}>
                <div className={`bg-vibeBlack rounded-xl px-8 py-12 w-80 font-headings duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] transition-all ${visible? "opacity-100 scale-100" : "opacity-0 scale-80"}`}>
                <h2 className="text-text-pri text-xl">
                    Are you sure you want to logout?
                </h2>

                <div className="flex justify-end gap-4 mt-6 pt-5">
                    <button onClick={() => cancelClick()} className="bg-text-pri cursor-pointer rounded-sm h-10 w-25
                         hover:scale-105 origin-center transition-all duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-vibeBlack ">
                    Cancel
                    </button>

                    <button onClick={() => logOutClick()}  className="bg-crimAccent cursor-pointer rounded-sm h-10 w-25
                     hover:scale-105 origin-center transition-all duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-vibeBlack ">
                    Logout
                    </button>
                </div>
                </div>
            </div>
            )}