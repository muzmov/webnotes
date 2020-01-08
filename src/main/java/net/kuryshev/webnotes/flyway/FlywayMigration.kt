package net.kuryshev.webnotes.flyway

import org.flywaydb.core.Flyway
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy
import org.springframework.stereotype.Component

@Component
class FlywayMigration : FlywayMigrationStrategy {

    override fun migrate(flyway: Flyway) {
        flyway.repair()
        flyway.migrate()
    }
}