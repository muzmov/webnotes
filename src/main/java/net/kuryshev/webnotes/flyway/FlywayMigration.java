package net.kuryshev.webnotes.flyway;

import org.flywaydb.core.Flyway;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.stereotype.Component;

@Component
public class FlywayMigration implements FlywayMigrationStrategy {
    @Override
    public void migrate(Flyway flyway) {
        flyway.repair();
        flyway.migrate();
    }
}
