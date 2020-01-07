import React from 'react'
import TasksTable from "./table/TasksTable";
import TaskCard from './card/TaskCard'

export default class App extends React.Component {
    state = {
        tasks: [],
        selectedTaskId: null
    }

    componentDidMount = () => {
        this.loadAllTasks();
    };

    loadAllTasks = () => {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => this.setState({tasks, selectedTaskId: null}));
    };

    saveTaskHandler = (task) => {
        console.log(task)
        fetch('/api/task', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task)
        })
            .then((response) => response.json())
            .then(id => {
                task.id = id
                const tasks = this.state.tasks.filter(it => it.id !== id)
                tasks.push(task)
                this.setState({tasks})
            })
    }

    deleteTaskHandler = (id) => {
        fetch(`/api/task/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const tasks = this.state.tasks.filter(task => task.id !== id)
            this.setState({
                tasks,
                selectedTaskId: null
            })
        })
    }

    selectTaskHandler = (id) => this.setState({selectedTaskId: id})

    render() {
        const selectedTask = this.state.tasks.find(task => task.id === this.state.selectedTaskId)
        return (
            <React.Fragment>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Web notes GTD</span>
                </nav>
                <div className='container'>
                    <div className="row">
                        <div className="col-sm">
                            <TasksTable tasks={this.state.tasks} selectHandler={this.selectTaskHandler}/>
                            <button className="btn btn-primary" type="submit"
                                    onClick={() => this.selectTaskHandler(null)}>Добавить задачу
                            </button>
                        </div>
                        <div className="col-sm">
                            <TaskCard task={selectedTask}
                                      saveTaskHandler={this.saveTaskHandler}
                                      deleteTaskHandler={() => this.deleteTaskHandler(selectedTask.id)}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};
