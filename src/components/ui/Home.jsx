import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Carousel } from './carousel';
import { AiOutlineLoading } from "react-icons/ai";
import Content from './carouselcontent';
import TopAnime from './topAnime';
import TrialBox from './trialBox';
import { Suspense } from 'react';
import NewEpisodes from './NewEpisodes';


export default function Home(){


    {/* Carousel autoplay running with shadCN 5 sec delay*/}
    const autoplay = useRef(
        Autoplay({
          delay: 5000,
          stopOnInteraction:false,
          stopOnMouseEnter: true,
          playOnInit: true
        })
      )
        
    return(
        <div>
            <Carousel 
                        plugins={[autoplay.current]}
                        opts={{
                            loop: true,
                            duration: 15
                        }}
                        >
                        <Suspense fallback = {<div className="flex justify-center items-center min-h-screen w-full h-full">
                                <AiOutlineLoading className='fill-crimAccent size-18 spinFast m-auto'/>
                            </div>}> 
                            <Content />
                        </Suspense>
                    </Carousel>
                <TopAnime />
                <TrialBox />
                <NewEpisodes />
        </div>
    )
}