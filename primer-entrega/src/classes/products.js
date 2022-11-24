class Product {
  constructor(name, description,code, thumbnail, price, stock) {
    this.timestampo = new Date().toLocaleString();
    this.name = name || '';
    this.description = description || '';
    this.code = code || '';
    this.thumbnail = thumbnail || '';
    this.price = price || '';
    this.stock = stock || '';
  }
}
module.exports = Product;
