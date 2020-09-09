import React, { useState } from 'react';

const Form = (props) => {
    const [state,setState] = useState({name: ''});     

    const addTask = async (event) => {
        event.preventDefault();
        props.onClickAdd(state.name); 
        setState({name: ''});   
    }

    const handleOnChange = (event) => {
        setState({name: event.target.value})
    }

    return (
        <form >
            <input 
            type = "text" 
            placeholder = "Task Name"         
            value = {state.name}
            onChange = {handleOnChange}
            required />
            <button onClick={addTask}> Add Task </button>
        </form>
    );
   
}

export default Form;