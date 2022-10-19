const fs = require('fs');
const dataLeida = await fs.promises.readFile('./productos.json');
/* const dataNueva = JSON.parse(dataLeida);
const title = dataNueva.find((title) => title.id == id);
if (!title) {
  console.log('EL ID NO EXISTE GATO');
}
const dataFiltrada = dataLeida.filter((e) => e.id != id);
const dataJSON = JSON.stringify(dataFiltrada);

/* await fs.promises.writeFile('./productos.json', JSON.stringify(dataFiltrada)); */
console.log(dataLeida);
