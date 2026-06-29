import { useAuth } from "@/Context/useAuth"




export default function ConfirmLogOut(props){
    const { logOut } = useAuth()


    const handleClick = () => {
        props.cancel(false)
        logOut()
    } 

    return(
        <div className="z-50 w-[40%] h-[25%] fixed bg-vibeBlack items-center rounded-3xl justify-center">
            <h2 className="text-text-pri font-headings flex justify-center my-5">Log Out?</h2>
            <div className="flex">
                <button className="h-10 w-30 my-15 text-center flex items-center justify-center cursor-pointer bg-crimAccent mx-auto rounded-3xl text-vibeBlack font-headings"onClick={handleClick}>Log Out</button>
                <button className="h-10 w-30 my-15 text-center flex items-center justify-center cursor-pointer bg-grayishDark mx-auto rounded-3xl text-text-pri font-headings" onClick={() => props.cancel(false)}>Cancel</button>
            </div>
        </div>
    )
}