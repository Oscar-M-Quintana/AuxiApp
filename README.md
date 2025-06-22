# AuxiApp - Sistema de Asistencia Vehicular

AuxiApp es una aplicación desarrollada en Node.js con Express y Sequelize, desplegada en DigitalOcean App Platform. Gestiona solicitudes de auxilio vehicular realizadas por aseguradoras y coordinadas por operadores, con asistencia de mecánicos en el terreno.

## Tecnologías Utilizadas

* Node.js + Express
* Sequelize ORM
* MySQL (DigitalOcean Managed Database)
* JWT para autenticación
* Postman para pruebas de API
* DigitalOcean App Platform para despliegue

## Estructura de Roles

* **Aseguradora**: Carga la planilla de auxilio
* **Operador**: Asigna auxilio disponible y finaliza casos
* **Auxilio (Mecánico)**: Recibe y completa auxilios

## Estructura de Planilla

Contiene los siguientes campos:

* `cliente`, `telefono_contacto`, `ubicacion`, `ubicacion_maps`
* `datos_auto`, `numero_poliza`, `aseguradora`, `tipo_auxilio`
* `estado`: "creado", "asignado", "finalizado"
* `vehiculo_asignado_id`, `hora_asignacion`, `hora_arribo`, `hora_salida`
* `comentarios_auxilio`, `observaciones_finales`

## Endpoints Disponibles

### Planillas

* `GET /planillas` - Listado de planillas
* `POST /planillas` - Crear nueva planilla
* `POST /planillas/:id/asignar` - Asignar auxilio
* `POST /planillas/:id/finalizar` - Finalizar planilla por auxilio

### Autenticación

* `POST /auth/login` - Login con email y contraseña, devuelve JWT

### Usuarios

* `POST /usuarios/registro` - Registro de usuario operador (solo desde sistema)

## Variables de Entorno

Configuradas en App Platform:

* `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
* `JWT_SECRET`

## Uso de Postman

### Crear Planilla (POST /planillas)

```json
{
  "cliente": "Ana López",
  "telefono_contacto": "1123456789",
  "ubicacion": "Av. Corrientes 1234",
  "ubicacion_maps": "https://maps.google.com/?q=-34.6037,-58.3816",
  "datos_auto": "Chevrolet Corsa azul, XYZ789",
  "numero_poliza": "PZ-98765",
  "aseguradora": "Mapfre",
  "tipo_auxilio": "grúa",
  "fecha": "2025-06-21T19:00:00.000Z"
}
```

## Despliegue

El proyecto está desplegado en DigitalOcean:

* App: [https://auxiapp-app-vhnr6.ondigitalocean.app](https://auxiapp-app-vhnr6.ondigitalocean.app)
* Base de datos MySQL administrada con acceso por variables de entorno

---

Este README resume el estado actual del sistema. Se actualizará a medida que se incorporen funcionalidades como el manejo de roles con permisos y mejoras en la interfaz de interacción con usuarios.
