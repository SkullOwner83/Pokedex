import React from 'react'
import { Pokemon } from '../Interface/Interfaces'
import { PokemonTypes_Icons } from '../Data/Pokemon';

interface CardsProps {
    Pokemons: Array<Pokemon>;
    Filter: string;
    Category: string;
}

export const Cards: React.FC<CardsProps> = ({ Pokemons, Filter, Category }) => {
    return (
        <div className='Cards-Component'>
            <div className='Component-Background'/>

            {
                Pokemons.map((poke: Pokemon) => {
                    if (((poke.Name.toLowerCase()).includes(Filter.toLowerCase()) || Filter == '')
                        && poke.Type == Category || Category == 'all') {
                        
                        return (
                            <div className='Pokemon-Cards'>
                                <div className='Card-Container'>
                                    <div className='Header-Container' >
                                        <p className='Pokemon-Id'>#{poke.id}</p>
                                        <p className='Pokemon-Name'>{poke.Name}</p>
                                        <img className='Pokemon-Type' src={PokemonTypes_Icons[poke.Type]}/>
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
            
                                <img className='Pokemon-Model' src={poke.Model}/>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}
