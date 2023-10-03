console.log('Script products');
const cid = '646721713b94cbd0e0df8ad1';

async function addToCart(id) {
    try {
        const res = await fetch(`api/carts/${cid}/product/${id}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ qty: 11 })
        });

        const response = await res.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

function logout() {
    try {
        console.log('click en el boton')
        fetch('/logout').then(resp => window.location.replace(`${resp.url}`))
        // fetch('/logout').then(resp => window.location.replace('/login'))
        console.log('despues del fetch')

    } catch (error) {
        console.log(error);
    }
}