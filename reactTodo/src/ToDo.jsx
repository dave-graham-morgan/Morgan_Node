import React from 'react';

function ToDo({title, removeTodo, id, editItem}){
    const handleRemove = () => {
        removeTodo(id);
    }
    const handleEdit = () => {
        editItem(id);
    }

    return(
        <>
            <div>
                <p> {title}
                    <button onClick={handleRemove}>X</button>
                    <button onClick={handleEdit}>Edit</button>
                </p>

            </div>

        </>
    )
}

export default ToDo