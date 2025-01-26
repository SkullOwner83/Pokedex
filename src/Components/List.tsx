import { ICharacter } from "../Interface/Types"

interface Props {
    characters: Array<ICharacter>
}

const List= ({characters}: Props) => {

    const RenderList = (): JSX.Element[] => {
        return(
            characters.map((char) => (
                <li key={char.Name}>
                    <img src={char.Avatar}/>
                    <strong><p>{char.Name.toUpperCase()}</p></strong>
                    <p>Genero: {char.Gender}</p>
                    <p>Edad: {char.Age}</p>
                </li>
            ))
        )
    }

    return (
        <ul className='List-Component'>
            { RenderList() }
        </ul>
    )
}

export default List;