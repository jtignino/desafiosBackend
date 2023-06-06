const formRegister = document.getElementById("formRegister");
formRegister.addEventListener('submit', async e => {

    e.preventDefault()

    const datos = {
        name: formRegister[0].value,
        email: formRegister[1].value,
        password: formRegister[2].value,
    }
    console.log("DATOS");
    console.log(datos);

    const respuesta = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    const content = await respuesta.json();

    console.log(content);

    const { access_token } = content;

    if (access_token) {
        localStorage.setItem("access_token", access_token);
        location.href = '/'
    } else {
        location.href = '/register.html'
    }
})

/*
const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => {
        const stringValue = String(value);
        obj[key] = stringValue
    });

    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/products');
        }
    });
})

*/