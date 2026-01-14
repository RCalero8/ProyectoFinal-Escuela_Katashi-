/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.karate.katash.controllers;

import com.karate.katash.entities.Curso;
import com.karate.katash.repositories.CursoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 *
 * @author ME
 */
@RestController //Indica que esto es un servicio Api
@RequestMapping("/api") //Todas las URL empiezan por /api
@CrossOrigin(origins = "*") //Permite que el VS Code se conecte sin errores de seguridad
public class CursoController {
    @Autowired //Conecta automaticamente con el repositorio
    private CursoRepository cursoRepository;
    
    // Este método responde a: http://localhost:8080/api/cursos
    @GetMapping("/cursos")
    public List<Curso> obtenerTodosLosCursos() {
        return cursoRepository.findAll();
    }
}
