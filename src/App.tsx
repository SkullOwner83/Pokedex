import { useEffect, useState } from 'react';
import { Pokemon } from './Interface/Interfaces';
import { Cards } from './Components/Cards';
import { PokemonTypes_Color } from './Data/Pokemon';
import './Styles/_Styles.scss'
import { Header } from './Components/Header';

export const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
    const [filter, setFilter] = useState<string>("");
    const [category, setCategory] = useState<string>('all');

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
                                Type: data.types.map((i: { type: { name: string } }) => i.type.name),
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
                console.log(PokemonJSON);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchPokemons();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement >) => {
        setFilter(e.currentTarget.value)
    }

    const handleCategory = (newCategory: string) => {
        setCategory(newCategory);
    }

    return (
        <div className='App'>
            <Header/>

            <main>
                <nav>
                    <input type='text' value={filter} onChange={handleChange} className='Filter-Textbox' placeholder='Buscar un pokémon'/>

                    <div className='Category-Filters'>
                        {
                            Object.entries(PokemonTypes_Color).map(([type, color]) => (
                                <button
                                className='Category-Container'
                                style={{backgroundColor: color}}
                                onClick={() => handleCategory(type)}>
                                    {type}
                                </button>
                            ))
                        }
                    </div>
                </nav>

                <Cards Pokemons={pokemons} Filter={filter} Category={category}/>
            </main>
        </div>
    )
}

export default App
