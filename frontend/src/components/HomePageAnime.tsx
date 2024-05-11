import React from "react";
import UpcomingAnime from "./UpcomingAnime";
import { useGlobalContext } from "../context/globalAnimeList";
import AiringAnime from "./AiringAnime";
import PopularAnime from "./PopularAnime";
import Sidebar from "./Sidebar";


export default function HomePageAnime () {

    const {handleSubmit, 
        handleChange, 
        searchAnime, 
        search,
        getUpcoming,
        getAiring,
        GetPopularAnime
        
    } = useGlobalContext()

    const [rendered, setRendered] = React.useState('popular')
    // const [search, setSearch] = React.useState('')
    

    const switchComponent = () => {
        switch(rendered) {
            case 'popular':
                return <PopularAnime rendered= {rendered} />
            case 'upcoming':
                return <UpcomingAnime rendered= {rendered} />    
            case 'airing':
                return <AiringAnime rendered= {rendered} />        
            default:
                return <AnimeList rendered= {rendered} />
        }
    }


 return (
    <>
    <header> 
        <div className="logo">
            <h1>
                {rendered === 'popular'? 'Popular Anime' : 
                rendered === 'airing'? 'Airing Anime':
                `Upcoming Anime`
                }
            </h1>
        </div>
        <div className="search-container">
            <div className="filter-btn popular-filter">
                <button onClick={() => {
                    setRendered('popular')
                }}> Popular </button>
            </div>
            <form action="" className="search-form" onSubmit={handleSubmit}>
                <div className="input-control">
                    <input type="text" placeholder="Search Anime" value={search} onChange={handleChange}/>
                    <button type="submit" > Search</button>
                </div>
                <div className="search-results">
                
                </div>
            </form>
            <div className="filter-btn airing-filter">
                <button onClick={() => {
                    setRendered('airing')
                    getAiring()
                }}> Airing </button>
            </div>
            <div className="filter-btn upcoming-filter">
                <button onClick={() => {
                    setRendered('upcoming')
                    getUpcoming()
                }}> Upcoming </button>
            </div>
        </div>
    </header>

    {switchComponent()}

    </>
 )
}