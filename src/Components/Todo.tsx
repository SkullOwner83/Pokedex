import React from 'react'

type TodoStatus = "Active" | "Inactive";

interface todoProps {
    todo: string;
    status: TodoStatus;
}

export const Todo: React.FC<todoProps> = ({ todo, status }) => {

    return (
        <div>
            <i>{todo}</i>
            <p>{status}</p>
            <hr/>
        </div>
    )
}
