import React, { useEffect, useState } from 'react';
const axios = require('axios');

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

export default TaskList;