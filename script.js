document.getElementById("formulario__register").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const formData = {
        nombreTutor: document.getElementById("nombreTutor").value,
        nombreJugador: document.getElementById("nombreJugador").value,
        contraseña: document.getElementById("contraseña").value,
        correo: document.getElementById("correo").value,
        edadJugador: document.getElementById("edadJugador").value
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

// Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

// Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

// Funciones

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
