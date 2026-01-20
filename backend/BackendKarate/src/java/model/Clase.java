/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author Rocio
 */
public class Clase {
    private int id_clase;
    private String grado;
    private int duracion_min;
    private int id_curso;

    public Clase(int id_clase, String grado, int duracion_min, int id_curso) {
        this.id_clase = id_clase;
        this.grado = grado;
        this.duracion_min = duracion_min;
        this.id_curso = id_curso;
    }

    public int getId_clase() {
        return id_clase;
    }

    public String getGrado() {
        return grado;
    }

    public int getDuracion_min() {
        return duracion_min;
    }

    public int getId_curso() {
        return id_curso;
    }
}
