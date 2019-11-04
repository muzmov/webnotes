package net.kuryshev.webnotes;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest
public class NoteRepositoryTest {
    @Autowired
    private NoteRepository noteRepository;

    @Test
    public void testRepo() {
        Note note = new Note();
        note.setText("TEST");
        note.setPriority(1);

        noteRepository.save(note);
        assertThat(noteRepository.findAll()).hasSize(1).allSatisfy(it -> {
            assertThat(it.getId()).isNotNull();
            assertThat(it.getText()).isEqualTo("TEST");
            assertThat(it.getPriority()).isEqualTo(1);
        });
    }
}