import { useState } from "react"
import React from "react"
import { toast } from "react-toastify"
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import validatePassword from "./validatePassword";




export default function SignUp() {
    const [loading, setLoading] = useState(false)
    const [PasswordErrors, setPasswordErrors] = useState([])
    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        preferences: []
    })
    


    const navigate = useNavigate()


    function handleChange(e){
        if(e.target.name === "preferences"){
            setSignupData({...signupData, preferences: e.target.value.split(",").map(p => p.trim())})
        }
        else{
            setSignupData({...signupData, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setPasswordErrors([])
        
        const numberOfErrors = validatePassword(signupData.password, signupData.confirmPassword)
        
        if (numberOfErrors.length > 0){
            setPasswordErrors(numberOfErrors)
            setSignupData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                preferences: []
            })
            numberOfErrors.map((item) => toast.error(item))
            setLoading(false)
            return;
        }


        setPasswordErrors()
         
        


        const res = await fetch("https://anime-hub-backend-ik8o.onrender.com/api/signup",{
            method: "POST",
            headers:{
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                ...signupData, preferences: signupData.preferences
            })
        });

        const data = await res.json()


        if(!res.ok){
            toast.error(data.message ||"Something went wrong...")
            setSignupData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                preferences: []
            })
            setLoading(false)
            return;
        }

        
        console.log(data)
        toast.success(data.message)
        setSignupData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            list: []
        })
        setLoading(false)
        if(res.ok){
            navigate("/auth/login")
        }
    }

    const buttonState = loading? <AiOutlineLoading className="fill-vibeBlack size-6 mx-auto animate-spin" /> : "Sign Up"
    return (
        <form onSubmit = {handleSubmit}  className="text-text-pri font-playful fade-in transition-all duration-300 grid grid-cols-1 minitab:max-w-100 min-h-[420px] justify-center">
            <input 
                name = "username"
                value={signupData.username} 
                placeholder = "Username" 
                onChange={handleChange} 
                className="w-full bg-vibeBlack px-4 py-2 rounded-md my-2 border border-darkCrim focus:outline-none focus:ring-2 focus:ring-crimAccent" 
            />

            <input 
                name = "email"
                value={signupData.email}
                placeholder = "Email" 
                onChange={handleChange} 
                className="w-full bg-vibeBlack px-4 py-2 rounded-md my-2 border border-darkCrim focus:outline-none focus:ring-2 focus:ring-crimAccent"
            />

            <input 
                type="password" 
                name = "password"
                value={signupData.password} 
                placeholder = "Password" 
                onChange={handleChange}
                className="w-full bg-vibeBlack px-4 py-2 rounded-md my-2 border border-darkCrim focus:outline-none focus:ring-2 focus:ring-crimAccent"
            />

            <input 
                type="password" 
                name = "confirmPassword"
                value={signupData.confirmPassword} 
                placeholder = "Confirm Password" 
                onChange={handleChange} 
                className="w-full bg-vibeBlack px-4 py-2 rounded-md my-2 border border-darkCrim focus:outline-none focus:ring-2 focus:ring-crimAccent"
            />
            <button type = "submit" disabled = {loading} className="mt-4 p-3 cursor-pointer rounded-md bg-crimAccent hover:bg-crimAccent/90 text-vibeBlack font-headings">{buttonState}</button>
        </form>
    )
}