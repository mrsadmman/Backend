const socket = io();


function sendMsg() {
  const msgParaEnvio = document.getElementById('inputMsg').value;
  const email = document.getElementById('input-email').value;
  socket.emit('msg', { email: email, mensaje: msgParaEnvio });
  return false;
}


socket.on('msg-list', (data) => {
  console.log(`msg-list: ${data}`);
  let html = '';
  data.forEach((item) => {
    html += `
        <div class="msj-container" >
        <p class="p-email">${item.timestamp} ${item.email} says: <br> <span> ${item.mensaje}</span> </p>
        </div> 
        `;
  });
  document.getElementById('mgs-area').innerHTML = html;
});


function postProduct() {
  const nombreProducto = document.getElementById('nombreProducto').value;
  const precioProducto = document.getElementById('precioProducto').value;
  const urlProducto = document.getElementById('urlProducto').value;
  socket.emit('product', { name: nombreProducto, price: precioProducto, thumbnail: urlProducto });
  return false;
}

socket.on('product-list', (data) => {
  console.log('product-list:' + data);
  let html = '';
  data.forEach((item) => {
    html += `
        <div class="products-card">
            <img src="${item.thumbnail}" class="product-img"/>
            <p>ID: ${item.id}</p>
            <p>Producto: ${item.nombre}</p>
            <p>Precio: $ ${item.precio}</p>
        </div>
        `;
  });
  document.getElementById('productsContainer').innerHTML = html;
});

document.getElementById('myAnchor').addEventListener('click', function (event) {
  event.preventDefault();
});
