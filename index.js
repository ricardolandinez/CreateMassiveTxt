const fs = require('fs');
const path = require('path');

// Asumiendo que tienes una ruta específica para el archivo de entrada
const inputFilePath = `C:\\Users\\Ricardo A Landinez\\Downloads\\NuevosDocumentos\\DocumentoPruebaMasivaEsdinamicoAEsdinamico.txt`;
// Y una ruta específica para guardar los archivos modificados
const outputDirectoryPath = `C:\\Users\\Ricardo A Landinez\\Downloads\\NuevosDocumentos\\DocumentosModificados`;

// Crear el directorio de salida si no existe
if (!fs.existsSync(outputDirectoryPath)) {
  fs.mkdirSync(outputDirectoryPath);
}

// Leer el archivo de entrada
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Generar 1000 archivos modificados
  for (let i = 1; i <= 1000; i++) {
    // Proceso similar al anterior, pero con un incremento por cada archivo
    let lines = data.split('\n');
    lines = lines.map((line) => {
      if (line.startsWith('01|')) {
        const parts = line.split('|');
        if (parts[3].startsWith('SETP')) {
          const prefix = parts[3].substring(0, 4); // 'SETP'
          const number = parseInt(parts[3].substring(4), 10) + i; // Incrementa el número según el índice del bucle
          parts[3] = prefix + number; // Reconstruye la parte con el nuevo número
        }
        return parts.join('|');
      } else {
        return line;
      }
    });

    const modifiedData = lines.join('\n');
    const newFilePath = path.join(outputDirectoryPath, `DocumentoModificado_${i}.txt`);

    // Escribir cada archivo modificado
    fs.writeFile(newFilePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error al escribir el archivo ${i}:`, err);
      }
    });
  }

  console.log('Todos los archivos han sido creados.');
});
