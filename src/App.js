import React,{useState,useEffect} from "react"
import './App.css';
import {getAllPokemon,getPokemon} from "./services/Pokemon";
import Card from "./Card/Card"
import Navbar from "./Navbar/Navbar";

function App() {
  const [pokemonData,setPokemonData] = useState([])
  const [nextUrl,setNextUrl] = useState('');
  const [prevUrl,setPrevUrl] = useState('');
  const [loading,setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(()=>{

  async function fetchData(){
    let response = await getAllPokemon(initialUrl);
    console.log(response)

    setNextUrl(response.next);
    setPrevUrl(response.previous);
     await loadingPokemon(response.results);
  
    setLoading(false);


  }
  fetchData()
  },[])

  const next = async ()=>{
    setLoading(true)
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false)
  }
  const prev = async ()=>{
    if(!prevUrl){
      return;
    }
    setLoading(true)
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false)
  }


  const loadingPokemon = async data =>{
    let _pokemonData = await Promise.all(
    data.map(async pokemon=>{
      let pokemonRecord =  await getPokemon(pokemon.url);
      return pokemonRecord;
    })
    );
    setPokemonData(_pokemonData)
  }
  console.log(pokemonData)
  return (
    <div>
     
     {
      
       loading ? <h1>loading...</h1>:(
        <>
         <Navbar />
         <div className="btn">
           <button onClick={prev}>Prev</button>
        
           <button onClick={next}>Next</button>
           </div>
       

  <div className="grid-container">
    {
      pokemonData.map((pokemon,i)=>{
        return <Card key={i} pokemon={pokemon} />
      })
    }
  </div>
  <div className="btn">
           <button onClick={prev}>Prev</button>
        
           <button onClick={next}>Next</button>
           </div>
        </>
       )
     }
    </div>
  );
}

export default App;
