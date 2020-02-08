import React from 'react'
import PropTypes from "prop-types";
import ProjectsTable from "./ProjectsTable";
import ProjectType from "./type/ProjectType";
import ProjectCard from "./ProjectCard";

class Projects extends React.Component {

    state = {
        selectedProject: this.props.projects[0]
    }

    componentWillReceiveProps(props, state) {
        if (!this.state.selectedProject || !props.projects.some(p => p.id === this.state.selectedProject.id)) {
            this.setState({selectedProject: props.projects[0]})
        }
    }

    selectProjectHandler = (project) => this.setState({selectedProject: project})

    deleteProjectHandler = (projectId) => {
        this.props.deleteProjectHandler(projectId)
    }

    saveProjectHandler = (project) => {
        this.props.saveProjectHandler(project)
    }

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-sm">
                        <ProjectsTable projects={this.props.projects}
                                       selectHandler={this.selectProjectHandler}
                                       deleteHandler={this.deleteProjectHandler}
                                       saveHandler={this.saveProjectHandler}
                        />
                    </div>
                    <div className="col-sm">
                        {this.state.selectedProject ? <ProjectCard project={this.state.selectedProject}
                                     selectNoteHandler={this.props.selectNoteHandler}/> : ''}
                    </div>
                </div>
            </div>
        )
    }
}

Projects.propTypes = {
    projects: PropTypes.arrayOf(ProjectType).isRequired,
    deleteProjectHandler: PropTypes.func.isRequired,
    saveProjectHandler: PropTypes.func.isRequired,
    selectNoteHandler: PropTypes.func.isRequired
}

export default Projects