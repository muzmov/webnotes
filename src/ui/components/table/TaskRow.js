import React from 'react'

export const SHOW_MODE = 'SHOW'
export const EDIT_MODE = 'EDIT'

export class TaskRow extends React.Component {

    constructor(props) {
        super(props)
        const task = Object.assign({}, props.task)
        this.state = {
            task,
            mode: props.mode,
            isNewTask: !props.task
        }
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.task !== newProps.task) {
            const task = Object.assign({}, newProps.task)
            console.log(task)
            this.setState({
                task,
                mode: newProps.mode,
                isNewTask: !newProps.task
            })
        }
    }

    changeModeHandler(mode) {
        this.setState({mode})
    }

    changeHandler = (field, event) => {
        const task = Object.assign({}, this.state.task)
        if (task[field] !== event.target.value) {
            task[field] = event.target.value
            this.setState({task})
        }
    }

    saveHandler = () => {
        const task = Object.assign({priority: 1}, this.state.task)
        this.props.saveHandler(task)
        if (this.state.isNewTask) {
            this.setState({task: {}})
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
                               placeholder="Что надо сделать?" value={task.text || ''} onChange={e => this.changeHandler('text', e)}/>
                    </td>
                    <td>
                        <input type="text" className="form-control" id="taskContextInput"
                               placeholder="Контекст" value={task.context || ''} onChange={e => this.changeHandler('context', e)}/>
                    </td>
                    <td>
                        <select className="form-control" id="taskPriorityInput" value={task.priority || ''} onChange={e => this.changeHandler('priority', e)}>
                            {[1, 2, 3, 4, 5].map(i => <option key={i} value={i}>{i}</option> )}
                        </select>
                    </td>
                    <td>
                        <input type="text" className="form-control" id="taskTimeEstimationInput"
                               placeholder="Оценка времени" value={task.timeEstimation || ''} onChange={e => this.changeHandler('timeEstimation', e)}/>
                    </td>
                    <td>
                        <button href="#" className="btn btn-primary" onClick={this.saveHandler}>
                            <i className="fa fa-save"/>
                        </button>
                        {!this.state.isNewTask ? <button className="btn btn-danger ml-1" onClick={this.props.deleteHandler}>
                            <i className="fa fa-trash"/>
                        </button> : ''}
                    </td>
                </tr>
            )
        }
    }

}
