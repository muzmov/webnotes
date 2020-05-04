package net.kuryshev.webnotes.note

import net.kuryshev.webnotes.common.SuccessResponse
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/api")
class NoteController(val noteService: NoteService) {
    @GetMapping("/note/{id}")
    fun getTask(@PathVariable id: Long, principal: Principal) = noteService.getNoteForUser(id, principal.name)

    @GetMapping("/notes")
    fun getTasks(principal: Principal) = noteService.getNotesForUser(principal.name)

    @PostMapping("/note")
    fun saveTask(@RequestBody note: Note, principal: Principal) = noteService.saveNoteForUser(note, principal.name)

    @DeleteMapping("/note/{id}")
    fun deleteTask(@PathVariable id: Long, principal: Principal) = SuccessResponse(noteService.deleteNoteForUser(id, principal.name))
}