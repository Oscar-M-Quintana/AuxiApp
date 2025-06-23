const map = L.map('map').setView([-34.61, -58.38], 12); // CABA

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const token = localStorage.getItem("token");

fetch("/mapa/datos", {
  headers: {
    Authorization: "Bearer " + token
  }
})
  .then(res => res.json())
  .then(data => {
    data.auxilios.forEach(aux => {
      if (aux.latitud && aux.longitud) {
        L.marker([aux.latitud, aux.longitud])
          .addTo(map)
          .bindPopup(`🔵 Auxilio: ${aux.email}<br>Tipo: ${aux.tipo_auxilio}`);
      }
    });

    data.planillas.forEach(planilla => {
      if (planilla.latitud && planilla.longitud) {
        L.marker([planilla.latitud, planilla.longitud], {
          icon: L.icon({
            iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          })
        })
        .addTo(map)
        .bindPopup(`🔴 Evento: ${planilla.cliente}<br>Ubicación: ${planilla.ubicacion}`);
      }
    });
  })
  .catch(err => {
    console.error("Error al cargar el mapa:", err);
    alert("Error al obtener datos del mapa");
  });
const tokenUser = localStorage.getItem("token");
if (tokenUser) {
  const user = decodificarToken(tokenUser);
  document.getElementById("usuario-logueado").innerText = `Hola, ${user.email}`;
}

function decodificarToken(token) {
  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));
  return decoded;
}
