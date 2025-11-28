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
//@CrossOrigin(origins = "http://localhost:4200") 
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
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"));
        boolean isChofer = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("CHOFER"));

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
    @PreAuthorize("hasAuthority('ADMIN')") 
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
    
    // POST: Assign the least busy chofer to the current client
    @PostMapping("/contratar")
    public Cliente contratarChofer(Authentication authentication) {
        String email = authentication.getName();
        
        // 1. Get the current logged-in client
        Cliente currentClient = clienteRepositorio.findAll().stream()
                .filter(c -> c.getEmail().equals(email))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        // 1.5 NEW: STOP if they already have a driver
        if (currentClient.getIdChofer() != null) {
            // Already has a driver? Return immediately without changing anything
            return currentClient; 
            // OR: throw new RuntimeException("Ya tienes un chofer asignado");
        }

        // 2. Get all drivers
        List<Chofer> allChoferes = choferRepo.findAll();
        if (allChoferes.isEmpty()) {
            throw new RuntimeException("No hay choferes disponibles");
        }

        // 3. Get all clients (to count assignments)
        List<Cliente> allClientes = clienteRepositorio.findAll();

        // 4. Algorithm: Find the chofer with the MINIMUM count of clients
        Chofer bestChofer = null;
        int minClients = Integer.MAX_VALUE;

        for (Chofer chofer : allChoferes) {
            long count = allClientes.stream()
                    .filter(c -> chofer.getId().equals(c.getIdChofer()))
                    .count();
            
            if (count < minClients) {
                minClients = (int) count;
                bestChofer = chofer;
            }
        }

        // 5. Assign and Save
        if (bestChofer != null) {
            currentClient.setIdChofer(bestChofer.getId());
            return clienteRepositorio.save(currentClient);
        }
        
        return currentClient;
    }
    
    @PostMapping("/despedir")
    public Cliente despedirChofer(Authentication authentication) {
        String email = authentication.getName();
        
        // 1. Get current client
        Cliente currentClient = clienteRepositorio.findAll().stream()
                .filter(c -> c.getEmail().equals(email))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        // 2. Set Chofer to NULL
        currentClient.setIdChofer(null);
        
        // 3. Save and Return
        return clienteRepositorio.save(currentClient);
    }
        
}