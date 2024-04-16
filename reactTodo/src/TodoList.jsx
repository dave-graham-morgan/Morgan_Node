import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import ToDo from "./ToDo.jsx";


function TodoList(){
    const INITIAL_STATE = [];

    const [todoList, setTodoList] = useState (INITIAL_STATE);

    const addTodo = (listItem) => {
        setTodoList(prevTodo => [...prevTodo, listItem])
    }
    const removeTodo = (idx) => {
        setTodoList((todoList) => todoList.filter((_, index) => index !== idx))
    }

    const editItem = (idx) => {
        console.log("we're about to edit shit")
    }

    return (
        <>
            <NewTodoForm addTodo={addTodo}/>
            <div>
            {todoList.map((item, idx)=>{
                return <ToDo title={item} key={idx} removeTodo={removeTodo} id={idx} editItem={editItem}/>
            })}
            </div>
        </>
    )
}

export default TodoList;