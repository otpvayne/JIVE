// Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");


document.getElementById("formulario__register").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario
    
    const edadJugador = document.getElementById("edadJugador").value;
    
    if (edadJugador < 0) {
        document.getElementById("mensaje").textContent = "La edad no puede ser negativa.";
        return; // Detener el proceso si la edad es negativa
    }
    const formData = {
        nombreTutor: document.getElementById("nombreTutor").value,
        nombreJugador: document.getElementById("nombreJugador").value,
        contraseña: document.getElementById("contraseña").value,
        correo: document.getElementById("correo").value,
        edadJugador: edadJugador,
        recaptchaToken: grecaptcha.getResponse()
    };
    
    fetch("http://localhost:3000/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("mensaje").textContent = data.message;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("mensaje").textContent = "Error al registrar.";
    });
});

document.getElementById("formulario__login").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const formData = {
        correo: document.getElementById("correoLogin").value,
        contraseña: document.getElementById("contraseñaLogin").value
    };
    
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirigir o mostrar mensaje de éxito
            document.getElementById("mensaje").textContent = "Inicio de sesión exitoso.";
            window.location.href = "/xd.html"; // Cambia a la página que desees después de iniciar sesión
        } else {
            document.getElementById("mensaje").textContent = data.message;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("mensaje").textContent = "Error al iniciar sesión.";
    });
});

function iniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_login.classList.add("mostrar");
        formulario_register.classList.remove("mostrar");
        contenedor_login_register.style.left = "10px";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_login.classList.add("mostrar");
        formulario_register.classList.remove("mostrar");
        contenedor_login_register.style.left = "0px";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}
function register() {
    if (window.innerWidth > 850) {
        formulario_register.classList.add("mostrar");
        formulario_login.classList.remove("mostrar");
        contenedor_login_register.style.left = "410px";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.classList.add("mostrar");
        formulario_login.classList.remove("mostrar");
        contenedor_login_register.style.left = "0px";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
    }
}
function anchoPage(){
    if (window.innerWidth > 850){
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.classList.add("mostrar");
        formulario_register.classList.remove("mostrar");
        contenedor_login_register.style.left = "0px";
    }
}

anchoPage();
// Modal
const modal = document.getElementById("modal-terminos");
const btnVerTerminos = document.getElementById("ver-terminos");
const spanClose = document.getElementsByClassName("close")[0];
// Modal de términos y condiciones
btnVerTerminos.onclick = function() {
    modal.style.display = "block";
}

spanClose.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);
