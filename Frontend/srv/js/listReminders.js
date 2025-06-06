document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("lista-recordatorios");
  const usuario = localStorage.getItem("usuario");

  const nombreUsuario = localStorage.getItem("nombreUsuario");
  if (nombreUsuario) {
    document.getElementById(
      "saludoUsuario"
    ).textContent = `¡Hola! ${nombreUsuario}`;
  }

  async function cargarRecordatorios() {
    if (!usuario) {
      tbody.innerHTML =
        '<tr><td colspan="4">No hay usuario logueado.</td></tr>';
      return;
    }
    try {
      const respuesta = await fetch(
        `https://backend-recordatoriocumpleanos.onrender.com/api/listReminders/${usuario}`
      );
      if (!respuesta.ok) throw new Error("Error al obtener los recordatorios");
      const recordatorios = await respuesta.json();

      tbody.innerHTML = "";

      recordatorios.forEach((recordatorio) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
                    <td>${recordatorio.nombreContacto}</td>
                    <td>${recordatorio.fechaCumpleanos}</td>
                    <td>${recordatorio.nota || ""}</td>
                    <td>
                        <button class="editar" data-id="${
                          recordatorio.id
                        }">Editar</button>
                        <button class="eliminar" data-id="${
                          recordatorio.id
                        }">Eliminar</button>
                    </td>
                `;

        // Evento para eliminar
        tr.querySelector(".eliminar").addEventListener("click", async () => {
          if (confirm("¿Seguro que deseas eliminar este recordatorio?")) {
            try {
              const respuesta = await fetch(
                `https://backend-recordatoriocumpleanos.onrender.com/api/deleteReminder/${recordatorio.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ usuario }),
                }
              );
              const resultado = await respuesta.json();
              if (respuesta.ok) {
                alert("Recordatorio eliminado correctamente");
                cargarRecordatorios();
              } else {
                alert(resultado.mensaje || "No se pudo eliminar");
              }
            } catch (err) {
              alert("Error de conexión");
            }
          }
        });

        // Evento para editar
        tr.querySelector(".editar").addEventListener("click", () => {
          // Redirige a la pantalla de edición con el id como parámetro
          window.location.href = `editReminder.html?id=${recordatorio.id}`;
        });

        tbody.appendChild(tr);
      });
    } catch (error) {
      tbody.innerHTML =
        '<tr><td colspan="4">No se pudieron cargar los recordatorios.</td></tr>';
    }
  }

  cargarRecordatorios();
});
