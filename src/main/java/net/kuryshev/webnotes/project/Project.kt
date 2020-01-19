package net.kuryshev.webnotes.project

import javax.persistence.*

@Entity
data class Project(
        @Id
        @SequenceGenerator(name = "project_seq", sequenceName = "project_seq", allocationSize = 1)
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "project_seq")
        var id: Long? = null,
        var title: String = ""
)
