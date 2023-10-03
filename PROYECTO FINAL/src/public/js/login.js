console.log('Login.js')
const form = document.getElementById('loginForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => {
        const stringValue = String(value);
        obj[key] = stringValue
    });

    fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // .then(res => {

    //     if (res.status === 200) {
    //         window.location.replace('/products');
    //     } 
    //     res.json()
    // })
    .then(res => {
        if (res.status !== 200) return res.json();
        else window.location.replace('/products');
    })
    .then(result => {
        console.log(result)
        // if (result.data?.accessToken) {
        //     console.log(result.data.accessToken)
        //     // window.location.replace('/products');
        // }
    })
});