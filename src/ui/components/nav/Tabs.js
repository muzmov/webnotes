import React from 'react'
import Tab from "./Tab"
import PropTypes from 'prop-types'
import {DONE_TASKS_TAB, INFO_TAB, PROJECTS_TAB, TASKS_TAB} from "./TabConstants";

const tabs = (props) => {
    return (
        <ul className="nav nav-pills nav-fill">
            <Tab active={props.activeTab === TASKS_TAB} title={'Задачи'} clickHandler={() => props.clickTabHandler(TASKS_TAB)}/>
            <Tab active={props.activeTab === PROJECTS_TAB} title={'Проекты'} clickHandler={() => props.clickTabHandler(PROJECTS_TAB)}/>
            <Tab active={props.activeTab === INFO_TAB} title={'Информация'} clickHandler={() => props.clickTabHandler(INFO_TAB)}/>
            <Tab active={props.activeTab === DONE_TASKS_TAB} title={'Сделанное'} clickHandler={() => props.clickTabHandler(DONE_TASKS_TAB)}/>
        </ul>
    )
}

tabs.propTypes = {
    activeTab: PropTypes.oneOf([INFO_TAB, PROJECTS_TAB, TASKS_TAB, DONE_TASKS_TAB]).isRequired,
    clickTabHandler: PropTypes.func.isRequired
}

export default tabs