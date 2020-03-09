import React from 'react'
import PropTypes from 'prop-types'
import {EDIT_MODE, SHOW_MODE, TaskRow} from './TaskRow'
import TaskType from "./type/TaskType";
import ProjectType from "../project/type/ProjectType";

class Tasks extends React.Component {
    state = {
        sortedBy: 'priority',
        ascending: 1
    }

    sortedTasks() {
        const sortedBy = this.state.sortedBy
        const ascending = this.state.ascending
        const tasks = this.props.tasks.slice()
        tasks.sort((t1, t2) => {
            if (sortedBy !== 'priority') {
                if (t1[sortedBy] > t2[sortedBy]) return (t1.done - t2.done) * 100 + ascending
                if (t1[sortedBy] < t2[sortedBy]) return (t1.done - t2.done) * 100 - ascending
                return (t1.done - t2.done) * 100
            } else {
                return (t1.done - t2.done) * 100 + (t1.priority - t2.priority) * ascending
            }
        })
        return tasks
    }

    sortBy(field) {
        const ascending = this.state.sortedBy === field ? -this.state.ascending : 1
        this.setState({
            sortedBy: field,
            ascending: ascending
        })
    }

    getSortedSign(field) {
        if (this.state.sortedBy !== field) {
            return ""
        }
        return this.state.ascending === 1 ? " ▲" : " ▼"
    }

    render() {
        return (<table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col"/>
                    <th scope="col" onClick={() => this.sortBy('text')}>Что нужно
                        сделать {this.getSortedSign('text')}</th>
                    <th scope="col" onClick={() => this.sortBy('context')}>Контекст {this.getSortedSign('context')}</th>
                    <th scope="col">Проект</th>
                    <th scope="col"
                        onClick={() => this.sortBy('priority')}>Приоритет {this.getSortedSign('priority')}</th>
                    <th scope="col">Действие</th>
                </tr>
                </thead>
                <tbody>
                {this.sortedTasks().map(task => <TaskRow key={task.id} task={task} projects={this.props.projects}
                                                         deleteHandler={() => this.props.deleteHandler(task.id)}
                                                         saveHandler={this.props.saveHandler}
                                                         mode={SHOW_MODE}
                />)}
                {this.props.creationRow ?
                    <TaskRow
                        saveHandler={this.props.saveHandler}
                        projects={this.props.projects}
                        mode={EDIT_MODE}/>
                    : ""}
                </tbody>
            </table>
        );
    }
}

Tasks.propTypes = {
    tasks: PropTypes.arrayOf(TaskType).isRequired,
    projects: PropTypes.arrayOf(ProjectType).isRequired,
    deleteHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired,
    creationRow: PropTypes.bool.isRequired
}

export default Tasks