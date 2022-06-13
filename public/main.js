const socket = io()

const sendMessage = () => {
    const email = document.querySelector("#email").value;
    const text = document.querySelector("#message").value;
    const date = new Date();
    const timeStamp = `${date.getDate() < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1)}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + (date.getHours()) : (date.getHours())}:${date.getMinutes() < 10 ? '0' + (date.getMinutes()) : (date.getMinutes())}:${date.getSeconds() < 10 ? '0' + (date.getSeconds()) : (date.getSeconds())}`
    const message = {email, text, timeStamp};
    console.log("mensaje:",message);
    socket.emit("new_message", message);
    return false
}

const sendProduct = () => {
    const name = document.querySelector('#name').value;
    const code = document.querySelector("#code").value;
    const description = document.querySelector("#description").value;
    const price = document.querySelector('#price').value;
    const stock = document.querySelector('#stock').value;
    const thumbnail = document.querySelector('#thumbnail').value;
    const product = {name, code, price, thumbnail}
    socket.emit("new_product", product);
    return false
}

const createTagMessage = (message) => {
    const {email, text, timeStamp} = message;
    return (`
        <p><span class="email">${email}</span><span class="date">${timeStamp} :</span><span class="text">${text}</span></p>
    `)
}

const createTagProduct = (product) => {
    const {name, price, thumbnail} = product;
    return(`
    <tr class="d-flex justify-content-between">
        <td style="margin-bottom: 20px; width:33.3%">${name}</td>
        <td style="margin-bottom: 20px; width:33.3%">${price}</td>
        <td style="margin-bottom: 20px; width:33.3%"><img src="${thumbnail}" alt="${name}" height="150" width="200"></td>
    </tr>
    `)
}

const addMessage = (messages) => {
    const finalMessage = messages.map(message => createTagMessage(message)).join(" ");
    const messageContainer = document.querySelector("#messagesContainer")
    if (messageContainer) messageContainer.innerHTML = finalMessage
}

const addProduct = (products) => {
    const allProducts = products.map(product => createTagProduct(product)).join(" ");
    const productContainer = document.querySelector("#productContainer");
    if (productContainer) productContainer.innerHTML = allProducts;
}


socket.on('messages', (messages) => addMessage(messages));
socket.on("products", (products) => addProduct(products))