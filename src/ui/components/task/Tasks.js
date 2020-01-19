import React from 'react'
import PropTypes from 'prop-types'
import {EDIT_MODE, SHOW_MODE, TaskRow} from './TaskRow'
import TaskType from "./type/TaskType";

const Tasks = props => (
    <table className="table table-hover">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Что нужно сделать</th>
            <th scope="col">Контекст</th>
            <th scope="col">Приоритет</th>
            <th scope="col">Оценка времени</th>
            <th scope="col">Действие</th>
        </tr>
        </thead>
        <tbody>
        {props.tasks.map(task => <TaskRow key={task.id} task={task}
                                          deleteHandler={() => props.deleteHandler(task.id)}
                                          saveHandler={props.saveHandler}
                                          mode={SHOW_MODE}
        />)}
        <TaskRow
                 saveHandler={props.saveHandler}
                 mode={EDIT_MODE}
        />
        </tbody>
    </table>
);

Tasks.propTypes = {
    tasks: PropTypes.arrayOf(TaskType).isRequired,
    deleteHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired,
}

export default Tasks