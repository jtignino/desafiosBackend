console.log('Script products');

async function addToCart(id) {
    try {
        const res = await fetch(`api/carts/${cid}/product/${id}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ qty: 2 })
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

// function getCookie(nameCookie) {
//     // Hacer que la funcion haga un fetch a /api/sessions/current y guarde el valor del cid en el localStorage
//     const allCookies = document.cookie;

//     const cookies = allCookies.split(';');

//     for (const cookie of cookies) {
//         const [key, value] = cookie.trim().split('=');

//         if (key === nameCookie) {
//             return value;
//         }
//     }
//     return null;
// }

function getCartId(cid) {
    const allCookies = document.cookie;

    const cookies = allCookies.split(';');

    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');

        if (key === cid) {
            return value;
        }
    }
    return null;
}

const cid = getCartId('cartId');
