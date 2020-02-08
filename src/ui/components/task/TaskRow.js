import React from 'react'
import PropTypes from 'prop-types'
import TaskType from "./type/TaskType";
import ProjectType from "../project/type/ProjectType";

export const SHOW_MODE = 'SHOW'
export const EDIT_MODE = 'EDIT'

export class TaskRow extends React.Component {

    state = {
        task: Object.assign({}, this.props.task),
        mode: this.props.mode,
        isNew: !this.props.task
    }

    changeModeHandler = (mode) => this.setState({mode})

    changeHandler = (field, value) => {
        const task = Object.assign({}, this.state.task)
        if (task[field] !== value) {
            task[field] = value
            this.setState({task})
        }
    }

    changeProjectIdHandler = (projectId) => {
        const task = Object.assign({}, this.state.task)
        if (task.projectId !== projectId) {
            task.projectId = projectId
            task.project = this.props.projects.find(it => it.id == projectId) || null
            this.setState({task})
        }
    }

    saveHandler = () => {
        const task = {...this.state.task}
        this.props.saveHandler(task)
        if (this.state.isNew) {
            this.setState({task: {}})
        } else {
            this.changeModeHandler(SHOW_MODE)
        }
    }

    render() {
        const task = this.state.task
        return this.state.mode === SHOW_MODE ? this.showTaskItem(task) : this.editTaskItem(task)
    }

    showTaskItem(task) {
        return <tr>
            <th scope="row">{task.id}</th>
            <td>{task.text}</td>
            <td>{task.context}</td>
            <td>{(task.project || {}).title || ''}</td>
            <td>
                <button className="btn btn-primary" onClick={() => this.changeModeHandler(EDIT_MODE)}>
                    <i className="fa fa-edit"/>
                </button>
                <button className="btn btn-danger ml-1" onClick={this.props.deleteHandler}>
                    <i className="fa fa-trash"/>
                </button>
            </td>
        </tr>;
    }

    editTaskItem = (task) => (
        <tr>
            <th scope="row">{task.id || ""}</th>
            <td>
                <input type="text" className="form-control" id="taskTextInput"
                       placeholder="Что надо сделать?" value={task.text || ''}
                       onChange={e => this.changeHandler('text', e.target.value)}/>
            </td>
            <td>
                <input type="text" className="form-control" id="taskContextInput"
                       placeholder="Контекст" value={task.context || ''}
                       onChange={e => this.changeHandler('context', e.target.value)}/>
            </td>
            <td>
                {this.selectProjectItem(task)}
            </td>
            <td>
                <button className="btn btn-primary" onClick={this.saveHandler}>
                    <i className="fa fa-save"/>
                </button>
                {!this.state.isNew ? <button className="btn btn-danger ml-1" onClick={this.props.deleteHandler}>
                    <i className="fa fa-trash"/>
                </button> : ''}
            </td>
        </tr>
    )

    selectProjectItem = (task) => {
        const projects = this.props.projects.slice()
        projects.push({id: null, title: ''});
        projects.sort((b, a) => b.title.localeCompare(a.title))
        return (
            <select className="form-control" id="taskProjectInput" value={task.projectId || ""}
                    onChange={e => this.changeProjectIdHandler( e.target.value === null ? null : +e.target.value)}>
                {projects.map(p => <option key={p.id} value={p.id || ""}>{p.title}</option>)}
            </select>
        )
    }
}

TaskRow.propTypes = {
    task: TaskType,
    projects: PropTypes.arrayOf(ProjectType).isRequired,
    mode: PropTypes.oneOf([EDIT_MODE, SHOW_MODE]).isRequired,
    saveHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func
}
