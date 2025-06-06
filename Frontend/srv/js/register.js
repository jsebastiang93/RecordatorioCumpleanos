
// Función para registrar un nuevo usuario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value;
        
        // Obtener el user a partir del correo (antes del @)
        const user = correo.split('@')[0];

        // Encriptar la contraseña usando md5
        const contrasenaEncriptada = md5(contrasena);

        const datos = {
            user,
            nombre,
            correo,
            contrasena: contrasenaEncriptada
        };

        try {
            const respuesta = await fetch('https://backend-recordatoriocumpleanos.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            if (respuesta.ok) {
                alert('¡Registro exitoso!');
                form.reset();
            } else {
                const error = await respuesta.json();
                alert('Error: ' + (error.mensaje || 'No se pudo registrar'));
            }
        } catch (err) {
            alert('Error de conexión');
        }
    });
});