import { Suspense, useEffect, useRef, useState } from "react"
import { gql, useSuspenseQuery } from "@apollo/client"
import { StringCleanDescription } from "../BannerOverlay"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import AnimeInfoDrawer from "./AnimeInfoDrawer"
import { ErrorBoundary } from "../ErrorBoundary"


  export function SliceStingByWords(str, count){
            const words = str.trim().split(/\s+/)
            if (words.length <= count) return str
            return words.slice(0, count).join(" ") + "..."
        }

export default function TopAnime(){
    const [topData,setTopdata] = useState(null)
    const [place,setPlace] = useState(true)
    const [selected, setSelected] = useState(null)
    const [isOpen, setIsOpen] = useState(false)


    //query for top anime by ranking
    const getTop = gql`
            query getTop($currentYear: Int, $currentSeason: MediaSeason){
                Page(page:1, perPage: 20){
                    media(type: ANIME, sort: SCORE_DESC, season: $currentSeason, seasonYear: $currentYear){
                    id
                    title{
                                romaji
                                english
                                native
                            }
                    averageScore
                    status
                    description
                    trailer{
                        id
                        site
                    }
                    episodes
                    bannerImage
                    coverImage{
                        extraLarge
                    }
                    genres
                    }
                }
            }
    `;

    
const currentYear = new Date().getFullYear();

const month = new Date().getMonth();

let currentSeason = "WINTER";

if (month >= 2 && month <= 4) {
  currentSeason = "SPRING";
} else if (month >= 5 && month <= 7) {
  currentSeason = "SUMMER";
} else if (month >= 8 && month <= 10) {
  currentSeason = "FALL";
}




    const {data} = useSuspenseQuery(getTop, {fetchPolicy: 'cache-and-network', variables: {currentSeason, currentYear}})


        useEffect(() => {
    if (data) {
        setTopdata(data.Page.media);
        setPlace(false);
    }
    }, [data]);



    {/*Entry logic for brightening using intersectionObserver*/}
    function Tiles ({item}){
        const [visible,setVisible] = useState(false)
        const ref = useRef()

        useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: [0.4, 0.6, 0.8] }
        )
        if(ref.current)observer.observe(ref.current)
            const currentREf = ref.current
            return  () => {
        if (currentREf) observer.unobserve(currentREf);
    };

    }, [])

        {/*Word slicing method*/}
        




            return (
                    <div
                        ref={ref}
                        className={`mt-8 relative group z-10 phone:min-w-[10rem] phone:h-[22rem] minitab:min-h-[30rem] overflow-visible minitab:min-w-[15rem] p-2 cursor-pointer
                        transition-all transition-filter ease-in-out duration-300 group ${visible ? "brightness-100 scale-103" : "brightness-50 scale-100"}`}
                    >
                        {/* Hover overlay */}
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-85 transition-opacity duration-300 z-50 rounded-xl p-3 overflow-hidden">
                        <div className="w-full h-3/5 space-y-2 overflow-hidden">
                            <h3 className="text-base text-text-pri">{item.title.english || item.title.romanji || item.title.native}</h3>
                            <h4 className="text-sm text-text-mute">{item.episodes} Episodes</h4>
                            <p className="text-text-mute text-xs leading-snug break-words whitespace-pre-wrap w-full max-w-full">
                            {StringCleanDescription(SliceStingByWords(item.description, 40))}
                            </p>
                        </div>
                        </div>


                        {/* Image */}
                        <img
                        className="phone:h-60 minitab:h-80 w-full rounded-xl object-cover"
                        src={item.coverImage.extraLarge}
                        alt="Cover"
                        />

                        {/* Text */}
                        <div className="flex flex-col min-h-[5rem] justify-between relative z-60">
                        <h3 className="text-text-pri mt-3 font-headings line-clamp-2 phone:text-sm minitab:text-base whitespace-pre-wrap">
                            {item.title.english || item.title.romanji || item.title.native}
                        </h3>
                        <h4 className="text-text-mute pt-3 font-playful phone:text-xs minitab:text-sm whitespace-pre-line">
                            {item.genres[0]}, {item.genres[1]}
                        </h4>
                        </div>
                    </div>
        );

    }

    function TopPlaceHolder() {
  return (
    <div className="mt-8 phone:min-w-[10rem] phone:h-[22rem] minitab:min-h-[30rem] overflow-visible minitab:min-w-[15rem] p-2 cursor-pointer transition-all bg-neutral-800 animate-pulse" />
  );
}

    const placeHolderTiles = Array.from({length : 20}, (_, i) => <TopPlaceHolder key = {i} /> )

    {/*Mapping over Tile component*/}
    const topContent = Array.isArray(topData)? topData.map((item, id) => (
            <DrawerTrigger asChild key = {id}>
                <div onClick={()=> {
                    setSelected(item)
                    setIsOpen(true)
                }}>
                    <Tiles item = {item} key={id}/>
                </div>
            </DrawerTrigger>
    )) : null;


    return(
        <div className={`mx-7 my-10 min-h-[32rem]`}>

            {place? <div className="bg-neutral-800 animate-pulse rounded-xl h-[4rem] minitab:w-[30rem] mb-3"></div> :
             <h1 
            className="font-headings text-text-pri text-2xl mb-5 fade-in ">
                Current highest rated shows!
            </h1>}


            {place? <div className="bg-neutral-800 animate-pulse rounded-xl h-[2rem] minitab:w-[35rem]"></div> : 
            <h4 
            className="font-playful text-sm text-text-mute fade-in">
                Enjoy the best anime experience with the highest rated shows voted by you.
            </h4>}

            <Drawer>
            <div className="flex gap-8 overflow-x-auto whitespace-nowrap touch-pan-x overflow-y-hidden scrollbar-hide min-h-[24rem]">
                {
                <Suspense fallback={placeHolderTiles}>
                {topContent}
                </Suspense>}
            </div>
            <DrawerContent className={"bg-vibeBlack border-none minitab:max-w-[60%] h-[80%] mx-auto"}>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading...</div>}>
                    {selected && isOpen && <AnimeInfoDrawer item={selected} />}
                    </Suspense>
                </ErrorBoundary>
            </DrawerContent>
            </Drawer>
        </div>
    )
}


//OLDER JIKAN API VERSION

// const topUrl = "https://api.jikan.moe/v4/top/anime?limit=10"
//     useEffect(()=>{
//         fetch(topUrl)
//         .then(res => res.json())
//         .then(res => {
//             console.log(res)
//             setTopdata(res.data)
//         })
//         .catch(err => console.log(err))
//     },[])

//     useEffect(()=>{
// 	if(topData){
// 		console.log(topData)
// 	}
// },[topData])