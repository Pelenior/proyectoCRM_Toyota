package com.crm.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtService jwtService;
    
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private com.crm.api.Repositorio clienteRepo;
    @Autowired private com.crm.api.ChoferRepositorio choferRepo;
    @Autowired private com.crm.api.AdminRepositorio adminRepo;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        // Obtenemos el rol del usuario autenticado
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        String token = jwtService.generateToken(request.getEmail(), role); 
        return ResponseEntity.ok(new AuthResponse(token));
    }
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        String email = request.getEmail();
        Integer telefono = request.getTelefono();
        String newPass = passwordEncoder.encode(request.getNewPassword());

        // 1. Check Clients
        var cliente = clienteRepo.findByEmail(email).orElse(null);
        if (cliente != null) {
            if (cliente.getTelefono().equals(telefono)) {
                cliente.setPassword(newPass);
                clienteRepo.save(cliente);
                return ResponseEntity.ok("Contraseña de Cliente actualizada");
            }
            return ResponseEntity.status(403).body("El teléfono no coincide");
        }

        // 2. Check Chofers
        var chofer = choferRepo.findByEmail(email).orElse(null);
        if (chofer != null) {
            if (chofer.getTelefono().equals(telefono)) {
                chofer.setPassword(newPass);
                choferRepo.save(chofer);
                return ResponseEntity.ok("Contraseña de Chofer actualizada");
            }
            return ResponseEntity.status(403).body("El teléfono no coincide");
        }

        // 3. Check Admins
        var admin = adminRepo.findByEmail(email).orElse(null);
        if (admin != null) {
            if (admin.getTelefono().equals(telefono)) {
                admin.setPassword(newPass);
                adminRepo.save(admin);
                return ResponseEntity.ok("Contraseña de Admin actualizada");
            }
            return ResponseEntity.status(403).body("El teléfono no coincide");
        }

        return ResponseEntity.status(404).body("Usuario no encontrado");
    }
}

// Clases auxiliares (puedes ponerlas en archivos separados si prefieres)
class LoginRequest {
    private String email;
    private String password;
    // Getters y Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class AuthResponse {
    private String token;
    public AuthResponse(String token) { this.token = token; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}

class ResetPasswordRequest {
    private String email;
    private Integer telefono;
    private String newPassword;

    // Getters
    public String getEmail() { return email; }
    public Integer getTelefono() { return telefono; }
    public String getNewPassword() { return newPassword; }
}