import React, { useEffect, useState } from 'react';
import './App.css';
const axios = require('axios');

/*
const testData = [
{"id": 1,"name": "Requirement Analysis","isComplete": false },
{"id": 2,"name": "Design","isComplete": false },
];
*/

const TaskHeader = (props) => {
    return (
        <div>
            <header>            
                <span className="header">{props.title}</span>
            </header>
        </div>
    );
}

const TaskList = (props) => {
    return (
        <div class="tbl">
            <div class="thr">
                <div class="td"> ID</div>
                <div class="td"> Name</div>
                <div class="td"> Status</div>
                <div class="td"> Action</div>
            </div>
        {props.tasks.map(t => <Task key={t.id} task={t} onRefreshTask= {props.onRefreshTask}/>)} 
        </div>
    );
}
const Task = (props) => {

    const task = props.task;
    const endpoint = `/api/v1/tasks`

    const deleteTask = async (id) =>  {
        const resp = await axios.delete(`${endpoint}/${id}`);
        console.log(resp.status);
    }

    const refreshTaskList = async () => {
        fetch(endpoint)
          .then((res) => res.json())
          .then((taskListData) => {
            props.onRefreshTask(taskListData) });   
    }

    const handleDelete = (event) => {
        event.preventDefault();
        console.log('Delete clicked');
        deleteTask(task.id)
        let data = refreshTaskList()
        console.log(data);
        refreshTaskList();
    }

    return (             
            <div class="tr">
                <div class="td"> {task.id}</div>
                <div class="td"> {task.name}</div>
                <div class="td"> {task.isComplete ? 'CLOSED' : 'OPEN'} </div>
                <div class="td"> <button onClick={handleDelete}> Delete</button></div>
            </div>             
    );
}

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

const App = (props) => {
    const endpoint = `/api/v1/tasks`  

	const [state,setState] = useState({
        title: props.title,
        tasks: [],
    });
    
    // Set initial Value
    useEffect(() => {       
        fetch(endpoint)
          .then((res) => res.json())
          .then((taskListData) => {
            setState(                
                {
                    title: props.title,
                    tasks: taskListData 
                }
            );
          });
      }, [setState]);

	
    const addtask = (taskData) => {
        console.log(taskData);
        setState( 
            prevState => (
                { 
                    title: props.title,
                    tasks: [...prevState.tasks, taskData ]
                }
            )
        );            
    }

    const refreshTask = (taskListData) => {
        setState( 
            prevState => (
                { 
                    title: props.title,
                    tasks: taskListData
                }
            )
        );            
    }

    return (    
        <div className="App">
            <TaskHeader title={state.title}/>    
            <Form  onClickAdd={addtask}/>   
            <TaskList tasks={state.tasks} onRefreshTask={refreshTask}/>       
        </div>
    );
}

export default App;
