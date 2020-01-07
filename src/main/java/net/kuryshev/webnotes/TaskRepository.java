package net.kuryshev.webnotes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByUsername(String username);

    Optional<Task> getByIdAndUsername(long id, String username);

    void deleteByIdAndUsername(long id, String username);
}
