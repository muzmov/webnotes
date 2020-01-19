import React from 'react'
import PropTypes from 'prop-types'

const tab = (props) => {
    const className = props.active ? "nav-link active" : "nav-link"
    return (
        <li className="nav-item ml-3">
            <a className={className} onClick={props.clickHandler} href="#">{props.title}</a>
        </li>
    )
}

tab.propTypes = {
    active: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
}

export default tab