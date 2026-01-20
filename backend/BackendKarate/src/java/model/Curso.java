/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.util.Date;

/**
 *
 * @author Rocio
 */
public class Curso {
    private int id_curso;
    private String nombre;
    private String descripcion;
    private Date f_inicio;
    private Date f_fin;
    private double precio;

    public Curso(int id_curso, String nombre, String descripcion, Date f_inicio, Date f_fin, double precio) {
        this.id_curso = id_curso;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.f_inicio = f_inicio;
        this.f_fin = f_fin;
        this.precio = precio;
    }

    public int getId_curso() {
        return id_curso;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Date getF_inicio() {
        return f_inicio;
    }

    public Date getF_fin() {
        return f_fin;
    }

    public double getPrecio() {
        return precio;
    }
}
