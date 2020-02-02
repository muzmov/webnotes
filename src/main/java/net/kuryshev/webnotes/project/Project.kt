package net.kuryshev.webnotes.project

import com.fasterxml.jackson.annotation.JsonIgnore
import net.kuryshev.webnotes.note.Note
import net.kuryshev.webnotes.task.Task
import javax.persistence.*

@Entity
data class Project(
        @Id
        @SequenceGenerator(name = "project_seq", sequenceName = "project_seq", allocationSize = 1)
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "project_seq")
        var id: Long? = null,
        var title: String = "",
        @JsonIgnore
        var username: String = "",
        @JsonIgnore
        @OneToMany
        @JoinColumn(name="project_id")
        var tasks: List<Task> = listOf(),
        @JsonIgnore
        @OneToMany
        @JoinColumn(name="project_id")
        var notes: List<Note> = listOf()
)
