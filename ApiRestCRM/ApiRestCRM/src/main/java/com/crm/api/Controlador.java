package com.crm.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController // Indica que esta clase maneja peticiones REST y devuelve JSON/XML
@RequestMapping("/api/clientes") // Define la ruta base para todos los endpoints en esta clase
public class Controlador {

 @Autowired // Inyección de Dependencias: Spring crea e inserta la instancia del Repositorio
 private Repositorio clienteRepositorio;

 // Endpoint para GET http://localhost:8080/api/clientes
 @GetMapping 
 public List<Cliente> getAllClientes() {
     // Usa el método findAll() heredado del JpaRepository
     return clienteRepositorio.findAll();
 }
}