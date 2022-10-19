const fs = require('fs');

class Container {
  constructor() {}
  getAll = async () => {
    try {
      const archive = await fs.promises.readFile('./productos.json', 'utf-8');
      const products = JSON.parse(archive);
      return products;
    } catch (e) {
      console.log(e);
    }
  };
  save = async (newProduct) => {
    try {
      const products = await this.getAll();
      const id = products.length + 1;
      newProduct.id = id;
      products.push(newProduct);

      const productsString = JSON.stringify(products);

      await fs.promises.writeFile('./productos.json', productsString);
    } catch (e) {
      console.log(e);
    }
  };
  getById = async (id) => {
    try {
      const readData = await fs.promises.readFile('./productos.json');
      const newData = JSON.parse(readData);
      const title = newData.find((title) => title.id == id);
      if (title) {
        return title;
      } else {
        console.log('Product Not Found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (id) => {
    try {
      const readData = await fs.promises.readFile('./productos.json');
      const newData = JSON.parse(readData);
      const title = newData.find((title) => title.id == id);
      if (!title) {
        console.log('ID Doesnt exists');
      } else {
        const filteredData = newData.filter((e) => e.id != id);
        const dataJSON = JSON.stringify(filteredData);
        await fs.promises.writeFile('./productos.json', dataJSON);

        console.log('Product Deleted');
      }
    } catch (e) {
      console.log(e);
    }
  };
  deleteAll = async () => {
    try {
      await fs.promises.writeFile('./productos.json', JSON.stringify([]));
      console.log('All the products were deleted');
    } catch (e) {
      console.log(e);
    }
  };
}

async function start() {
  const container1 = new Container();
  //NEW PRODUCTS
  await container1.save({
    title: 'Champagne',
    price: 5000,
    id: 6,
  });

  await container1.save({
    title: 'Vino',
    price: 10000,
    id: 8,
  });
  //GET ALL THE PRODUCTS
  console.log(await container1.getAll());
  //GET BY ID
  console.log(await container1.getById(2));
  //DELETE BY ID
  console.log(await container1.deleteById(4));
  //DELETE ALL
  //await container1.deleteAll();
}

start();
