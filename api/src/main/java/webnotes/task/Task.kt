package net.kuryshev.webnotes.task

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
data class Task(
    @Id
    @SequenceGenerator(name = "task_seq", sequenceName = "task_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_seq")
    var id: Long? = null,
    var text: String = "",
    var context: String = "",
    var priority: Int = 1,
    var timeEstimation: Int = 0,
    @Column(name = "is_done")
    var done: Boolean = false,
    @Column(name = "project_id")
    var projectId: Long? = null,
    @JsonIgnore
    var username: String = ""
)