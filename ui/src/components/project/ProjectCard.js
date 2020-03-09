import React from 'react'
import ProjectType from "./type/ProjectType";
import PropTypes from 'prop-types'
import Checkbox from "../ui/Checkbox";

const getTaskItem = (task) => (
    <div className="input-group" key={task.id}>
        <div className="input-group-prepend">
            <div className="input-group-text">
                <Checkbox checked={task.done} style={{verticalAlign: "unset"}}/>
            </div>
        </div>
        <input type="text" className="form-control" value={task.text} disabled={true}/>
    </div>
)

const getTaskItems = (props) => {
    if (props.project.tasks.length) {
        return <React.Fragment>
            <h5 className="card-subtitle text-muted mb-2">Задачи</h5>
            {props.project.tasks.sort((a, b) => (b.done || 0) - (a.done || 0)).map(getTaskItem)}
        </React.Fragment>
    } else {
        return <p className="text-muted">Создайте первую задачу по проекту</p>
    }
}

const getNoteItem = (note, selectNoteHandler) => (
    <div key={note.id}><a href='#' onClick={() => selectNoteHandler(note)}>{note.title}</a><br/></div>)

const getNoteItems = props => {
    if (props.project.notes.length) {
        return <React.Fragment>
            <h5 className="card-subtitle mt-3 mb-2 text-muted">Справочная информация</h5>
            {props.project.notes.map(note => getNoteItem(note, props.selectNoteHandler))}
        </React.Fragment>
    } else {
        return ""
    }
}

const ProjectCard = props => (
    <div className="card">
        <div className="card-body">
            <h4 className="card-title">{props.project.title}</h4>
            {getTaskItems(props)}
            {getNoteItems(props)}
        </div>
    </div>
);

ProjectCard.propTypes = {
    project: ProjectType.isRequired,
    selectNoteHandler: PropTypes.func.isRequired
}

export default ProjectCard