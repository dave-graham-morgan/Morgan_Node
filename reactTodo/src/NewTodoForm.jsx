import React, {useState} from "react";

function NewTodoForm({addTodo}){
    const [formData, setformData] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setformData(e.target.value);

    }

    const handleAdd = (e) => {
        e.preventDefault();
        addTodo(formData);
        setformData("");
    }

    return(
        <>
            <form>
                <input id="newTodo"
                       name="todoInput"
                       type="text"
                       placeholder="Type Todo..."
                       value={formData}
                       onChange={handleChange}
                />
                <button onClick={handleAdd}>Add</button>
            </form>
        </>
    )
}
export default NewTodoForm;