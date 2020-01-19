import React from 'react'
import Tasks from "./task/Tasks";
import Tabs from "./nav/Tabs";
import {INFO_TAB, PROJECTS_TAB, TASKS_TAB} from "./nav/TabConstants";
import Projects from "./project/Projects";
import Notes from "./note/Notes";

export default class App extends React.Component {

    state = {
        tasks: [],
        projects: [],
        notes: [],
        activeTab: TASKS_TAB
    }

    componentDidMount() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => this.setState({tasks}));
        fetch('/api/projects')
            .then(response => response.json())
            .then(projects => this.setState({projects}));
        fetch('/api/notes')
            .then(response => response.json())
            .then(notes => this.setState({notes}));
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
                const tasks = this.state.tasks.map(it => it.id === id ? task : it)
                if (!tasks.includes(task)) tasks.push(task)
                this.setState({tasks})
            })
    }

    saveProjectHandler = (project) => {
        console.log(project)
        fetch('/api/project', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then(id => {
                project.id = id
                const projects = this.state.projects.map(it => it.id === id ? project : it)
                if (!projects.includes(project)) projects.push(project)
                this.setState({projects})
            })
    }

    saveNoteHandler = (note) => {
        console.log(note)
        fetch('/api/note', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(note)
        })
            .then((response) => response.json())
            .then(id => {
                note.id = id
                const notes = this.state.notes.map(it => it.id === id ? note : it)
                if (!notes.includes(note)) notes.push(note)
                this.setState({notes})
            })
    }

    deleteTaskHandler = (id) => {
        fetch(`/api/task/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const tasks = this.state.tasks.filter(t => t.id !== id)
            this.setState({tasks})
        })
    }

    deleteProjectHandler = (id) => {
        fetch(`/api/project/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const projects = this.state.projects.filter(p => p.id !== id)
            this.setState({projects})
        })
    }

    deleteNoteHandler = (id) => {
        fetch(`/api/note/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const notes = this.state.notes.filter(n => n.id !== id)
            this.setState({notes})
        })
    }

    selectTabHandler = (tab) => this.setState({activeTab: tab})

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-light bg-light justify-content-start">
                    <span className="navbar-brand mb-0 h1">Web notes GTD</span>
                    <Tabs clickTabHandler={this.selectTabHandler} activeTab={this.state.activeTab}/>
                </nav>
                <div className='container'>
                    <div className="row mt-3">
                        <div className="col-sm">
                            {this.state.activeTab === TASKS_TAB ? <Tasks tasks={this.state.tasks} deleteHandler={this.deleteTaskHandler} saveHandler={this.saveTaskHandler}/> : ""}
                            {this.state.activeTab === PROJECTS_TAB ? <Projects projects={this.state.projects} deleteHandler={this.deleteProjectHandler} saveHandler={this.saveProjectHandler}/> : ""}
                            {this.state.activeTab === INFO_TAB ? <Notes notes={this.state.notes} deleteHandler={this.deleteNoteHandler} saveHandler={this.saveNoteHandler}/> : ""}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};
