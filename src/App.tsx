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
        for(let i = 1; i <= 150; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPokemons(prev => [...prev, data])
            })
            .catch(error => console.error(error))
        }
    }, []);

    return (
        <div className='Cards-Container'>
            {
                pokemons.map((poke) => {
                    if (poke.types["0"].type.name == filter || filter == "") {
                        return (
                            <div className='Pokemon-Container'>
                                <div className='Card-Container'>
                                    <div className='Header-Container' style={{backgroundColor: Types[poke.types["0"].type.name]}}>
                                        <p className='Pokemon-Name'>{poke.name}</p>
                                    </div>

                                    <div
                                        key={poke.id}
                                        className='Pokemon-Image'
                                        style={{backgroundImage: `url(${poke.sprites.other["official-artwork"].front_default})`}}>
                                    </div>

                                    <div className='Card-Content'>
                                        <p>{poke.types["0"].type.name}</p>
                                    </div>
                                </div>

                                <img src={poke.sprites.other["home"].front_default}/>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default App
