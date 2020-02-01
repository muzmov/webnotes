package net.kuryshev.webnotes.note

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class NoteService(val noteRepository: NoteRepository) {

    fun getNoteForUser(id: Long, username: String): Note {
        return noteRepository.getByIdAndUsername(id, username) ?: throw IllegalArgumentException()
    }

    fun getNotesForUser(username: String): List<Note> {
        return noteRepository.findAllByUsername(username)
    }

    fun saveNoteForUser(note: Note, username: String): Long {
        note.id?.let { noteRepository.getByIdAndUsername(it, username) ?: throw IllegalArgumentException() }
        note.username = username
        return noteRepository.save(note).id!!
    }

    fun deleteNoteForUser(id: Long, username: String) {
        noteRepository.deleteByIdAndUsername(id, username)
    }
}