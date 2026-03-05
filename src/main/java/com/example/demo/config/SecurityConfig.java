package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Tắt CSRF để Postman gửi POST được
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated() // Mọi request đều phải có tài khoản
                )
                .httpBasic(Customizer.withDefaults()); // Kích hoạt Basic Auth chuẩn

        return http.build();
    }
}