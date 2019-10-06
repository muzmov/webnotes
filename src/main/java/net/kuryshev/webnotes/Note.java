package net.kuryshev.webnotes;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Note {
    @Id
    @SequenceGenerator(name = "note_seq", sequenceName = "note_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_seq")
    private Long id;
    private String text;
    private Integer priority;
}
