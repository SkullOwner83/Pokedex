import { useEffect, useState } from 'react';
import './Styles/_Styles.scss'

interface Pokemon  {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
}

export const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

    useEffect(() => {
        for(let i = 1; i <= 150; i++) {
          fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setPokemons(prev => [...prev, data])
          })
        }
    }, []);

    return (
        <div className='Pokemon-Container'>
            {
              pokemons.map((poke) => (
                <div 
                  key={poke.id} 
                  className='Image-Container'
                  style={{backgroundImage: `url(${poke.sprites.other["official-artwork"].front_default})`}}>
                </div>
              ))
            }
        </div>
    )
}

export default App
