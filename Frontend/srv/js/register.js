// Debes incluir la librería md5 en tu proyecto, por ejemplo usando CDN en tu HTML:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.19.0/js/md5.min.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value;

        // Encriptar la contraseña usando md5
        const contrasenaEncriptada = md5(contrasena);

        const datos = {
            nombre,
            correo,
            contrasena: contrasenaEncriptada
        };

        try {
            const respuesta = await fetch('/api/registro', {
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