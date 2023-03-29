```console
query todos {
  getProductos {
    id
    title
  }
}

query getTodosFiltro {
  getProductos(campo: "title", valor: "Vodka") {
    title
    id
  }
}

query getUno {
  getProducto(id: "f0791bbce0a6a1c7888a") {
    id
    title
  }
}

mutation crear {
  createProducto(datos: {title: "Vodka"}) {
    id
    title
  }
}

mutation updateUno {
  updateProducto(id: "d6434971a1b4b1f68d6d", datos: {title: "Whisky", price: 8000}) {
    id
    title
    price
  }
}

mutation deleteUno {
  deleteProducto(id: "f0791bbce0a6a1c7888a") {
    id
  }
}
```
![1][def]

[def]: public/forreadme/1.png

![2][def]

[def]: public/forreadme/2.png

![3][def]

[def]: public/forreadme/3.png

![4][def]

[def]: public/forreadme/4.png

![5][def]

[def]: public/forreadme/5.png

![6][def]

[def]: public/forreadme/6.png

![1][def]

[def]: public/forreadme/7.png