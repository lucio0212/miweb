document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const mensajeError = document.getElementById("mensajeError");

  // Usuarios por defecto (los que me indicaste)
  const defaultUsers = [
    { nombre: "ADMIN", email: "admin@gmail.com", contraseña: "123456" },
    { nombre: "YAZMANI", email: "yazmanilucio07@gmail.com", contraseña: "yazmani07" },
    { nombre: "AIKER", email: "aiker@gmail.com", contraseña: "aiker123" },
    { nombre: "MIGUEL", email: "miguel@gmail.com", contraseña: "miguel123" }
  ];

  // Inicializar usuarios en localStorage si no existen
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(defaultUsers));
  }

  // Si ya hay usuario en sesión, redirige directamente
  if (localStorage.getItem("usuario")) {
    window.location.href = "bienvenida.html";
    return;
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    mensajeError.textContent = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      mensajeError.textContent = "⚠️ Por favor, ingresa un email válido.";
      return;
    }

    if (password.length < 1) {
      mensajeError.textContent = "⚠️ Ingresa tu contraseña.";
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(u => u.email === email && u.contraseña === password);

    if (usuarioValido) {
      localStorage.setItem("usuario", JSON.stringify(usuarioValido));
      // Redirigir directo a bienvenida
      setTimeout(() => window.location.href = "bienvenida.html", 250);
    } else {
      mensajeError.textContent = "❌ Correo o contraseña incorrectos.";
    }
  });
});
