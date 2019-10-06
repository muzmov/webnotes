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
    public void saveNote(@RequestBody Note note) {
        noteRepository.save(note);
    }
}
