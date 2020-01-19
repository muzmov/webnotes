import React from 'react'
import {EDIT_MODE, ProjectRow, SHOW_MODE} from './ProjectRow'
import PropTypes from "prop-types";
import ProjectType from "./type/ProjectType";

const Projects = props => (
    <table className="table table-hover">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Проект</th>
            <th scope="col">Задачи</th>
            <th scope="col">Справочная информация</th>
            <th scope="col">Действие</th>
        </tr>
        </thead>
        <tbody>
        {props.projects.map(project => <ProjectRow key={project.id} project={project}
                                             deleteHandler={() => props.deleteHandler(project.id)}
                                             saveHandler={props.saveHandler}
                                             mode={SHOW_MODE}
        />)}
        <ProjectRow
                 saveHandler={props.saveHandler}
                 mode={EDIT_MODE}
        />
        </tbody>
    </table>
);

Projects.propTypes = {
    projects: PropTypes.arrayOf(ProjectType).isRequired,
    deleteHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired,
}

export default Projects