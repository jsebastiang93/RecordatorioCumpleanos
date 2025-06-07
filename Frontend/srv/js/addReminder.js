document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAddReminder');
    const mensaje = document.getElementById('mensaje');
    const usuario = localStorage.getItem('usuario');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!usuario) {
            mensaje.textContent = 'No hay usuario logueado.';
            mensaje.style.color = 'red';
            return;
        }

        const nombreContacto = document.getElementById('nombreContacto').value.trim();
        const fechaCumpleanos = document.getElementById('fechaCumpleanos').value;
        const nota = document.getElementById('nota').value.trim();

        const datos = {
            usuario,
            nombreContacto,
            fechaCumpleanos,
            nota
        };

        try {
            const respuesta = await fetch('https://backend-recordatoriocumpleanos.onrender.com/api/newReminder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                mensaje.textContent = '¡Recordatorio agregado correctamente!';
                mensaje.style.color = 'green';
                form.reset();
            } else {
                mensaje.textContent = resultado.mensaje || 'No se pudo agregar el recordatorio';
                mensaje.style.color = 'red';
            }
        } catch (err) {
            mensaje.textContent = 'Error de conexión con el servidor';
            mensaje.style.color = 'red';
        }
    });
});
