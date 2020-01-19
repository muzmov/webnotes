import React from 'react'
import PropTypes from 'prop-types'
import TaskType from "./type/TaskType";

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

    saveHandler = () => {
        const task = Object.assign({priority: 1}, this.state.task)
        this.props.saveHandler(task)
        if (this.state.isNew) {
            this.setState({task: {}})
        } else {
            this.changeModeHandler(SHOW_MODE)
        }
    }

    render() {
        const task = this.state.task
        const timeString = task.timeEstimation > 60 ? (task.timeEstimation / 60) + ' ч.' : task.timeEstimation + ' мин.'
        if (this.state.mode === SHOW_MODE) {
            return (
                <tr>
                    <th scope="row">{task.id}</th>
                    <td>{task.text}</td>
                    <td>{task.context}</td>
                    <td>{task.priority}</td>
                    <td>{timeString}</td>
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
                    <th scope="row">{task.id || ""}</th>
                    <td>
                        <input type="text" className="form-control" id="taskTextInput"
                               placeholder="Что надо сделать?" value={task.text || ''} onChange={e => this.changeHandler('text', e.target.value)}/>
                    </td>
                    <td>
                        <input type="text" className="form-control" id="taskContextInput"
                               placeholder="Контекст" value={task.context || ''} onChange={e => this.changeHandler('context', e.target.value)}/>
                    </td>
                    <td>
                        <select className="form-control" id="taskPriorityInput" value={task.priority || ''} onChange={e => this.changeHandler('priority', e.target.value)}>
                            {[1, 2, 3, 4, 5].map(i => <option key={i} value={i}>{i}</option> )}
                        </select>
                    </td>
                    <td>
                        <input type="text" className="form-control" id="taskTimeEstimationInput"
                               placeholder="Оценка времени" value={task.timeEstimation || ''} onChange={e => this.changeHandler('timeEstimation', +e.target.value)}/>
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
        }
    }
}

TaskRow.propTypes = {
    task: TaskType,
    mode: PropTypes.oneOf([EDIT_MODE, SHOW_MODE]).isRequired,
    saveHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func
}
