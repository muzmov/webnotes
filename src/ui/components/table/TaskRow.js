import React from 'react'

const taskRow = (props) => {
    const timeString = props.task.timeEstimation > 60 ? (props.task.timeEstimation / 60) + ' ч.' : props.task.timeEstimation + ' мин.'
    return (
        <tr onClick={props.selectHandler}>
            <th scope="row">{props.task.id}</th>
            <td>{props.task.text}</td>
            <td>{props.task.context}</td>
            <td>{props.task.priority}</td>
            <td>{timeString}</td>
        </tr>
    )
}

export default taskRow