package net.kuryshev.webnotes.task

import org.springframework.web.bind.annotation.*
import webnotes.common.SuccessResponse
import java.security.Principal

@RestController
@RequestMapping("/api")
class TaskController(val taskService: TaskService) {

    @GetMapping("/task/{id}")
    fun getTask(@PathVariable id: Long, principal: Principal) = taskService.getTaskForUser(id, principal.name)

    @GetMapping("/tasks")
    fun getTasks(principal: Principal) = taskService.getTasksForUser(principal.name)

    @PostMapping("/task")
    fun saveTask(@RequestBody task: Task, principal: Principal) = taskService.saveTaskForUser(task, principal.name)

    @DeleteMapping("/task/{id}")
    fun deleteTask(@PathVariable id: Long, principal: Principal) = SuccessResponse(taskService.deleteTaskForUser(id, principal.name))
}