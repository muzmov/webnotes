import React from 'react'
import TaskRow from './TaskRow'

const TasksTable = props => (
    <table className="table table-hover">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Text</th>
            <th scope="col">Context</th>
            <th scope="col">Priority</th>
            <th scope="col">Time</th>
        </tr>
        </thead>
        <tbody>
        {props.tasks.map(task => <TaskRow key={task.id} task={task}
                                          selectHandler={() => props.selectHandler(task.id)}/>)}
        </tbody>
    </table>
);

export default TasksTable