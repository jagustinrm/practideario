import { Link, useParams } from "react-router-dom"
import React, { useEffect } from "react"

export default function Anime() {
    const {id} = useParams()

    //state

    const [anime, setAnime] = React.useState({})
    const [characters, setCharacters] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)

    //destructure
    const {title, synopsis, trailer, duration, aired, season, images, rank, score, scored_by, popularity, status, rating, source} = anime

    // get anime


    const getAnime = async () => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
        const data = await response.json();
        setAnime(data.data)
    }

    // Get Characters

    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json();
        setCharacters(data.data)
        
    }


    useEffect (() => {
        getAnime(id);
        getCharacters(id)
    }, [])
   
    
    return (
        <>
        <h1>{title} </h1>
        <div className="details">
            <div className="detail">
                <div className="image">
                    <img src={images?.jpg.large_image_url} alt="" />
                </div>
                <div className="anime-details">
                    <p><span>Aired:</span><span>{aired?.string} </span></p>
                    <p><span>Rating:</span><span>{rating} </span></p>
                    <p><span>Rank:</span><span>{rank} </span></p>
                    <p><span>Score:</span><span>{score} </span></p>
                    <p><span>Scored By:</span><span>{scored_by} </span></p>
                    <p><span>Status:</span><span>{status} </span></p>
                </div>
                <p className="description">
                    {/* Si ' ver más' es true, muestra todo, sino muestra solo 200 caracteres */}
                    {showMore? synopsis: synopsis?.substring(0, 450) + '...'} 
                    <button onClick={() => {
                        setShowMore(!showMore)
                    } }> {showMore ? 'Show Less': 'Read More'} </button>
                </p>
            </div>
                    <h3 className="title"> Trailer</h3>
                    <div className="trailer-container">
                        {trailer?.embed_url && 
                        <iframe 
                        src={trailer?.embed_url} 
                        title={title} 
                        width={800}
                        height={450}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                        </iframe>
                        }
                    </div>
                    <h3 className="title"> Characters</h3>
                    <div className="characters">
                        {characters?.map((character, index) => {
                            const {role} = character
                            const {images, name, mal_id} = character.character
                            return ( <Link to={`/character/${mal_id}`} key={index}>
                                <div className="character">
                                    <img src={images?.jpg.image_url} alt="" />
                                    <h4>{name}</h4>
                                    <p>{role} </p>

                                </div>
                            </Link>

                            )


                        })}
                    </div>
        </div>
        </>
    )
}