<?php
$servername = "localhost";
$username = "root"; // Usa tu usuario de MySQL
$password = ""; // Usa tu contraseña de MySQL
$dbname = "kindergarten";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (isset($_GET['curp'])) {
    $curp = $_GET['curp'];

    // Buscar el alumno por CURP
    $sql = "SELECT * FROM estudiantes WHERE curp = '$curp'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<h2>Datos del Alumno</h2>";
        echo "<p><strong>CURP:</strong> " . $row['curp'] . "</p>";
        echo "<p><strong>Acta de Nacimiento:</strong> <a href='uploads/" . $row['acta_nacimiento'] . "' target='_blank'>Ver Acta</a></p>";
        echo "<p><strong>Foto del Alumno:</strong><br><img src='uploads/" . $row['foto_alumno'] . "' width='150'></p>";
        echo "<p><strong>Foto del Tutor:</strong><br><img src='uploads/" . $row['foto_tutor'] . "' width='150'></p>";
    } else {
        echo "No se encontraron registros para esa CURP.";
    }

    $conn->close();
}
?>
