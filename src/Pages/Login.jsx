import { useAuth } from "@/Context/useAuth";
import { useState } from "react"
import React from "react"
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";



export default function Login() {
    const [Loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const { login } = useAuth()
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    })
    
    const navigate = useNavigate()
    const ButtonState = Loading? <AiOutlineLoading className="fill-vibeBlack mx-auto size-6 animate-spin"/> : "Log in"
    const passType = show === false? "password" : "text"
    const EyeIcon = show? FaEyeSlash : FaEye


    function handleChange(e){
            setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch("https://anime-hub-backend-ik8o.onrender.com/api/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(loginData)
        });

        const data = await res.json()
        
        if(!res.ok){
            toast.error(data.message ||"Something went wrong...")
            setLoginData({
                username: "",
                password: "",
                
            })
            setLoading(false)
            return;
        }

        
        console.log(data)
        toast.success(data.message)
        setLoginData({
            username: "",
            password: "",
        })
        setLoading(false)
        if(res.ok){
            console.log("User after login:", data.User);
            login(data.User)
            navigate("/")
        }
    }



    return (
        <form onSubmit = {handleSubmit} className="text-text-pri fade-in transition-all duration-300 grid grid-cols-1 minitab:max-w-100 min-h-[420px] items-center justify-center">
            <input 
                name = "username" 
                placeholder = "Username"
                value={loginData.username} 
                onChange={handleChange} 
                required 
                className="w-full bg-vibeBlack px-4 py-4 rounded-md my-14 border border-darkCrim focus:outline-none focus:ring-2 focus:ring-crimAccent"
            />
            <div className="relative w-full my-14">
                <input 
                type={passType} 
                name = "password" 
                placeholder = "Password"
                value={loginData.password} 
                onChange={handleChange} 
                required
                className="w-full bg-vibeBlack px-4 py-4 pr-10 rounded-md border border-darkCrim focus:outline-none focus:ring-2 focus:ring-crimAccent"
            />
            <EyeIcon className="absolute cursor-pointer right-3 -translate-y-1/2 top-1/2 fill-text-mute" onClick={() => setShow(prevShow => !prevShow)} />
            </div>
            <button type = "submit" disabled = {Loading} className="mt-4 p-3 rounded-md cursor-pointer bg-crimAccent hover:bg-crimAccent/90 text-vibeBlack font-headings">{ButtonState}</button>
        </form>
    )
}