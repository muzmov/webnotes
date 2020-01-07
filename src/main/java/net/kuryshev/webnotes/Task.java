package net.kuryshev.webnotes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Task {
    @Id
    @SequenceGenerator(name = "task_seq", sequenceName = "task_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_seq")
    private Long id;
    private String text;
    private String context;
    private Integer priority;
    private Integer timeEstimation;

    @JsonIgnore
    private String username;
}
