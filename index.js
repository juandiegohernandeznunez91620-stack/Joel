const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the views directory so individual HTML files can be opened
app.use('/views', express.static(path.join(__dirname, 'views')));
// Also serve static files from project root under the same /views mount so
// images referenced with relative filenames in the HTML (e.g. "Fondo.jpg")
// can be resolved (images are located in the project root in this repo).
app.use('/views', express.static(path.join(__dirname)));

// Root route: redirect to Sesion.html
app.get('/', (req, res) => {
	// Cambia el nombre si tu archivo tiene otro nombre exacto
	res.redirect('/views/Sesion.html');
});

// Lista de archivos HTML disponible en /list
app.get('/list', (req, res) => {
	const viewsDir = path.join(__dirname, 'views');
	fs.readdir(viewsDir, (err, files) => {
		if (err) {
			console.error('Error leyendo views:', err);
			return res.status(500).send('Error leyendo el directorio de vistas');
		}

		const htmlFiles = files.filter(f => f.toLowerCase().endsWith('.html'));

		let out = `<!doctype html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Lista de páginas HTML</title>
	<style>body{font-family:Arial,Helvetica,sans-serif;margin:24px}ul{line-height:1.6}</style>
</head>
<body>
	<h1>Archivos HTML disponibles</h1>
	<p>Haz clic en un archivo para abrirlo en una nueva pestaña.</p>
	<ul>
`;

		if (htmlFiles.length === 0) {
			out += '<li>No se encontraron archivos .html en la carpeta <code>views</code>.</li>';
		} else {
			htmlFiles.forEach(file => {
				const url = `/views/${encodeURIComponent(file)}`;
				out += `<li><a href="${url}" target="_blank" rel="noopener">${file}</a></li>`;
			});
		}

		out += `  </ul>
</body>
</html>`;

		res.send(out);
	});
});

app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
