import React from 'react'

const noteRow = (props) => {
    const timeString = props.note.timeEstimation > 60 ? (props.note.timeEstimation / 60) + ' ч.' : props.note.timeEstimation + ' мин.'
    return (
        <tr onClick={props.selectHandler}>
            <th scope="row">{props.note.id}</th>
            <td>{props.note.text}</td>
            <td>{props.note.context}</td>
            <td>{props.note.priority}</td>
            <td>{timeString}</td>
        </tr>
    )
}

export default noteRow