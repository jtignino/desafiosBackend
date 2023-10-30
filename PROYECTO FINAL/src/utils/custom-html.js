const loginNotification = `

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notificación de inicio de sesión</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .notification {
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 20px;
      max-width: 400px;
      text-align: center;
    }

    .notification h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .notification p {
      color: #777;
    }

    .btn {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #0056b3;
    }
  
  </style>
</head>
  
<body>
  <div class="notification">
    <h2>Inicio de Sesión Exitoso</h2>
    <p>Bienvenido/a nuestro sitio web. Tu sesión ha sido iniciada correctamente.</p>
  </div>
</body>
</html>
`

const forgotPasswordEmail = (userEmail) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solicitud para restablecer contraseña</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: left;
      align-items: start;
      height: 100vh;
    }

    .notification {
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 20px;
      max-width: 400px;
    }

    .notification h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .notification p {
      margin-bottom: 20px;
      color: #777;
    }

    .btn {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #0056b3;
    }
  
  </style>
  </head>
  
  <body>
    <div class="notification">
      <h2>Restablecer contraseña</h2>
      <p>Hemos recibido una solicitud para restablecer su contraseña. Este vínculo caducará en 60 minutos.</p>
      <a href="https://localhost:8080/resetPassword?email=${userEmail}" class="btn">Click aquí para restablecer la contraseña</a>

    </div>
  </body>
  </html>
  `
}



const resetPasswordEmail = `

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alerta de seguridad: cambió la contraseña de su cuenta</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: left;
      align-items: start;
      height: 100vh;
    }

    .notification {
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 20px;
      max-width: 400px;
    }

    .notification h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .notification p {
      margin-bottom: 20px;
      color: #777;
    }

    .btn {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #0056b3;
    }
  
  </style>
</head>
  
<body>
  <div class="notification">
    <h2>Su contraseña ha cambiado</h2>
    <p>Su contraseña ha sido modificada.</p>
  </div>
</body>
</html>
`

export {
  loginNotification,
  forgotPasswordEmail,
  resetPasswordEmail
}