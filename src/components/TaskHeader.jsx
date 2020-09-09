import React from 'react';

const TaskHeader = (props) => {
    return (
        <div>
            <header>            
                <span className="header">{props.title}</span>
            </header>
        </div>
    );
}

export default TaskHeader;