// public/js/app.js
// Archivo principal de la aplicación del lado del cliente
const API_BASE = "/";

function decodificarToken(token) {
    if (!token) throw new Error("Token vacío");
    const payload = token.split('.')[1];
    if (!payload) throw new Error("Token inválido");
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
        })
        .catch(() => alert("Error de red al intentar iniciar sesión"));
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
    if (!token) {
        alert("No hay sesión activa");
        location.reload();
        return;
    }
    let user;
    try {
        user = decodificarToken(token);
    } catch (e) {
        alert("Token inválido. Por favor, inicia sesión nuevamente.");
        logout();
        return;
    }
    document.getElementById("usuario-logueado").innerText = `Hola, ${user.nombre || user.email || "Usuario"}`;

    fetch(API_BASE + "planillas", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(res => {
            if (!res.ok) throw new Error("No se pudieron obtener las planillas");
            return res.json();
        })
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
                li.style.cursor = "pointer";
                li.onclick = () => verDetallePlanilla(p);

                lista.appendChild(li);
            });
        })
        .catch(err => {
            alert("Error al cargar planillas: " + err.message);
            logout();
        });
}

if (localStorage.getItem("token")) {
    try {
        mostrarPlanillas();
    } catch (e) {
        logout();
    }
}

let planillaSeleccionada = null;

function verDetallePlanilla(p) {
    planillaSeleccionada = p;
    const fecha = new Date(p.fecha).toLocaleString("es-AR");
    const contenido = `
    <strong>Cliente:</strong> ${p.cliente}<br>
    <strong>Teléfono:</strong> ${p.telefono_contacto}<br>
    <strong>Ubicación:</strong> ${p.ubicacion}<br>
    <strong>Tipo de auxilio:</strong> ${p.tipo_auxilio}<br>
    <strong>Aseguradora:</strong> ${p.aseguradora}<br>
    <strong>Estado:</strong> ${p.estado}<br>
    <strong>Fecha:</strong> ${fecha}<br>
    <strong>Vehículo:</strong> ${p.datos_auto}<br>
    <strong>Poliza:</strong> ${p.numero_poliza}
  `;
    document.getElementById("detalle-contenido").innerHTML = contenido;
    document.getElementById("detalle-planilla").style.display = "block";
}

function cerrarDetallePlanilla() {
    document.getElementById("detalle-planilla").style.display = "none";
    document.getElementById("detalle-contenido").innerHTML = "";
    planillaSeleccionada = null;
}

function finalizarPlanilla() {
    if (!planillaSeleccionada) return;

    const obs = document.getElementById("observaciones").value;
    const token = localStorage.getItem("token");

    fetch(`/planillas/${planillaSeleccionada.id}/finalizar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({ observaciones_finales: obs })
    })
        .then(res => {
            if (!res.ok) throw new Error("No se pudo finalizar la planilla");
            return res.json();
        })
        .then(data => {
            alert("✅ Planilla finalizada");
            cerrarDetallePlanilla();
            mostrarPlanillas(); // Solo recarga la lista, no toda la página
        })
                .catch(err => {
            console.error(err);
            alert("❌ Error al finalizar la planilla: " + err.message);
        });
}