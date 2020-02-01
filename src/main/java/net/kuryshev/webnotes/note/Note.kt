package net.kuryshev.webnotes.note

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
data class Note(
        @Id
        @SequenceGenerator(name = "note_seq", sequenceName = "note_seq", allocationSize = 1)
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_seq")
        var id: Long? = null,
        var title: String = "",
        var text: String = "",
        @Column(name = "project_id")
        var projectId: Long? = null,
        @JsonIgnore
        var username: String = ""
)
