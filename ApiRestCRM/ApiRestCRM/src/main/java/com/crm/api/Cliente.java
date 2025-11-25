package com.crm.api;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity // Representa la tabla en la base de datos
@Table(name = "clientes") // Nombre específico de la tabla
public class Cliente {

 @Id // Marca 'id' como la clave primaria
 @GeneratedValue(strategy = GenerationType.IDENTITY) // Indica que el valor es auto-incrementado por la DB
 private Integer id; // Usamos Integer ya que en el SQL es INT

 private String nombre;
 private String email;
 private Integer telefono; 


 public Cliente() {
 }

 
 // Getters y Setters
 public String getNombre() {
	return nombre;
}

public void setNombre(String nombre) {
	this.nombre = nombre;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public Integer getTelefono() {
	return telefono;
}

public void setTelefono(Integer telefono) {
	this.telefono = telefono;
}

 public Integer getId() {
     return id;
 }
 
 public void setId(Integer id) {
     this.id = id;
 }
}