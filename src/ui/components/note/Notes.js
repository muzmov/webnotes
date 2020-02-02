import React from 'react'
import NotesTable from "./NotesTable";
import NoteCard from "./NoteCard";
import PropTypes from "prop-types";
import NoteType from "./type/NoteType";
import ProjectType from "../project/type/ProjectType";

class Notes extends React.Component {

    state = {
        selectedNote: this.props.selectedNote
    }

    selectHandler = (note) => {
        this.setState({selectedNote: note})
    }

    deleteHandler = (note) => {
        this.props.deleteHandler(note.id)
        this.selectHandler(null)
    }

    saveHandler = (note) => {
        this.props.saveHandler(note)
        this.selectHandler(null)
    }

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-sm">
                        <NotesTable notes={this.props.notes} selectHandler={this.selectHandler}/>
                        <button className="btn btn-primary" type="submit"
                                onClick={() => this.selectHandler(null)}>Добавить заметку
                        </button>
                    </div>
                    <div className="col-sm">
                        <NoteCard note={this.state.selectedNote} projects={this.props.projects}
                                  saveHandler={this.saveHandler}
                                  deleteHandler={this.deleteHandler}/>
                    </div>
                </div>
            </div>
        )
    }
}

Notes.propTypes = {
    notes: PropTypes.arrayOf(NoteType).isRequired,
    projects: PropTypes.arrayOf(ProjectType).isRequired,
    selectedNote: NoteType,
    deleteHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
}

export default Notes