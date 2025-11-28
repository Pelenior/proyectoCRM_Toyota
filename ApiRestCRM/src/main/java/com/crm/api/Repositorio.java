package com.crm.api;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface Repositorio extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByEmail(String email);
    List<Cliente> findByIdChofer(Integer idChofer);
}