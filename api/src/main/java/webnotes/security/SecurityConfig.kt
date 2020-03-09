package net.kuryshev.webnotes.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import javax.sql.DataSource

@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
    @Autowired
    private lateinit var dataSource: DataSource

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.jdbcAuthentication().dataSource(dataSource)
                .authoritiesByUsernameQuery("select username, 'DEFAULT' as role from users where username=?")
                .usersByUsernameQuery("select username, password, enabled from users where username=?")
                .passwordEncoder(BCryptPasswordEncoder())
    }

    override fun configure(httpSecurity: HttpSecurity) {
        httpSecurity.authorizeRequests()
                .anyRequest()
                .authenticated()
                .and()
                .formLogin().defaultSuccessUrl("/", true)
                .and()
                .csrf().disable()
    }
}