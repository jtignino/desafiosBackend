console.log('Forgot password.js')
const form = document.getElementById('forgotForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => {
        const stringValue = String(value);
        obj[key] = stringValue
    });

    fetch('/api/users/forgotPassword', {
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
    })
});