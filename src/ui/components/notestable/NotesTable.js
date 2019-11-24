import React from 'react'
import NoteRow from './NoteRow'

const NotesTable = props => (
    <table className="table table-hover">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Text</th>
            <th scope="col">Context</th>
            <th scope="col">Priority</th>
            <th scope="col">Time</th>
        </tr>
        </thead>
        <tbody>
        {props.notes.map(note => <NoteRow key={note.id} note={note}
                                          selectHandler={() => props.selectHandler(note.id)}/>)}
        </tbody>
    </table>
);

export default NotesTable