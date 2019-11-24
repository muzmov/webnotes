import React from 'react'
import NotesTable from "./notestable/NotesTable";
import NoteCard from './notecard/NoteCard'

export default class App extends React.Component {
    state = {
        notes: [],
        selectedNoteId: null
    }

    componentDidMount = () => {
        this.loadAllNotes();
    };

    loadAllNotes = () => {
        fetch('/api/notes')
            .then(response => response.json())
            .then(notes => this.setState({notes, selectedNoteId: null}));
    };

    saveNoteHandler = (note) => {
        fetch('/api/note', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(note)
        })
            .then((response) => response.json())
            .then(id => {
                note.id = id
                const notes = this.state.notes.filter(it => it.id !== id)
                notes.push(note)
                this.setState({notes})
            })
    }

    deleteNoteHandler = (id) => {
        fetch(`/api/note/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const notes = this.state.notes.filter(note => note.id !== id)
            this.setState({
                notes,
                selectedNoteId: null
            })
        })
    }

    selectNoteHandler = (id) => this.setState({selectedNoteId: id})

    render() {
        const selectedNote = this.state.notes.find(note => note.id === this.state.selectedNoteId)
        return (
            <React.Fragment>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Web notes GTD</span>
                </nav>
                <div className='container'>
                    <div className="row">
                        <div className="col-sm">
                            <NotesTable notes={this.state.notes} selectHandler={this.selectNoteHandler}/>
                            <button className="btn btn-primary" type="submit"
                                    onClick={() => this.selectNoteHandler(null)}>Добавить заметку
                            </button>
                        </div>
                        <div className="col-sm">
                            <NoteCard note={selectedNote}
                                      saveNoteHandler={this.saveNoteHandler}
                                      deleteNoteHandler={() => this.deleteNoteHandler(selectedNote.id)}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};
