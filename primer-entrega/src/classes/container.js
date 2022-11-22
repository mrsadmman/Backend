const fs = require('fs');

class Container {
  constructor() {}
  getAll = async () => {
    try {
      const archive = await fs.promises.readFile('./src/products.json', 'utf-8');
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

      await fs.promises.writeFile('./src/products.json', productsString);
    } catch (e) {
      console.log(e);
    }
  };
  getById = async (id) => {
    try {
      const readData = await fs.promises.readFile('./src/products.json');
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
      const readData = await fs.promises.readFile('./src/products.json');
      const newData = JSON.parse(readData);
      const title = newData.find((title) => title.id == id);
      if (!title) {
        console.log('ID Doesnt exists');
      } else {
        const filteredData = newData.filter((e) => e.id != id);
        const dataJSON = JSON.stringify(filteredData);
        await fs.promises.writeFile('./src/products.json', dataJSON);

        console.log('Product Deleted');
      }
    } catch (e) {
      console.log(e);
    }
  };
  deleteAll = async () => {
    try {
      await fs.promises.writeFile('./src/products.json', JSON.stringify([]));
      console.log('All the products were deleted');
    } catch (e) {
      console.log(e);
    }
  };
  update(element) {
    try {
      let one = this.elements.find((el) => el.id == element.id);
      // console.log(one)
      let newElement = { ...one, ...element };

      let index = this.elements.findIndex((el, ind) => {
        if (el.id == newElement.id) {
          return true;
        }
      });
      this.elements[index] = newElement;

      fs.promises
        .writeFile(this.name, JSON.stringify(this.elements, null, '\t'))
        .then(() => console.log('Actualizado'))
        .catch((e) => console.log(e));

      return { response: 'Actualizado', element: newElement };
    } catch (error) {
      console.log(error);
      return { response: 'Error!', error };
    }
  }
  updateById = async (id, title, price, thumbnail) => {
    try {
      const products = await this.getAll();
      const item = products.find((prod) => prod.id === Number(id));
      if (item) {
        item.title = title;
        item.price = price;
        item.thumbnail = thumbnail;
        console.log(item);
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return item;
      } else {
        return { error: 'Product not found' };
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}
module.exports = Container;
