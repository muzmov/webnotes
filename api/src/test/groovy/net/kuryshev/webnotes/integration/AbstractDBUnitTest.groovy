package net.kuryshev.webnotes.integration

import com.github.springtestdbunit.DbUnitTestExecutionListener
import com.github.springtestdbunit.TransactionDbUnitTestExecutionListener
import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestExecutionListeners
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener
import spock.lang.Specification

@SpringBootTest
@TestExecutionListeners([
    TransactionDbUnitTestExecutionListener,
    DependencyInjectionTestExecutionListener,
    DbUnitTestExecutionListener
])
@AutoConfigureEmbeddedDatabase
class AbstractDBUnitTest extends Specification {}
