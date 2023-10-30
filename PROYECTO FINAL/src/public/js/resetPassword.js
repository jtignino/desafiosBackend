console.log('Reset password.js')
const form = document.getElementById('resetForm');

const url = new URL(window.location.href);
const email = url.searchParams.get('email');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => {
        const stringValue = String(value);
        obj[key] = stringValue
    });

    fetch(`/api/users/resetPassword?email=${email}`, {
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
        if (result.error.includes("jwt expired")) {
            window.location.replace('/forgotPassword')
        }        
    })
});