package com.crm.api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, 
	                                               JwtAuthenticationFilter jwtAuthFilter, 
	                                               AuthenticationProvider authProvider) throws Exception {
	    http
	        .csrf(csrf -> csrf.disable())
	        .cors(Customizer.withDefaults())
	        .authorizeHttpRequests(auth -> auth
	            // FIX: Allow the "Handshake" (OPTIONS) requests globally
	            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	            
	            .requestMatchers("/api/auth/**").permitAll()
	            .requestMatchers(HttpMethod.POST, "/api/clientes").permitAll()
	            .anyRequest().authenticated()
	        )
	        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        .authenticationProvider(authProvider)
	        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}
    
    @Bean
    public AuthenticationProvider authenticationProvider(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        
        // 1. Usamos el constructor que solo pide UserDetailsService (según tu código fuente)
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        
        // 2. Usamos el SETTER para pasar el PasswordEncoder
        authProvider.setPasswordEncoder(passwordEncoder);
        
        return authProvider;
    }

    // Definimos el filtro como un Bean aquí para tener control total
    // IMPORTANTE: Asegúrate de quitar @Component de la clase JwtAuthenticationFilter
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        return new JwtAuthenticationFilter(jwtService, userDetailsService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 1. Allow your frontend origin
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        
        // 2. Allow ALL methods (GET, POST, PUT, DELETE, OPTIONS, etc.)
        configuration.setAllowedMethods(List.of("*"));
        
        // 3. Allow ALL headers (This fixes the 403 on POST)
        configuration.setAllowedHeaders(List.of("*"));
        
        // 4. Allow credentials (optional, but good for stability)
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}