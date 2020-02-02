package net.kuryshev.webnotes.project

import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/api")
class ProjectController(val projectService: ProjectService) {
    @GetMapping("/project/{id}")
    fun getTask(@PathVariable id: Long, principal: Principal) = projectService.getProjectForUser(id, principal.name)

    @GetMapping("/projects")
    fun getTasks(principal: Principal) = projectService.getProjectsForUser(principal.name)

    @PostMapping("/project")
    fun saveTask(@RequestBody project: Project, principal: Principal) = projectService.saveProjectForUser(project, principal.name)

    @DeleteMapping("/project/{id}")
    fun deleteTask(@PathVariable id: Long, principal: Principal) = projectService.deleteProjectForUser(id, principal.name)
}