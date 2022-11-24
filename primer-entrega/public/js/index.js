const socket = io();

socket.on("connect", () => {
    console.log("me conecte!");
});
const sendMsg = () => {
    const emailBox = document.getElementById("emailBox").value;
    const msgBox = document.getElementById("msgBox").value;
    socket.emit("msg", { email: emailBox, msg: msgBox });
    return false;
};
const send = () => {
    const productTitle = document.getElementById("title").value;
    const productPrice = document.getElementById("price").value;
    const productThumbnail = document.getElementById("thumbnail").value;
    socket.emit("productsData", {
        title: productTitle,
        price: productPrice,
        thumbnail: productThumbnail,
    });
    return false;
};

socket.on("product-list", (data) => {
    console.log(data);
    let html = " ";
    data.forEach((product) => {
        html += `
        <div class="card" style="width: 18rem;">
            <img src="${product.thumbnail}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">
                 ${product.price}$
                </p>
            </div>
        </div>;
        `;
    });
    document.getElementById("product-list").innerHTML = html;
});
socket.on("msg-list", (data) => {
    let html = " ";
    data.forEach((msg) => {
        html += `
            <div>
                ${msg.email} (${msg.timestamp}) said: ${msg.msg}
            </div>
        `;
    });
    document.getElementById("div-chats").innerHTML = html;
});