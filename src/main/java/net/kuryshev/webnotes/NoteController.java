package net.kuryshev.webnotes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @GetMapping("/note/{id}")
    public Note getNote(@PathVariable Long id) {
        return noteRepository.getOne(id);
    }

    @GetMapping("/notes")
    public List<Note> getNotes() {
        return noteRepository.findAll();
    }

    @PostMapping("/note")
    public Long saveNote(@RequestBody Note note) {
        return noteRepository.save(note).getId();
    }

    @DeleteMapping("/note/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteRepository.deleteById(id);
    }
}
