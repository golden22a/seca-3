package com.example.apigateway.config;

import com.netflix.ribbon.proxy.annotation.Http;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static com.example.apigateway.config.SecurityConstant.SIGN_UP_URL;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(String.valueOf(Http.HttpMethod.POST), "/api/ouath/"+SIGN_UP_URL).permitAll()
                .antMatchers(String.valueOf(Http.HttpMethod.POST), "/api/ouath/login").permitAll()
                .antMatchers(HttpMethod.GET,"/api/users/").authenticated()
                .antMatchers(HttpMethod.PATCH,"/api/users/").authenticated()
                .antMatchers("/api/users/**").hasRole("ADMIN")
                .antMatchers("/api/schedule").permitAll()
                .and()
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }


}
