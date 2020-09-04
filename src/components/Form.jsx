import React, { useEffect, useState } from 'react';
const axios = require('axios');

const Form = (props) => {
    const endpoint = `/api/v1/tasks`
    const [state,setState] = useState({name: ''});     

    const addTask = async (event) => {
        event.preventDefault();
        const params = {      
            name: state.name,    
        }
        
        const resp = await axios.post(endpoint,params);
        props.onClickAdd(resp.data); 
        setState({name: ''});   
    }

    const handleOnChange = (event) => {
        setState({name: event.target.value})
    }

    return (
        <form >
            <input 
            type="text" 
            placeholder="Task Name"         
            value={state.name}
            onChange={handleOnChange}
            required/>
            <button onClick={addTask}> Add Task </button>
        </form>
    );
   
}

export default Form;