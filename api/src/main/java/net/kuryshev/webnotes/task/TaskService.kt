package net.kuryshev.webnotes.task

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class TaskService(val taskRepository: TaskRepository) {

    fun getTaskForUser(id: Long, username: String): Task {
        return taskRepository.getByIdAndUsername(id, username) ?: throw IllegalArgumentException()
    }

    fun getTasksForUser(username: String): List<Task> {
        return taskRepository.findAllByUsername(username)
    }

    fun saveTaskForUser(task: Task, username: String): Long {
        task.id?.let { taskRepository.getByIdAndUsername(it, username) ?: throw IllegalArgumentException() }
        task.username = username
        return taskRepository.save(task).id!!
    }

    fun deleteTaskForUser(id: Long, username: String): Boolean {
        taskRepository.deleteByIdAndUsername(id, username)
        return true
    }
}