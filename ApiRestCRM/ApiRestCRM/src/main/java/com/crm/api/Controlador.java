package com.crm.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin; 
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200", methods = {
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.DELETE,
    RequestMethod.OPTIONS
})
public class Controlador {

 @Autowired // Inyección de Dependencias: Spring crea e inserta la instancia del Repositorio
 private Repositorio clienteRepositorio;

 // Endpoint para GET http://localhost:8080/api/clientes
 @GetMapping 
 public List<Cliente> getAllClientes() {
     // Usa el método findAll() heredado del JpaRepository
     return clienteRepositorio.findAll();
 }
 @PostMapping
 @ResponseStatus(HttpStatus.CREATED) // Devuelve el código HTTP 201
 public Cliente createCliente(@RequestBody Cliente cliente) {
	 return clienteRepositorio.save(cliente);
 }
}