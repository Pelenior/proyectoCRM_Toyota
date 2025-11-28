package com.crm.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired private Repositorio clienteRepo;
    @Autowired private ChoferRepositorio choferRepo; 
    @Autowired private AdminRepositorio adminRepo; 

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        // 1. Buscar en Administradores (Eficiente)
        var admin = adminRepo.findByEmail(email).orElse(null);
        if (admin != null) {
             return new User(admin.getEmail(), admin.getPassword(), Collections.singletonList(new SimpleGrantedAuthority(admin.getRol())));
        }

        // 2. Buscar en Choferes
        var chofer = choferRepo.findByEmail(email).orElse(null);
        if (chofer != null) {
             return new User(chofer.getEmail(), chofer.getPassword(), Collections.singletonList(new SimpleGrantedAuthority(chofer.getRol())));
        }

        // 3. Buscar en Clientes
        var cliente = clienteRepo.findByEmail(email).orElse(null);
        if (cliente != null) {
            return new User(cliente.getEmail(), cliente.getPassword(), Collections.singletonList(new SimpleGrantedAuthority(cliente.getRol())));
        }

        throw new UsernameNotFoundException("Usuario no encontrado con email: " + email);
    }
}