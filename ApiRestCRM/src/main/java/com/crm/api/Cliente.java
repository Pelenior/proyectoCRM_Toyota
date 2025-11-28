package com.crm.api;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity // Representa la tabla en la base de datos
@Table(name = "clientes") // Nombre específico de la tabla
public class Cliente {

 @Id // Marca 'id' como la clave primaria
 @GeneratedValue(strategy = GenerationType.IDENTITY) // Indica que el valor es auto-incrementado por la DB
 private Integer id; // Usamos Integer ya que en el SQL es INT

 private String nombre;
 private String email;
 private Integer telefono; 
 
 @Column(name = "id_chofer")
 private Integer idChofer;

 @JsonIgnore
 private String password;
 private String rol;
 

 public Cliente() {
 }


 
 // Getters y Setters
public String getPassword() { return password; }
public void setPassword(String password) { this.password = password; }
public String getRol() { return rol; }
public void setRol(String rol) { this.rol = rol; }

public Integer getIdChofer() { return idChofer; }
public void setIdChofer(Integer idChofer) { this.idChofer = idChofer; }
 
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