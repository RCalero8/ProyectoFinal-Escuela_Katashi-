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
import java.util.ArrayList;
import java.util.List;
import model.Curso;
import utils.Database;

/**
 *
 * @author ME
 */
@WebServlet(name = "CursoServlet", urlPatterns = {"/api/cursos"})
public class CursoServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Añade esto en ClaseServlet y CursoServlet
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json");

        try (Connection conn = Database.getConnection(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery("SELECT * FROM CURSO")) {

            List<Curso> cursos = new ArrayList<>();
            while (rs.next()) {
                cursos.add(new Curso(
                        rs.getInt("id_curso"),
                        rs.getString("nombre"),
                        rs.getString("descripcion"),
                        rs.getDate("f_inicio"),
                        rs.getDate("f_fin"),
                        rs.getDouble("precio")
                ));
            }

            JSONArray jsonArray = new JSONArray();
            for (Curso c : cursos) {
                JSONObject obj = new JSONObject();
                obj.put("id_curso", c.getId_curso());
                obj.put("nombre", c.getNombre());
                obj.put("descripcion", c.getDescripcion());
                obj.put("f_inicio", c.getF_inicio());
                obj.put("f_fin", c.getF_fin());
                obj.put("precio", c.getPrecio());
                jsonArray.put(obj);
            }

            response.getWriter().print(jsonArray.toString());

        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            response.getWriter().print("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}
