import { useGlobalContext } from "../context/globalAnimeList"
import {Link} from 'react-router-dom'
import Sidebar from "./Sidebar";

export default function PopularAnime({rendered}){

interface Anime {
        mal_id: number;
        title: string;
        images: {
          jpg: {
            image_url: string;
          };
        };
}
      
const {popularAnime, isSearch, searchResults} = useGlobalContext()

const conditionalRender = () => {
    if (!isSearch && rendered === 'popular') {
        return popularAnime.map((anime: Anime) => {
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

