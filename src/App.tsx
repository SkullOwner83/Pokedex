import { useEffect, useState } from 'react';
import { Pokemon } from './Interface/Interfaces';
import './Styles/_Styles.scss'

const Types: Record<string, string> = {
    "grass" : 'green',
    "fire" : 'red',
    "poison" : 'purple',
    "electric" : 'yellow',
    "ground" :  'brown',
    "water" : "blue",
    "normal" : "gray",
    "bug" : "antiquewhite",
    "dragon" : "orange",
    "fairy" : "pink",
    "psychic" : "rgb(128, 0, 255)",
    "fighting" : "rgb(252, 34, 0)",
    "rock" : "rgb(94, 94, 94)",
    "ghost" : "rgb(66, 0, 133)",
    "ice" : "rgb(78, 199, 255)"
}

export const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        const fetchPokemons = async (): Promise<void> => {
            try {
                const pokemonResponse: Array<Promise<Pokemon>> = [];

                for(let i = 1; i <= 150; i++) {
                    pokemonResponse.push(
                        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                        .then(response => response.json())
                        .then(data => {
                            return {
                                id: data.id,
                                Name: data.name,
                                Type: data.types["0"].type.name,
                                Image: data.sprites.other["official-artwork"].front_default,
                                Model: data.sprites.other["home"].front_default,
                                Health: data.stats["0"].base_stat,
                                Attack: data.stats["1"].base_stat,
                                Defense: data.stats["2"].base_stat,
                            }
                        })
                    );
                }

                const PokemonJSON = await Promise.all(pokemonResponse);
                setPokemons(PokemonJSON);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchPokemons();
    }, []);

    return (
        <div className='Cards-Container'>
            {
                pokemons.map((poke) => {
                    return (
                        <div className='Pokemon-Container'>
                            <div className='Card-Container'>
                                <div className='Header-Container' style={{backgroundColor: Types[poke.Type]}}>
                                    <p className='Pokemon-Name'>{poke.Name}</p>
                                </div>

                                <div
                                    key={poke.id}
                                    className='Pokemon-Image'
                                    style={{backgroundImage: `url(${poke.Image})`}}>
                                </div>

                                <div className='Card-Content'>
                                    <p>Health: {poke.Health}</p>
                                    <p>Attack: {poke.Attack}</p>
                                    <p>Defense: {poke.Defense}</p>
                                </div>
                            </div>

                            <img src={poke.Model}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default App
