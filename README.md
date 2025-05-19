## Summary

**Eventify** es una plataforma web en Vue 3 que permite:

- Publicar y gestionar eventos
- Registrar asistentes por ticket
- Validar check-in de asistentes
- Permitir a los asistentes calificar el evento al que asistieron
- Mostrar estadísticas de asistencia

La UI está dividida en tres bounded contexts:

1. **public**  
   – Home (`/home`): Grid de eventos con métricas (asistentes totales, % de asistencia).  
   – 404 (`*`): Página “Page Not Found”.  
   – Toolbar global con logo Clearbit, rutas y selector de idioma (EN/ES).

2. **registration**  
   – Crear Evento (`/registration/event-create`)  
   – Crear Asistente (`/registration/attendee-create`)  
   – Check-In (`/registration/event-check-ins/new`)  
   – Componentes: tarjetas de resumen, formularios de creación y validación de tickets.  
   – Servicios: `EventService`, `AttendeeService`, `CheckInService`, `EventStatisticsService`.

3. **engagement**  
   – Calificar Evento (`/engagement/rate`)  
   – Componentes: formulario de rating.  
   – Servicio: `RatingService` + gateway a `AttendeeService` de registration para validar tickets y check-ins.

---

## Features

- **Home**: muestra todos los eventos con sus estadísticas de asistencia
- **Check-In**: ingresa un Ticket Identifier, valida y marca asistencia
- **Create Event**: formulario para crear nuevos eventos
- **Create Attendee**: formulario para registrar asistentes
- **Event Rating**: formulario para calificar eventos ya asistidos (1–5)
- **i18n**: inglés (default) y español, switch EN/ES en el toolbar
- **Page Not Found**: manejo de rutas inválidas con botón “Go to Home”

---

## Tech Stack

- **Framework**: Vue 3 + Vite
- **UI**: PrimeVue (preset Aura/Lara/Nora) + PrimeFlex + PrimeIcons
- **Routing**: Vue Router
- **HTTP**: Axios (`shared/services/http.instance.js`)
- **Validation**: Vuelidate (@vuelidate/core + @vuelidate/validators)
- **i18n**: Vue-i18n
- **Fake API**: json-server v0.17.4
- **Language**: JavaScript (Options API)
- **Styling**: Material Design, ARIA attributes, HTML5 semántico

## Technologies

- Vue
- Vue i18n
- Axios
- PrimeVue
- Vite env

## Author

Developed by **[u202313702] [Mauricio Daniel Elera Rodríguez]**

- Codeforces: [awadeLAT4M](https://codeforces.com/profile/awadeLAT4M)
- Instagram: [@maur1ciooo](https://www.instagram.com/maur1ciooo/)
- LinkedIn: [Mauricio Daniel Elera Rodríguez](https://www.linkedin.com/in/mauricio-daniel-elera-rodr%C3%ADguez-193212234/)
