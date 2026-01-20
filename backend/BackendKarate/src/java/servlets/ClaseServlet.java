/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import org.json.JSONArray;
import org.json.JSONObject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.*;
import utils.Database;

/**
 * Servlet que gestiona la información de las clases (horarios y duraciones)
 * @author Rocio
 */
@WebServlet(name = "ClaseServlet", urlPatterns = {"/api/clases"})
public class ClaseServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Permitir acceso desde el frontend (CORS)
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json");

        // Consulta para obtener los datos de la tabla CLASE
        String sql = "SELECT id_clase, grado, duracion_min, id_curso FROM CLASE";

        try (Connection conn = Database.getConnection(); 
             Statement stmt = conn.createStatement(); 
             ResultSet rs = stmt.executeQuery(sql)) {

            JSONArray jsonArray = new JSONArray();

            while (rs.next()) {
                JSONObject obj = new JSONObject();
                // id_curso es la clave para unir con el CursoServlet en JavaScript
                obj.put("id_curso", rs.getInt("id_curso"));
                // El campo 'grado' se usa como horario en el diseño
                obj.put("grado", rs.getString("grado"));
                obj.put("id_clase", rs.getInt("id_clase"));
                obj.put("duracion_min", rs.getInt("duracion_min"));
                
                jsonArray.put(obj);
            }

            // Enviamos el JSON al frontend
            response.getWriter().print(jsonArray.toString());

        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            response.getWriter().print("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}