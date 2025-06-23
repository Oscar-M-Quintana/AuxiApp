
# AuxiApp - Backend Express
<p align="center">
  <img src="public/assets/icono.png" alt="AuxiApp logo" width="150"/>
</p>

**AuxiApp** es una API RESTful desarrollada con Node.js, Express y Sequelize que gestiona un sistema de auxilios mecánicos en tiempo real. La aplicación está diseñada como parte del trabajo práctico de la materia **Computación en la Nube** de la Licenciatura en Ciencia de Datos.

---

## 🚗 ¿Qué hace AuxiApp?

- Permite que **aseguradoras** registren eventos de auxilio mecánico.
- **Operadores** asignan recursos humanos (grúas o mecánicos) disponibles.
- Los **auxilios** (usuarios de rol móvil) pueden finalizar las planillas asignadas.
- El **operador** puede ver en tiempo real un **mapa de ubicaciones** con los eventos activos y los auxilios disponibles.

---

## 🔧 Tecnologías utilizadas

- Node.js + Express
- Sequelize ORM + MySQL (base de datos gestionada en DigitalOcean)
- JWT para autenticación
- HTML + CSS + JavaScript (frontend en carpeta `public`)
- Leaflet.js para visualización de mapa
- Despliegue automático en DigitalOcean App Platform

---

## 👥 Roles definidos

| Rol         | Permisos principales                                         |
|-------------|--------------------------------------------------------------|
| **operador**     | Ver y gestionar planillas, ver el mapa, asignar auxilios |
| **aseguradora**  | Crear nuevas planillas con ubicación                     |
| **auxilio**      | Visualizar y finalizar su planilla asignada              |

---

## 🧠 Funcionalidades implementadas

### 🔐 Autenticación

- Login con email y contraseña
- Generación y validación de token JWT
- Control de acceso por rol

### 👤 Gestión de usuarios

- Seed automático de 2 operadores, 2 aseguradoras y 8 auxilios
- Auxilios incluyen `latitud` y `longitud` para el mapa

### 📋 Gestión de planillas

- Seed automático de 5 eventos reales de auxilio
- Campos: cliente, ubicación, tipo de auxilio, aseguradora, estado, fechas
- Visualización con formato limpio y claro
- Actualización de estado (asignado, finalizado) por rol correspondiente

### 🗺 Mapa en tiempo real

- Visualización con Leaflet.js
- Marcadores:
  - 🔵 Auxilios disponibles
  - 🔴 Planillas activas
- Leyenda incluida
- Mapa embebido en un contenedor con barra superior personalizada

---

## 📦 Cómo probar la app

1. **Login como operador**  
   - Email: `operador@auxi.com`  
   - Contraseña: `123456`

2. Verás el **listado de planillas activas**, con cliente, tipo, ubicación y estado.

3. Botón "🗺 Ver Mapa" abre una vista en otra pestaña con todos los eventos y móviles en tiempo real.

---

## 📂 Estructura del proyecto

```
AuxiApp/
├── index.js
├── database.js
├── models/
│   ├── Usuario.js
│   ├── PlanillaAuxilio.js
├── routes/
│   ├── auth.js
│   ├── usuarios.js
│   ├── planillas.js
│   └── mapa.js
├── public/
│   ├── index.html
│   ├── mapa.html
│   ├── css/
│   │   └── estilos.css
│   └── js/
│       ├── app.js
│       └── mapa.js
├── seed/
│   ├── seedAll.js
│   └── seedPlanilla.js
└── verUsuarios.js
```

---

## 🧪 Scripts útiles

```bash
node seed/seedAll.js       # Carga operadores, aseguradoras y auxilios
node seed/seedPlanilla.js  # Crea 5 eventos de auxilio para testeo
node verUsuarios.js        # Muestra los usuarios en consola
```

---

## 🚀 Despliegue

- Frontend + backend en:  
  [https://auxiapp-app-vhnr6.ondigitalocean.app](https://auxiapp-app-vhnr6.ondigitalocean.app)

- Base de datos MySQL gestionada en DigitalOcean, acceso restringido por IP.

---

## ✅ Estado actual (para entrega)

- [x] Login con JWT y control de roles
- [x] Visualización y gestión de planillas
- [x] Seed con usuarios y planillas de prueba
- [x] Mapa funcional con marcadores dinámicos
- [x] Panel del operador presentable para evaluación

---

¿Preguntas o sugerencias?  
Este proyecto es parte del trabajo práctico de **Oscar Miguel Quintana** para la **UNaB - Ciencia de Datos**.
