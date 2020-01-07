import React from 'react'

class TaskCard extends React.Component {

    constructor(props) {
        super(props)
        const task = Object.assign({}, props.task)
        console.log(task)
        this.state = {
            task,
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
                isNewTask: !newProps.task
            })
        }
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
        this.props.saveTaskHandler(task)
        this.setState({task: {}})
    }

    render() {
        const task = this.state.task
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <label htmlFor="taskTextInput">Что нужно сделать</label>
                        <div className="form-group">
                            <input type="text" className="form-control" id="taskTextInput"
                                   placeholder="Что надо сделать?" value={task.text || ''} onChange={e => this.changeHandler('text', e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskContextInput">Где и когда</label>
                            <input type="text" className="form-control" id="taskContextInput"
                                   placeholder="Контекст" value={task.context || ''} onChange={e => this.changeHandler('context', e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskPriorityInput">Приоритет</label>
                            <select className="form-control" id="taskPriorityInput" value={task.priority || ''} onChange={e => this.changeHandler('priority', e)}>
                                {[1, 2, 3, 4, 5].map(i => <option key={i} value={i}>{i}</option> )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskTextInput">Оценка времени</label>
                            <input type="text" className="form-control" id="taskTimeEstimationInput"
                                   placeholder="Оценка времени" value={task.timeEstimation || ''} onChange={e => this.changeHandler('timeEstimation', e)}/>
                        </div>
                    </form>

                    <button href="#" className="btn btn-primary" onClick={this.saveHandler}>Сохранить</button>
                    {!this.state.isNewTask ? <button className="btn btn-secondary ml-1" onClick={this.props.deleteTaskHandler}>Удалить</button> : ''}
                </div>
            </div>
        )
    }
}


export default TaskCard