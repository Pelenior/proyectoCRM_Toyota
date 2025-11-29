package com.crm.api;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepositorio extends JpaRepository<Administrador, Integer> {
    // Spring crea la consulta SQL automáticamente
    Optional<Administrador> findByEmail(String email);
}