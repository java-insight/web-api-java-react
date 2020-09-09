import React, { useEffect, useState } from 'react';
import './App.css';

//import {endpoint} from './Config';
import TaskHeader from './TaskHeader';
import TaskList from './TaskList';
import Form from './Form';

const axios = require('axios');

/*
const testData = [
{"id": 1,"name": "Requirement Analysis","isComplete": false },
{"id": 2,"name": "Design","isComplete": false },
];
*/

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
	
   
    const addtask = async (taskName) => {
        console.log('Task_Name: '+ taskName);
        const params = {      
            name: taskName,    
        }
        const resp = await axios.post(endpoint,params);
        const taskData = resp.data
        setState( 
            prevState => (
                { 
                    title: props.title,
                    tasks: [...prevState.tasks, taskData ]
                }
            )
        );            
    }

    
    const deleteTask = async (id) =>  {
        const resp = await axios.delete(`${endpoint}/${id}`);
        console.log(resp.status);
        refreshTaskList();
    }

    const refreshTaskList = async () => {
        fetch(endpoint)
          .then((res) => res.json())
          .then((taskListData) => {
            refreshTask(taskListData) });   
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
            <TaskList tasks={state.tasks} onDeleteTask={deleteTask}/>       
        </div>
    );
}

export default App;
