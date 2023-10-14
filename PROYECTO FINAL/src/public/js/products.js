console.log('Script products');
let cid;

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
        fetch('/logout').then(resp => window.location.replace(`${resp.url}`));
    } catch (error) {
        console.log(error);
    }
}

async function getCartId() {
    try {
        if (localStorage.getItem('cid')) {
            return localStorage.getItem('cid');
        } else {
            const res = await fetch('/api/sessions/current')
            const userData = await res.json();

            if (userData.data.role !== 'admin') {
                console.log(userData.data.cart);
                localStorage.setItem('cid', userData.data.cart);
                console.log('Valor "cid" guardado en localStorage:', userData.data.cart);
            }
        }
    } catch (error) {
        console.log(error)
    }

}

getCartId().then(res => { cid = res });

