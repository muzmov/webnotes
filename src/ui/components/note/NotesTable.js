import React from 'react'
import NoteRow from './NoteRow'
import PropTypes from "prop-types";
import NoteType from "./type/NoteType";

const NotesTable = props => (
    <table className="table table-hover">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Заметка</th>
        </tr>
        </thead>
        <tbody>
        {props.notes.map(note => <NoteRow key={note.id} note={note}
                                          selectHandler={() => props.selectHandler(note)}/>)}
        </tbody>
    </table>
);

NotesTable.propTypes = {
    notes: PropTypes.arrayOf(NoteType).isRequired,
    selectHandler: PropTypes.func.isRequired
}

export default NotesTable