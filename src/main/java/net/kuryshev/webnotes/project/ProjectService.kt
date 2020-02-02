package net.kuryshev.webnotes.project

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class ProjectService(val projectRepository: ProjectRepository) {
    fun getProjectForUser(id: Long, username: String): Project {
        return projectRepository.getByIdAndUsername(id, username) ?: throw IllegalArgumentException()
    }

    fun getProjectsForUser(username: String): List<Project> {
        return projectRepository.findAllByUsername(username)
    }

    fun saveProjectForUser(project: Project, username: String): Long {
        project.id?.let { projectRepository.getByIdAndUsername(it, username) ?: throw IllegalArgumentException() }
        project.username = username
        return projectRepository.save(project).id!!
    }

    fun deleteProjectForUser(id: Long, username: String) {
        projectRepository.getByIdAndUsername(id, username)?.let {
            it.tasks.forEach { it.projectId = null }
            it.notes.forEach { it.projectId = null }
            projectRepository.delete(it)
        }
    }
}