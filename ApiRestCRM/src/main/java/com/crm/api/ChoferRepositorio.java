package com.crm.api;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ChoferRepositorio extends JpaRepository<Chofer, Integer> {
    Optional<Chofer> findByEmail(String email);
}