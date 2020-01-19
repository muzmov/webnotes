import React from 'react'
import PropTypes from "prop-types";
import ProjectType from "./type/ProjectType";

export const SHOW_MODE = 'SHOW'
export const EDIT_MODE = 'EDIT'

export class ProjectRow extends React.Component {

    constructor(props) {
        super(props)
        const project = Object.assign({}, props.project)
        this.state = {
            project,
            mode: props.mode,
            isNew: !props.project
        }
    }

    changeModeHandler(mode) {
        this.setState({mode})
    }

    changeHandler = (field, event) => {
        const project = Object.assign({}, this.state.project)
        if (project[field] !== event.target.value) {
            project[field] = event.target.value
            this.setState({project})
        }
    }

    saveHandler = () => {
        const project = Object.assign({priority: 1}, this.state.project)
        this.props.saveHandler(project)
        if (this.state.isNew) {
            this.setState({project: {}})
        } else {
            this.setState({mode: SHOW_MODE})
        }
    }

    render() {
        const project = this.state.project
        if (this.state.mode === SHOW_MODE) {
            return (
                <tr>
                    <th scope="row">{project.id}</th>
                    <td>{project.title}</td>
                    <td>
                        Задачи
                    </td>
                    <td>
                        Справочная информация
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={() => this.changeModeHandler(EDIT_MODE)}>
                            <i className="fa fa-edit"/>
                        </button>
                        <button className="btn btn-danger ml-1" onClick={this.props.deleteHandler}>
                            <i className="fa fa-trash"/>
                        </button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <th scope="row">{project.id || ""}</th>
                    <td>
                        <input type="text" className="form-control" id="projectTextInput"
                               placeholder="Что надо сделать?" value={project.title || ''} onChange={e => this.changeHandler('title', e)}/>
                    </td>
                    <td>
                        Задачи
                    </td>
                    <td>
                        Справочная информация
                    </td>
                    <td>
                        <button href="#" className="btn btn-primary" onClick={this.saveHandler}>
                            <i className="fa fa-save"/>
                        </button>
                        {!this.state.isNew ? <button className="btn btn-danger ml-1" onClick={this.props.deleteHandler}>
                            <i className="fa fa-trash"/>
                        </button> : ''}
                    </td>
                </tr>
            )
        }
    }
}

ProjectRow.propTypes = {
    project: ProjectType,
    mode: PropTypes.oneOf([EDIT_MODE, SHOW_MODE]).isRequired,
    saveHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func
}
