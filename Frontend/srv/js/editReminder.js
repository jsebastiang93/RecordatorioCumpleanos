document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('formEditReminder');
    const mensaje = document.getElementById('mensaje');
    const usuario = localStorage.getItem('usuario');

    // Obtener parámetros de la URL (id del recordatorio)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Cargar datos actuales del recordatorio
    async function cargarDatos() {
        if (!usuario || !id) {
            mensaje.textContent = 'No hay usuario o recordatorio seleccionado.';
            mensaje.style.color = 'red';
            return;
        }
        try {
            const respuesta = await fetch(`http://localhost:3000/api/listReminders/${usuario}`);
            const recordatorios = await respuesta.json();
            const recordatorio = recordatorios.find(r => String(r.id) === String(id));
            if (!recordatorio) {
                mensaje.textContent = 'Recordatorio no encontrado.';
                mensaje.style.color = 'red';
                return;
            }
            document.getElementById('id').value = recordatorio.id;
            document.getElementById('nombreContacto').value = recordatorio.nombreContacto;
            document.getElementById('fechaCumpleanos').value = recordatorio.fechaCumpleanos;
            document.getElementById('nota').value = recordatorio.nota || '';
        } catch (err) {
            mensaje.textContent = 'Error al cargar los datos.';
            mensaje.style.color = 'red';
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

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
            const respuesta = await fetch(`http://localhost:3000/api/editReminder/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                mensaje.textContent = '¡Recordatorio editado correctamente!';
                mensaje.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'listReminders.html';
                }, 1200);
            } else {
                mensaje.textContent = resultado.mensaje || 'No se pudo editar el recordatorio';
                mensaje.style.color = 'red';
            }
        } catch (err) {
            mensaje.textContent = 'Error de conexión con el servidor';
            mensaje.style.color = 'red';
        }
    });

    cargarDatos();
});
