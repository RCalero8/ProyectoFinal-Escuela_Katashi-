<?php
// Cabeceras para que React (Vite) no de error de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

$host = "localhost";
$user = "root";
$pass = ""; // En Ubuntu suele ser "root" o vacío
$db   = "trabajo_final";

$conexion = mysqli_connect($host, $user, $pass, $db);

if (!$conexion) {
    echo json_encode(["error" => "No se pudo conectar a MySQL"]);
    exit;
}
?>