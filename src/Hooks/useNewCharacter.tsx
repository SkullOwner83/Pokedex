import { useReducer } from "react"
import { ICharacter } from "../Interface/Types"

type FormReducerAction = {
    type: "change_value",
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: "clear"
 }

 interface FormState {
     inputValues: ICharacter
 }
 

const INITIAL_STATE = {
    Name: '',
    Gender: '',
    Age: 0,
    Avatar: ''
}

const formReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    switch(action.type) {
        case "change_value":
            const {inputName, inputValue} = action.payload
            
            return {
                ...state, 
                [inputName]: inputValue
            }
        
        case "clear": 
            return INITIAL_STATE
    }
}

const useNewCharacter = () => {
    return useReducer(formReducer, INITIAL_STATE);
}

export default useNewCharacter;