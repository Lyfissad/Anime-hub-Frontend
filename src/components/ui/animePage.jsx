import { useParams } from "react-router-dom"


export default function AnimePage(){
    const { id } = useParams()


    const animeCall = 

    console.log(id)
    return(
        <div className="text-crimAccent">{id}</div>
    )
}