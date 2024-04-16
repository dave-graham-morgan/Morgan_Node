import React, {useState} from 'react';

function NewBoxForm({addBox}){
    const INITIAL_STATE = {
        backgroundColor: "",
        width: "",
        height: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormData( (data)=> ({
            ...data,
            [name]:value
            })
        )
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        addBox(formData.backgroundColor, formData.width, formData.height);
        setFormData(INITIAL_STATE);

    }
    return (
        <>
            <form>
                <label htmlFor="backgroundColor">Background Color</label>
                <input id="backgroundColor"
                       name="backgroundColor"
                       type="text"
                       placeholder="background-color"
                       value={formData.backgroundColor}
                       onChange={handleChange}
                />
                <label htmlFor="width">Width</label>
                <input type="text"
                       id="width"
                       name="width"
                       placeholder="width"
                       value={formData.width}
                       onChange={handleChange}
                />
                <label htmlFor="height">Height</label>
                <input type="text"
                       id="height"
                       name="height"
                       placeholder="height"
                       value={formData.height}
                       onChange={handleChange}
                />
                <button onClick={handleSubmit}>submit</button>
            </form>
        </>
    )
}

export default NewBoxForm;