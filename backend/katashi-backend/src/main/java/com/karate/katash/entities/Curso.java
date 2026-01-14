/*
Clase Curso
*/
package com.karate.katash.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 *
 * @author Rocio
 */
@Entity
@Table(name = "CURSO")
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private LocalDate f_inicio;
    private LocalDate f_fin;
    private Double precio;

    public Curso() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getF_inicio() {
        return f_inicio;
    }

    public void setF_inicio(LocalDate f_inicio) {
        this.f_inicio = f_inicio;
    }

    public LocalDate getF_fin() {
        return f_fin;
    }

    public void setF_fin(LocalDate f_fin) {
        this.f_fin = f_fin;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
    
    
}
