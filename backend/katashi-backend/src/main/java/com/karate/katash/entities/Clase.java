/*
Clase Clase
*/
package com.karate.katash.entities;

import jakarta.persistence.*;

/**
 *
 * @author Rocio
 */
@Entity
@Table(name = "CLASE")
public class Clase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String grado;
    @Column(name = "DURACION_MIN")
    private Integer duracion_min;
    @Column(name = "ID_CURSO")
    private Long idCurso;
    
    public Clase() {
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGrado() {
        return grado;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }

    public Integer getDuracion_min() {
        return duracion_min;
    }

    public void setDuracion_min(Integer duracion_min) {
        this.duracion_min = duracion_min;
    }

    public Long getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(Long idCurso) {
        this.idCurso = idCurso;
    }

   
}
