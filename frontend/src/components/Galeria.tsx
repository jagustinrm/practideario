import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context/globalAnimeList";


export default function Galeria() {
    const {getAnimePictures, pictures} = useGlobalContext()
    const {id} = useParams();

    const [index, setIndex] = React.useState(0)
    const handleImageClick = (i) => {
        setIndex(i)
    }

    React.useEffect(() => {
        getAnimePictures(id)
    }, [])
    return (
        <>
        <div className="back">
            <Link to="/">Back</Link>
        </div>
        <div className="big-image">
            <img src={pictures[index]?.jpg.image_url} alt="" />
        </div>
        <div className="small-images">
            {pictures?.map((picture,i) => {
                return <div className="image-con" onClick={() => {
                    handleImageClick(i)
                }} key={i}>
                    <img src={picture.jpg.image_url} alt="" />
                </div>
            })}
        </div>
        </>
    )
}