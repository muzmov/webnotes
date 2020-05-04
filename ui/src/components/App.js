import React from 'react'
import Tabs from "./nav/Tabs";
import {DONE_TASKS_TAB, INFO_TAB, PROJECTS_TAB, TASKS_TAB} from "./nav/TabConstants";
import Notes from "./note/Notes";
import Projects from "./project/Projects";
import Tasks from "./task/Tasks";
import AuthService from "./auth/AuthService";


export default class App extends React.Component {

    state = {
        tasks: [],
        projects: [],
        notes: [],
        selectedNote: null,
        activeTab: TASKS_TAB
    }

    authFetch = (url, params) => {
        if (!AuthService.getUserInfo()) window.location.href = '/signin'
        params = params || {}
        if (!params.headers) {
            params.headers = {}
        }
        params.headers['Authorization'] = AuthService.getAuthHeader()
        return fetch(url, params)
            .then(res => {
                if (res.status === 401 || res.status === 403) throw Error("Unauthorized")
                return res.json()
            })
            .catch(e => {
                console.log(e);
                AuthService.logOut()
                window.location.href = '/signin'
            })
    }

    componentDidMount() {
        Promise.all([
            this.authFetch('/api/tasks'),
            this.authFetch('/api/projects'),
            this.authFetch('/api/notes')
        ]).then(this.bindProjects)
    };

    bindProjects = ([tasks, projects, notes]) => {
        notes.forEach(note => {
            note.project = projects.find(project => project.id === note.projectId)
            if (!note.project) note.projectId = null
        })
        tasks.forEach(task => {
            task.project = projects.find(project => project.id === task.projectId)
            if (!task.project) task.projectId = null
        })
        projects.forEach(project => {
            project.tasks = tasks.filter(task => task.projectId === project.id)
            project.notes = notes.filter(note => note.projectId === project.id)
        })
        this.setState({
            notes,
            projects,
            tasks
        })
    }

    saveTaskHandler = (task) => {
        console.log('Save task ', task)
        this.authFetch('/api/task', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.serializableTask(task))
        })
            .then(id => {
                task.id = id
                const tasks = this.state.tasks.map(it => it.id === id ? task : it)
                if (!tasks.includes(task)) tasks.push(task)
                this.bindProjects([tasks, this.state.projects, this.state.notes])
            })
    }

    serializableTask = task => {
        const serializableTask = {...task}
        delete serializableTask.project
        return serializableTask
    }

    saveProjectHandler = (project) => {
        console.log('Save project', project)
        this.authFetch('/api/project', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.serializableProject(project))
        })
            .then(id => {
                project.id = id
                const projects = this.state.projects.map(it => it.id === id ? project : it)
                if (!projects.includes(project)) projects.push(project)
                this.bindProjects([this.state.tasks, projects, this.state.notes])
            })
    }

    serializableProject = project => {
        const serializableProject = {...project}
        delete serializableProject.tasks
        delete serializableProject.notes
        return serializableProject
    }

    saveNoteHandler = (note) => {
        console.log('Save note', note)
        this.authFetch('/api/note', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.serializableNote(note))
        })
        .then(id => {
            note.id = id
            const notes = this.state.notes.map(it => it.id === id ? note : it)
            if (!notes.includes(note)) notes.push(note)
            this.bindProjects([this.state.tasks, this.state.projects, notes])
        })
    }

    serializableNote = note => {
        const serializableNote = {...note}
        delete serializableNote.project
        return serializableNote
    }

    deleteTaskHandler = (id) => {
        this.authFetch(`/api/task/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const tasks = this.state.tasks.filter(t => t.id !== id)
            this.bindProjects([tasks, this.state.projects, this.state.notes])
        })
    }

    deleteProjectHandler = (id) => {
        this.authFetch(`/api/project/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const projects = this.state.projects.filter(p => p.id !== id)
            this.bindProjects([this.state.tasks, projects, this.state.notes])
        })
    }

    deleteNoteHandler = (id) => {
        this.authFetch(`/api/note/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const notes = this.state.notes.filter(n => n.id !== id)
            this.bindProjects([this.state.tasks, this.state.projects, notes])
        })
    }

    selectNoteHandler = (note) => {
        this.setState({selectedNote: note, activeTab: INFO_TAB})
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
                            {this.state.activeTab === TASKS_TAB ?
                                <Tasks tasks={this.state.tasks.filter(it => !it.done)} projects={this.state.projects}
                                       deleteHandler={this.deleteTaskHandler}
                                       saveHandler={this.saveTaskHandler} creationRow={true}/> : ""}
                            {this.state.activeTab === DONE_TASKS_TAB ?
                                <Tasks tasks={this.state.tasks.filter(it => it.done)} projects={this.state.projects}
                                       deleteHandler={this.deleteTaskHandler}
                                       saveHandler={this.saveTaskHandler} creationRow={false}/> : ""}
                            {this.state.activeTab === PROJECTS_TAB ?
                                <Projects projects={this.state.projects}
                                          deleteProjectHandler={this.deleteProjectHandler}
                                          saveProjectHandler={this.saveProjectHandler}
                                          selectNoteHandler={this.selectNoteHandler}
                                /> : ""}
                            {this.state.activeTab === INFO_TAB ?
                                <Notes notes={this.state.notes} projects={this.state.projects}
                                       selectedNote={this.state.selectedNote}
                                       deleteHandler={this.deleteNoteHandler}
                                       saveHandler={this.saveNoteHandler}/> : ""}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};
