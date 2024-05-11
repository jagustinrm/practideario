// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./components/Home"
// import AnimeList from './components/PopularAnime';
import Anime from './components/Anime';
import HomePageAnime from './components/HomePageAnime';
import Galeria from './components/Galeria';
// import AnimeList from "./components/AnimeList"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/homeanime" element = {<HomePageAnime/>}/>
        <Route path="/character/:id" element = {<Galeria/>}/>
        {/* <Route path="/animelist" element = {<AnimeList/>}/>
         */}
        <Route path="/anime/:id" element = {<Anime/>}/>
      </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
