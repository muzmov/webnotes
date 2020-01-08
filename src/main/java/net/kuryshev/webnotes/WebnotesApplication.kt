package net.kuryshev.webnotes

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class WebnotesApplication

fun main(args: Array<String>) {
    SpringApplication.run(WebnotesApplication::class.java, *args)
}
