package net.kuryshev.webnotes.integration

import com.github.springtestdbunit.annotation.DatabaseSetup
import com.github.springtestdbunit.annotation.ExpectedDatabase
import net.kuryshev.webnotes.project.Project
import net.kuryshev.webnotes.project.ProjectService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.transaction.annotation.Transactional

import static com.github.springtestdbunit.assertion.DatabaseAssertionMode.NON_STRICT_UNORDERED

@DatabaseSetup("/project/projects.xml")
class ProjectServiceTest extends AbstractDBUnitTest {

    @Autowired
    private ProjectService projectService

    @Transactional
    def "Get project from db"() {
        when:
        def project = projectService.getProjectForUser(-4, 'leshiffre')

        then:
        verifyAll(project, Project) {
            project.id == -4
            project.title == "project with tasks and notes"
            project.tasks.size() == 2
            project.notes.size() == 2
        }
    }

    def "Get project that belongs to other user"() {
        when:
        def project = projectService.getProjectForUser(-4, 'leshiffre1')

        then:
        thrown(IllegalArgumentException)
    }

    def "Get project that doesn't exist"() {
        when:
        def project = projectService.getProjectForUser(-44, 'leshiffre')

        then:
        thrown(IllegalArgumentException)
    }

    def "Save new project to db"() {
        given:
        def project = new Project(title: 'new')

        when:
        def id = projectService.saveProjectForUser(project, 'leshiffre')
        def savedProject = projectService.getProjectForUser(id, 'leshiffre')

        then:
        savedProject.title == 'new'
    }

    def "Update existing project to db"() {
        given:
        def project = new Project(id: -1, title: 'new')

        when:
        projectService.saveProjectForUser(project, 'leshiffre')
        def updatedProject = projectService.getProjectForUser(-1, 'leshiffre')

        then:
        updatedProject.title == 'new'
    }

    def "Update project that belons to other user"() {
        given:
        def project = new Project(id: -1, title: 'new')

        when:
        projectService.saveProjectForUser(project, 'leshiffre1')

        then:
        thrown(IllegalArgumentException)
    }

    @ExpectedDatabase(value = "/project/projects_after_delete.xml", assertionMode = NON_STRICT_UNORDERED)
    def "Delete projects from db"() {
        when:
        projectService.deleteProjectForUser(-2, 'leshiffre')
        projectService.deleteProjectForUser(-3, 'leshiffre')
        projectService.deleteProjectForUser(-4, 'leshiffre')

        then:
        notThrown(Throwable)
    }
}
