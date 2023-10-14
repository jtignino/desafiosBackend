const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => {
        const stringValue = String(value);
        obj[key] = stringValue
    });

    fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.status !== 200) return res.json();
        else window.location.replace('/login');
    })
    .then(result => {
        console.log(result)
        // if (result.data?.accessToken) {
        //     console.log(result.data.accessToken)
        //     // window.location.replace('/products');
        // }
    })
})
