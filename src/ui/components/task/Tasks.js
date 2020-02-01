import React from 'react'
import PropTypes from 'prop-types'
import {EDIT_MODE, SHOW_MODE, TaskRow} from './TaskRow'
import TaskType from "./type/TaskType";
import ProjectType from "../project/type/ProjectType";

const Tasks = props => (
    <table className="table table-hover">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Что нужно сделать</th>
            <th scope="col">Контекст</th>
            <th scope="col">Проект</th>
            <th scope="col">Действие</th>
        </tr>
        </thead>
        <tbody>
        {props.tasks.map(task => <TaskRow key={task.id} task={task} projects={props.projects}
                                          deleteHandler={() => props.deleteHandler(task.id)}
                                          saveHandler={props.saveHandler}
                                          mode={SHOW_MODE}
        />)}
        <TaskRow
                 saveHandler={props.saveHandler}
                 projects={props.projects}
                 mode={EDIT_MODE}
        />
        </tbody>
    </table>
);

Tasks.propTypes = {
    tasks: PropTypes.arrayOf(TaskType).isRequired,
    projects: PropTypes.arrayOf(ProjectType).isRequired,
    deleteHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired,
}

export default Tasks