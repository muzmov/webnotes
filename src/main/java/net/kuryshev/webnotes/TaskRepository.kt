package net.kuryshev.webnotes

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository : JpaRepository<Task?, Long?> {
    fun findAllByUsername(username: String): List<Task>
    fun getByIdAndUsername(id: Long, username: String): Task?
    fun deleteByIdAndUsername(id: Long, username: String)
}