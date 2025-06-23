const API_BASE = "/";

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
  document.getElementById("main").style.display = "block";

  const token = localStorage.getItem("token");
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
        li.innerText = `${p.cliente} - ${p.tipo_auxilio} - ${p.estado}`;
        lista.appendChild(li);
      });
    });
}

if (localStorage.getItem("token")) {
  mostrarPlanillas();
}
