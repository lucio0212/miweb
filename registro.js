document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("registroForm");
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const mensajeError = document.getElementById("mensajeError");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    mensajeError.textContent = "";

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre) {
      mensajeError.textContent = "⚠️ Ingresa tu nombre.";
      return;
    }

    if (!emailRegex.test(email)) {
      mensajeError.textContent = "⚠️ Ingresa un email válido.";
      return;
    }
    if (password.length < 4) {
      mensajeError.textContent = "⚠️ La contraseña debe tener al menos 4 caracteres.";
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el email ya está registrado
    if (usuarios.some(u => u.email === email)) {
      mensajeError.textContent = "⚠️ Este correo ya está registrado. Intenta iniciar sesión.";
      return;
    }

    const nuevoUsuario = { nombre, email, contraseña: password };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Iniciar sesión automáticamente y redirigir
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    setTimeout(() => window.location.href = "bienvenida.html", 300);
  });
});
