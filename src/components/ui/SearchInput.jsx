import { useState } from "react";




export default function SearchInput(){
    const [loading, setLoading] = useState(false)
    const[query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])

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
    <div className="absolute top-12 left-0 w-full bg-vibeBlack border border-neutral-700 z-50 max-h-96 overflow-y-auto">
      
      {loading && (
        <p className="p-2 text-text-mute">Loading...</p>
      )}

      {suggestions.map((anime) => (
        <div
          key={anime.id}
          className="flex items-center gap-3 p-2 hover:bg-neutral-800 cursor-pointer"
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