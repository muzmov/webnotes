package net.kuryshev.webnotes.note

import javax.persistence.*

@Entity
data class Note(
        @Id
        @SequenceGenerator(name = "note_seq", sequenceName = "note_seq", allocationSize = 1)
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_seq")
        var id: Long? = null,
        var title: String = "",
        var text: String = ""
)
