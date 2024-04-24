import React, {useState} from "react";


function FormField({placeholder, getData, id}){
    const [formData, setFormData] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        getData(e.target.value, id)
        setFormData(e.target.value)
    }

    return(
        <>
            <div>
            <input type="text"
                   placeholder={placeholder}
                   value={formData}
                   onChange={handleChange}
            />
            </div>
        </>
    )
}

export default FormField;