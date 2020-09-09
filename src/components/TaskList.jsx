import React from 'react';

const TaskList = (props) => {
    return (
        <div class="tbl">
            <div class="thr">
                <div class="td"> ID</div>
                <div class="td"> Name</div>
                <div class="td"> Status</div>
                <div class="td"> Action</div>
            </div>
        {props.tasks.map(t => <Task key={t.id} task={t} onDeleteTask= {props.onDeleteTask}/>)} 
        </div>
    );
}

const Task = (props) => {

    const task = props.task;

    const handleDelete = (event) => {
        event.preventDefault();
        //console.log('Delete clicked');
        props.onDeleteTask(task.id)  
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