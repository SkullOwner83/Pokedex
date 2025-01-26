import React, { useReducer, useState } from 'react'
import { ICharacter } from '../Interface/Types';
import useNewCharacter from '../Hooks/useNewCharacter';

type FromSubmit = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>


interface FormProps {
    onNewCharacter: (newChar: ICharacter) => void
}



const Form = ({onNewCharacter}: FormProps) => {
    //const[inputValues, setInputValues] = useState<FormState["inputValues"]>(INITIAL_STATE);
    const[inputValues, dispatch] = useNewCharacter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        onNewCharacter(inputValues);
        dispatch({type: "clear"})
    }

    const handleChange = (e: FromSubmit) => {
        const {name, value} = e.target;

        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value
            }
        })
    }

    const handleClear = () => {
        dispatch({type: "clear"})
    }

    return (
        <div className='Form-Component'>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type='text' value={inputValues.Name} name='Name' placeholder='Nombre'/>
                <input onChange={handleChange} type='number' value={inputValues.Age} name="Age" placeholder='Edad'/>

                <select onChange={handleChange} value={inputValues.Gender} name='Gender'>
                    <option value="1">Masculino</option>
                    <option value="1">Femenino</option>
                </select>
                
                <input onClick={handleClear} type='button' value='Limpiar'/>
                <input type='submit' value='Guardar'/>
            </form>
        </div>
    )
}

export default Form;