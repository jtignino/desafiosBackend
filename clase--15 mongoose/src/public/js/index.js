const socket = io();

const form = document.getElementById('form');
const container = document.getElementById('container');

socket.on('showProducts', data => {
    container.innerHTML = '';

    data.forEach( prod => {
        container.innerHTML += `
        <ul>
            <li>Título: ${prod.title}</li>
            <li>Descripción: ${prod.description}</li>
            <li>Precio: ${prod.price}</li>
            <li>Código: ${prod.code}</li>
            <li>Status: ${prod.status}</li>
            <li>Stock: ${prod.stock}</li>
            <li>Categoría: ${prod.category}</li>
            <li>Id: ${prod.id}</li>
            <hr>
        </ul>
        `
    });
});