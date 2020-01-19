package net.kuryshev.webnotes;

import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import net.kuryshev.webnotes.task.Task;
import net.kuryshev.webnotes.task.TaskRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureEmbeddedDatabase
public class TaskRepositoryTest {
    @Autowired
    private TaskRepository taskRepository;

    @Test
    public void testRepo() {
        Task task = new Task();
        task.setText("TEST");
        task.setPriority(1);
        task.setUsername("leshiffre");

        taskRepository.save(task);
        assertThat(taskRepository.findAll()).hasSize(1).allSatisfy(it -> {
            assertThat(it.getId()).isNotNull();
            assertThat(it.getText()).isEqualTo("TEST");
            assertThat(it.getPriority()).isEqualTo(1);
        });
    }
}