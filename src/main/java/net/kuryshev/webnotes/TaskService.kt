package net.kuryshev.webnotes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task getTaskForUser(Long id, String username) {
        return taskRepository.getByIdAndUsername(id, username).orElse(null);
    }

    public List<Task> getTasksForUser(String username) {
        return taskRepository.findAllByUsername(username);
    }

    public Long saveTaskForUser(Task task, String username) {
        if (task.getId() != null) {
            taskRepository.getByIdAndUsername(task.getId(), username).orElseThrow(IllegalArgumentException::new);
        }
        task.setUsername(username);
        return taskRepository.save(task).getId();
    }

    public void deleteTaskForUser(Long id, String username) {
        taskRepository.deleteByIdAndUsername(id, username);
    }
}
