import { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { AiOutlineLoading } from "react-icons/ai"


export default function SearchInput(){
    const[query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])


    const SEARCH_ANIME = gql`
    query SearchAnime($query: String){
        Page(page: 1 , perPage: 10){
            media(type: ANIME, search: $query){
                    id
                    title{
                        romaji
                        english
                        native
                    }
                    coverImage{
                        large
                    }
                    averageScore
            }
        }
    }`


    const [searchAnime, {data: searchData, loading, error}] = useLazyQuery(SEARCH_ANIME, {fetchPolicy: 'cache-and-network'})
    console.log("loading:", loading)
    console.log("data:", searchData)
    console.log("error:", error)


    useEffect(() => {
        if (!query.trim()) return;
        console.log("Effect ran: ", query )
        const timer = setTimeout(() => {
              searchAnime({variables: {query}})
              console.log("searching: ", query)
        }, 500);

        return () => clearTimeout(timer)
    }, [query])


    useEffect(() => {
      if (searchData){
        setSuggestions(searchData.Page.media);
      }
    }, [searchData])

    return(
        <div className="relative w-[67%]">
  <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search anime..."
    className={`h-8 w-[150%] border-2 border-grayish text-text-pri outline-none
                     active:border-crimAccent transition-all duration-300 ease-in-out focus:border-crimAccent
                      rounded-2xl p-3`}
  />

  {query && (
    <div className="absolute top-12 left-0 w-[180%
    ] bg-vibeBlack border border-neutral-700 z-50 max-h-96 overflow-y-auto">
      
      {loading && (
        <div className="flex space-5">
          <AiOutlineLoading className='fill-crimAccent size-6 my-auto ml-2 spinFast'/><p className="font-playful text-crimAccent">Loading...</p>
        </div>
      )}

      {suggestions.map((anime) => (
        <div
          key={anime.id}
          className="flex items-center font-headings gap-3 p-2 hover:bg-neutral-800 cursor-pointer"
          onClick={() => {
            setQuery(anime.title.english || anime.title.romaji);
            setSuggestions([]);
          }}
        >
          <img
            src={anime.coverImage.large}
            className="w-10 h-14 object-cover"
          />

          <div>
            <p className="text-text-pri text-sm">
              {anime.title.english || anime.title.romaji}
            </p>
            <p className="text-xs text-text-mute">
              ⭐ {anime.averageScore}
            </p>
          </div>
        </div>
      ))}

    </div>
  )}
</div>
    )
}