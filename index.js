const fs = require('fs');
const path = require('path');

/**
 * Ruta absoluta del archivo de entrada desde el cual se generarán las modificaciones.
 * @type {string}
 */
const inputFilePath = `C:\\Users\\Ricardo A Landinez\\Downloads\\NuevosDocumentos\\DocumentoPruebaMasivaEsdinamicoAEsdinamico.txt`;

/**
 * Ruta absoluta del directorio donde se guardarán los archivos modificados.
 * @type {string}
 */
const outputDirectoryPath = `C:\\Users\\Ricardo A Landinez\\Downloads\\NuevosDocumentos\\DocumentosModificados`;

// Crear el directorio de salida si no existe
if (!fs.existsSync(outputDirectoryPath)) {
  fs.mkdirSync(outputDirectoryPath);
}

/**
 * Lee un archivo de entrada, modifica su contenido incrementando un número en una cadena específica,
 * y genera 1000 archivos nuevos con el contenido modificado.
 */
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Generar 1000 archivos modificados
  for (let i = 1; i <= 1000; i++) {
    // Descompone el contenido del archivo en líneas, las modifica si es necesario, y luego las recompone
    let lines = data.split('\n');
    lines = lines.map((line) => {
      if (line.startsWith('01|')) {
        const parts = line.split('|');
        if (parts[3].startsWith('SETP')) {
          const prefix = parts[3].substring(0, 4); // 'SETP'
          const number = parseInt(parts[3].substring(4), 10) + i; // Incrementa el número según el índice del bucle
          parts[3] = prefix + number.toString(); // Reconstruye la parte con el nuevo número
        }
        return parts.join('|');
      } else {
        return line;
      }
    });

    const modifiedData = lines.join('\n');
    const newFilePath = path.join(outputDirectoryPath, `DocumentoModificado_${i}.txt`);

    // Escribir cada archivo modificado en el sistema de archivos
    fs.writeFile(newFilePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error al escribir el archivo ${i}:`, err);
      }
    });
  }

  console.log('Todos los archivos han sido creados.');
});
