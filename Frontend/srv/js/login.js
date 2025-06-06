document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mensajeLogin = document.getElementById("mensajeLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    // Encriptar la contraseña usando md5
    const contrasenaEncriptada = md5(contrasena);

    const datos = {
      correo,
      contrasena: contrasenaEncriptada,
    };

    try {
      const respuesta = await fetch("https://backend-recordatorio-cumpleanos.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        mensajeLogin.textContent = "¡Bienvenido! 🎂";
        mensajeLogin.style.color = "green";
        // Redireccionar después de un breve mensaje
        setTimeout(() => {
          const user = correo.split("@")[0]; // <--- Agregado
          localStorage.setItem("usuario", user);
          localStorage.setItem("nombreUsuario", resultado.nombre); 
          window.location.href = "srv/pages/listReminders.html";
        }, 1200);
      } else {
        mensajeLogin.textContent =
          resultado.mensaje || "Error al iniciar sesión";
        mensajeLogin.style.color = "red";
      }
    } catch (err) {
      mensajeLogin.textContent = "Error de conexión con el servidor";
      mensajeLogin.style.color = "red";
    }
  });
});
