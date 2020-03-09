package net.kuryshev.webnotes.project

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectRepository: JpaRepository<Project?, Long?> {
    fun findAllByUsername(username: String): List<Project>
    fun getByIdAndUsername(id: Long, username: String): Project?
    fun deleteByIdAndUsername(id: Long, username: String)
}