package com.crm.api;

import org.springframework.data.jpa.repository.JpaRepository;

//Hereda las funcionalidades CRUD básicas: findAll, findById, save, delete
public interface Repositorio extends JpaRepository<Cliente, Integer> {
 // El primer parámetro es la Entidad (Cliente) y el segundo es el tipo de la clave primaria (Integer)
}