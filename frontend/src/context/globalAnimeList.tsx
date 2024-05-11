import React, {ReactNode, createContext, useContext, useReducer } from "react";

// CreateContext es una función provista por React que crea un nuevo contexto. Un contexto en React es una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel. 

const GlobalContext = createContext("No sé qué iría acá");

interface GlobalContextProviderProps {
    children: ReactNode;
}
// ReactNode es un tipo proporcionado por React que representa cualquier nodo que React puede renderizar. Esto incluye elementos JSX, cadenas, números, arrays, fragments, etc. Al tipar children como ReactNode, estás indicando que puede recibir cualquier cosa que React pueda renderizar.
const baseUrl = "https://api.jikan.moe/v4";
// const baseUrl = "https://api.myanimelist.net/v2/anime";

// actions

const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING ANIME";
const GET_PICTURES_ANIME = "GET_PICTURES_ANIME";


//reducer
interface Anime {
    // Define la estructura de un anime
    // Por ejemplo:
    id: number;
    title: string;
    images: {
      jpg: {
        image_url: string; // Supongamos que image_url es la URL de la imagen del anime
      };
    };
  }

  
interface State {
    // popularAnime: Anime[];
    type: string;
    payload: Anime[];
  }
const reducer = (state:State, action: State) => {
    console.log(action)
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_POPULAR_ANIME:
            return {...state, popularAnime: action.payload, loading: false}    
        case SEARCH:
            return {...state, searchResults: action.payload, loading: false} 
        case GET_UPCOMING_ANIME:
            return {...state, upcomingAnime: action.payload, loading: false}  
        case GET_AIRING_ANIME:
            return {...state, airingAnime: action.payload, loading: false}    
        case GET_PICTURES_ANIME:
            return {...state, pictures: action.payload, loading: false}            
        default:
            return state
        }

}
export const GlobalContextProvider = ({children}: GlobalContextProviderProps) => {
    
    // Estás exportando GlobalContextProvider para que pueda ser utilizado en otros componentes. Este componente actúa como un proveedor de contexto que envuelve otros componentes y proporciona el valor del contexto ("Hello") a todos los componentes hijos que lo consumen.
    /* children es una referencia a los elementos hijos de un componente en React. En este caso, children representa los elementos JSX que se colocan dentro de <GlobalContextProvider>. Al utilizar {children}, permites que los componentes hijos del GlobalContextProvider tengan acceso al contexto proporcionado por él. */
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const [search, setSearch] = React.useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
        if(e.target.value === '') {
            state.isSearch = false
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (search) {
            searchAnime(search)
            state.isSearch = true
        } else {
            state.isSearch = false
            alert('Please enter a valid search term')
        }
    }

    // upcoming anime fetch

    const getUpcoming = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await response.json();
        dispatch({type: GET_UPCOMING_ANIME, payload: data.data})
    }

    // airing anime fetch

    const getAiring = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await response.json();
        dispatch({type: GET_AIRING_ANIME, payload: data.data})
    }

    // get anime pictures

    const getAnimePictures = async (id) => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/characters/${id}/pictures`);
        const data = await response.json();
        dispatch({type: GET_PICTURES_ANIME, payload: data.data})
    }

    // popular anime fetch

    const getPopularAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        dispatch({type: GET_POPULAR_ANIME, payload: data.data})
    }

    const searchAnime = async (anime) => {
        dispatch({type: LOADING})
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({type: SEARCH, payload: data.data})
    }
    

    //inicial render

    React.useEffect(() => {
        getPopularAnime();
    }, [])
    return (
        // GlobalContext.Provider es un componente que se utiliza dentro del GlobalContextProvider para proporcionar el valor del contexto a los componentes hijos. Todo lo que esté dentro del Provider tendrá acceso al valor del contexto proporcionado 

        <GlobalContext.Provider value ={
            {...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getUpcoming,
            getAiring,
            getAnimePictures,
            }
        }>

        
            {children}
        </GlobalContext.Provider>

    )
}


// Estás exportando useGlobalContext para que los componentes puedan consumir el contexto GlobalContext. useGlobalContext es un hook personalizado que utiliza useContext para acceder al valor proporcionado por GlobalContext.Provider. Cuando un componente llama a useGlobalContext, obtiene el valor del contexto ("Hello") que fue proporcionado por GlobalContext.Provider.

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}


// RESUMEN:
// Creamos el contexto GlobalContext directamente con createContext() y establecemos "Hello" como su valor por defecto.
// Definimos el proveedor de contexto (GlobalContextProvider) como un componente funcional que envuelve a sus hijos con <GlobalContext.Provider>, proporcionando el valor "Hello" a través de la prop value.
// Creamos un hook personalizado (useGlobalContext) que utiliza useContext para acceder al valor del contexto GlobalContext.