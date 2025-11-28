package com.crm.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/choferes")
public class ChoferController {

    @Autowired
    private ChoferRepositorio choferRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Chofer> getAllChoferes() {
        return choferRepo.findAll();
    }

    // POST: Create a new Chofer
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ADMIN')")
    public Chofer createChofer(@RequestBody Chofer chofer) {
        // 1. Encrypt Password
        String passEncriptada = passwordEncoder.encode(chofer.getPassword());
        chofer.setPassword(passEncriptada);

        // 2. Force Role to CHOFER
        chofer.setRol("CHOFER");

        return choferRepo.save(chofer);
    }

    // DELETE: Delete a Chofer
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')") 
    public void deleteChofer(@PathVariable Integer id) {
        choferRepo.deleteById(id);
    }
}