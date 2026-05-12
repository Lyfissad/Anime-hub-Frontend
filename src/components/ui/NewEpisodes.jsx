import { useState } from "react";
import { ImTv } from "react-icons/im";
import { gql, useQuery } from "@apollo/client";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AnimeInfoDrawer from "./AnimeInfoDrawer";
import { ErrorBoundary } from "../ErrorBoundary";
import { AiOutlineLoading } from "react-icons/ai";


const PLACEHOLDERS = Array.from({ length: 5 }, (_, i) => (
  <div
    key={i}
    className="ml-1 w-[19rem] h-[8rem] mb-6 bg-neutral-800 animate-pulse rounded-lg"
  />
));
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



const newEpisodes = gql`
  query ($page: Int, $currentYear: Int, $currentSeason: MediaSeason) {
    Page(page: $page, perPage: 8) {
      __typename
      media(
        type: ANIME
        status: RELEASING
        season: $currentSeason
        seasonYear: $currentYear
        isAdult: false
      ) {
        id
        trailer {
          id
          site
        }
        bannerImage
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          extraLarge
        }
        description
        duration
        nextAiringEpisode {
          episode
          airingAt
        }
      }
    }
  }
`;

function EpisodesTiles({ item }) {
  return (
    <div className="flex cursor-pointer mb-6 h-[8rem] w-[21rem] fade-in">
      <img
        className="phone:h-[8rem] phone:min-w-[45%] object-cover rounded-md"
        src={item.coverImage.extraLarge}
        alt="Episode picture"
      />
      <div className="max-w-[55%] text-text-pri font-playful ml-4">
        <h1 className=" line-clamp-2 laptop:text-xl">
          {item.title.english || item.title.romaji || item.title.native}
        </h1>
        <div className="text-text-mute text-xs mt-2">
          <h4>Episode: {item.nextAiringEpisode?.episode}</h4>
          <h4>
            Airing on:{" "}
            {item.nextAiringEpisode?.airingAt
              ? new Date(item.nextAiringEpisode.airingAt * 1000).toLocaleString()
              : null}
          </h4>
          <h4 className="text-crimAccent mt-2">{item.duration} mins</h4>
        </div>
      </div>
    </div>
  );
}

export default function NewEpisodes() {
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const ButtonLoadState = loadingMore? <AiOutlineLoading className="fill-vibeBlack size-8 animate-spin"/> : "SHOW MORE"


  const { data, loading, fetchMore } = useQuery(newEpisodes, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const allEpisodes = data?.Page?.media || [];

  const handlePageChange = async () => {
    setLoadingMore(true)
    await fetchMore({
      variables: { page: page + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          Page: {
            __typename: prev.Page.__typename,
            media: [...prev.Page.media, ...fetchMoreResult.Page.media],
          },
        };
      },
    });
    setPage((p) => p + 1);
    setLoadingMore(false)
  };

  const EpisodeTilesUI = allEpisodes.map((item) => (
    <DrawerTrigger asChild key={item.id}>
      <div
        onClick={() => {
          setSelected(item);
          setIsOpen(true);
        }}
      >
        <EpisodesTiles item={item} />
      </div>
    </DrawerTrigger>
  ));

  return (
    <div>
      <div className="ml-8 phone:my-14 minitab:my-28">
        <div className="flex space-x-3 my-5">
          <ImTv className="phone:size-6 minitab:size-8 fill-text-pri" />
          <h1 className="text-text-pri phone:text-xl minitab:text-3xl font-headings">
            New Episodes
          </h1>
        </div>
        <h4 className="text-text-pri phone:text-xl font-headings">Today</h4>
        <hr className="w-7/8 my-3" />

        <Drawer>
          <div className="phone:grid mt-10 mx-auto phone:grid-cols-1 minitab:grid-cols-2 laptop:grid-cols-3 pc:grid-cols-4">
            {loading && !data ? PLACEHOLDERS : EpisodeTilesUI}
          </div>

          <DrawerContent className="bg-vibeBlack border-none outline:none minitab:max-w-[70%] h-[80%] mx-auto">
            <ErrorBoundary>
              {selected && isOpen && <AnimeInfoDrawer item={selected} />}
            </ErrorBoundary>
          </DrawerContent>
        </Drawer>
      </div>

      <button
        onClick={handlePageChange}
        className="bg-crimAccent flex items-center cursor-pointer justify-center my-15 mx-auto text-vibeBlack font-headings phone:w-[20rem] minitab:w-[32rem] h-[3rem]"
      >
        {ButtonLoadState}
      </button>
    </div>
  );
}
