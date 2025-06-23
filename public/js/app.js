// public/js/app.js
// Archivo principal de la aplicación del lado del cliente
const API_BASE = "/";

function decodificarToken(token) {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
}


function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(API_BASE + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                mostrarPlanillas();
            } else {
                alert("Login inválido");
            }
        });
}

function logout() {
    localStorage.removeItem("token");
    location.reload();
}

function mostrarPlanillas() {
    document.getElementById("login").style.display = "none";
    document.getElementById("intro").style.display = "none";
    document.getElementById("main").style.display = "block";

    const token = localStorage.getItem("token");
    const user = decodificarToken(token);
    document.getElementById("usuario-logueado").innerText = `Hola, ${user.nombre}`;

    fetch(API_BASE + "planillas", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(res => res.json())
        .then(planillas => {
            const lista = document.getElementById("lista-planillas");
            lista.innerHTML = "";
            planillas.forEach(p => {
                const li = document.createElement("li");
                const fecha = new Date(p.fecha).toLocaleDateString("es-AR");
                li.innerHTML = `
                <strong>${p.cliente}</strong><br>
                Tipo: ${p.tipo_auxilio} | Estado: ${p.estado}<br>
                Ubicación: ${p.ubicacion}<br>
                Fecha: ${fecha}
                `;
                lista.appendChild(li);
            });
        });
}

if (localStorage.getItem("token")) {
    mostrarPlanillas();
}
