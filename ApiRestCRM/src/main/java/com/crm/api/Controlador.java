package com.crm.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
// CORS debe configurarse globalmente en SecurityConfig, pero mantenemos esto por si acaso
@CrossOrigin(origins = "http://localhost:4200") 
public class Controlador {

    @Autowired 
    private Repositorio clienteRepositorio;
    
    @Autowired 
    private ChoferRepositorio choferRepo; // Ahora funcionará porque creamos la interfaz
    
    @Autowired 
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Cliente> getAllClientes(Authentication authentication) {
        String email = authentication.getName();
        
        // Helpers para saber el rol
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boolean isChofer = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_CHOFER"));

        if (isAdmin) {
            return clienteRepositorio.findAll();
        } else if (isChofer) {
            // 1. Buscamos el ID del chofer logueado usando su email
            var chofer = choferRepo.findAll().stream()
                .filter(c -> c.getEmail().equals(email)).findFirst().orElse(null);
            
            if (chofer != null) {
                // 2. Devolvemos clientes que tengan ese id_chofer
                return clienteRepositorio.findAll().stream()
                    .filter(c -> chofer.getId().equals(c.getIdChofer()))
                    .toList();
            }
            return List.of();
        } else {
            // Es CLIENTE, solo ve sus propios datos
             return clienteRepositorio.findAll().stream()
                .filter(c -> c.getEmail().equals(email))
                .toList();
        }
    }

    // DELETE: Admin borra cualquiera. 
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Solo Admin puede borrar libremente
    public void deleteCliente(@PathVariable Integer id) {
        clienteRepositorio.deleteById(id);
    }
    
    // POST: Crear cliente con contraseña encriptada
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente createCliente(@RequestBody Cliente cliente) {
         // Encriptamos la contraseña antes de guardar
         String passEncriptada = passwordEncoder.encode(cliente.getPassword());
         cliente.setPassword(passEncriptada);
         
         // Asignamos rol por defecto si no viene
         if(cliente.getRol() == null) cliente.setRol("ROLE_CLIENTE");
         
         return clienteRepositorio.save(cliente);
    }
}