import TrailerButton from "./TrailerButton"
import { AiOutlineStar } from "react-icons/ai";



export function StringCleanDescription(HtmlDesc){
        const doc = new DOMParser().parseFromString(HtmlDesc, "text/html")
        const text = doc.body.textContent || ""
        return text.replace(/\(Source:.*?\)/gi, "").trim()
    }

export default function BannerOverlay(props){


    return(
        <div className="absolute phone:invisible minitab:visible inset-0 bg-gradient-to-r from-black/80 to-black/20 flex flex-col justify-end p-8 text-white">
                    <div className="ml-25">
                        <h1 className="text-5xl laptop:text-6xl font-extrabold font-headings tracking-widest leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                            {props.title}
                        </h1>
                        <div
                            className="text-sm mb-50 ml-5 mt-5 font-playful max-w-2xl line-clamp-3 overflow-hidden max-h-[10rem] text-ellipsis">
                            <p>{StringCleanDescription(props.description) || "No description available." }</p>
                        </div>
                    <div className="flex items-center space-x-4  mb-30">
                        <div className="bg-crimAccent text-vibeBlack cursor-pointer
                         px-auto text-center py-2 w-1/4 transition-all duration-200
                         rounded-md shadow-md hover:-translate-y-2">
                            <TrailerButton trailer={props.trailer} />
                        </div>
                        <div className="flex items-center text-yellow-400 font-bold text-lg">
                        <AiOutlineStar className="mr-1" />
                        <span>{props.averageScore ?? 'N/A'}</span>
                        </div>
                    </div>
                    </div>
                    
        </div>
    )
}