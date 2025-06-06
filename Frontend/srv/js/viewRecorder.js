document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.getElementById('lista-recordatorios');

    async function cargarRecordatorios() {
        try {
            const respuesta = await fetch('/api/recordatorios');
            if (!respuesta.ok) throw new Error('Error al obtener los recordatorios');
            const recordatorios = await respuesta.json();

            tbody.innerHTML = '';

            recordatorios.forEach(recordatorio => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${recordatorio.nombreContacto}</td>
                    <td>${recordatorio.fechaCumpleanos}</td>
                    <td>${recordatorio.nota || ''}</td>
                    <td>
                        <button class="editar" data-id="${recordatorio.id}">Editar</button>
                        <button class="eliminar" data-id="${recordatorio.id}">Eliminar</button>
                    </td>
                `;

                tbody.appendChild(tr);
            });
        } catch (error) {
            tbody.innerHTML = '<tr><td colspan="4">No se pudieron cargar los recordatorios.</td></tr>';
        }
    }

    cargarRecordatorios();
});