package net.kuryshev.webnotes.note

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface NoteRepository: JpaRepository<Note?, Long?> {
    fun findAllByUsername(username: String): List<Note>
    fun getByIdAndUsername(id: Long, username: String): Note?
    fun deleteByIdAndUsername(id: Long, username: String)
}