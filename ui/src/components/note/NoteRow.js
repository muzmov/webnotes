import React from 'react'
import PropTypes from "prop-types";
import NoteType from "./type/NoteType";

const noteRow = (props) =>
    (
        <tr onClick={props.selectHandler}>
            <th scope="row">{props.note.id}</th>
            <td>{props.note.title}</td>
        </tr>
    )

noteRow.propTypes = {
    note: NoteType.isRequired,
    selectHandler: PropTypes.func.isRequired
}

export default noteRow
