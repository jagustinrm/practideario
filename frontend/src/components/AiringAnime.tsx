import { useGlobalContext } from "../context/globalAnimeList"
import {Link} from 'react-router-dom'
import Sidebar from "./Sidebar";

export default function AiringAnime({rendered}){

interface Anime {
        mal_id: number;
        title: string;
        images: {
          jpg: {
            image_url: string;
          };
        };
}
      
const {airingAnime, isSearch, searchResults} = useGlobalContext()

const conditionalRender = () => {
    if (!isSearch  && rendered === 'airing' ) {
        return airingAnime.map((anime: Anime) => {
            return <Link to= {`/anime/${anime.mal_id}`} key= {anime.mal_id}>
                <img src={anime.images.jpg.image_url} alt="" />
            </Link>
        }
    )
    } else {
        return searchResults.map((anime: Anime) => {
            return <Link to= {`/anime/${anime.mal_id}`} key= {anime.mal_id}>
                <img src={anime.images.jpg.image_url} alt="" />
            </Link>
        })
    }
}
return (
    <>
    {conditionalRender()}
    <Sidebar/>
    </>
)
}

