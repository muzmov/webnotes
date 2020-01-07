package net.kuryshev.webnotes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/task/{id}")
    public Task getTask(@PathVariable Long id, Principal principal) {
        return taskService.getTaskForUser(id, principal.getName());
    }

    @GetMapping("/tasks")
    public List<Task> getTasks(Principal principal) {
        return taskService.getTasksForUser(principal.getName());
    }

    @PostMapping("/task")
    public Long saveTask(@RequestBody Task task, Principal principal) {
        return taskService.saveTaskForUser(task, principal.getName());
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable Long id, Principal principal) {
        taskService.deleteTaskForUser(id, principal.getName());
    }
}
