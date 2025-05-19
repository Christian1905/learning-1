<!-- 
Este componente muestra un card con la información de un evento y sus estadísticas.
Recibe como prop eventStatistics que contiene:
- event: { id, name, description, scheduledAt }
- registeredAttendeesCount: número total de asistentes registrados
- attendancePercentage: porcentaje de asistentes que hicieron check-in
-->
<script>
import { EventStatistics } from '../models/event-statics.entity.js'

export default {
  name: 'EventSummary',
  props: {
    eventStatistics: {
      type: EventStatistics,
      required: true,
    },
  },
  computed: {
    // Formatea el porcentaje de asistencia a un número entero con %
    formattedPercentage() {
      return Math.round(this.eventStatistics.attendancePercentage) + '%'
    },
    // Define el color del porcentaje según el valor:
    // < 30%: rojo, < 70%: naranja, >= 70%: verde
    progressColor() {
      const percentage = this.eventStatistics.attendancePercentage
      if (percentage < 30) return 'var(--red-500)'
      if (percentage < 70) return 'var(--orange-500)'
      return 'var(--green-500)'
    },
    // Define la clase CSS según el porcentaje de asistencia
    progressClass() {
      const percentage = this.eventStatistics.attendancePercentage
      if (percentage < 30) return 'attendance-low'
      if (percentage < 70) return 'attendance-medium'
      return 'attendance-high'
    },
    // Formatea la fecha del evento según el idioma actual
    scheduledDate() {
      const date = new Date(this.eventStatistics.event.scheduledAt)
      return date.toLocaleDateString(this.$i18n.locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>

<template>
  <div class="event-summary p-2">
    <!-- Card principal del evento -->
    <pv-card class="event-card h-full shadow-4 border-round-xl">
      <!-- Header: Nombre del evento y fecha -->
      <template #header>
        <div class="event-header relative overflow-hidden border-round-top-xl">
          <div class="event-header-gradient absolute w-full h-full"></div>
          <div class="p-4 z-1 relative">
            <h3 class="text-0 text-2xl font-bold m-0 event-title">
              {{ eventStatistics.event.name }}
            </h3>
            <div class="flex align-items-center mt-2">
              <i class="pi pi-calendar text-0 mr-2"></i>
              <span class="text-0 text-sm">{{ scheduledDate }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Content: Descripción del evento -->
      <template #content>
        <div class="event-content p-3">
          <p class="line-height-3 description-text">
            {{ eventStatistics.event.description }}
          </p>
        </div>
      </template>

      <!-- Footer: Estadísticas del evento -->
      <template #footer>
        <div class="event-footer p-3 pt-0">
          <div class="divider my-3"></div>

          <div class="grid">
            <!-- Contador de asistentes registrados -->
            <div class="col-6">
              <div class="statistic-container text-center p-2">
                <div class="stats-icon-wrapper">
                  <i class="pi pi-users text-primary text-2xl"></i>
                </div>
                <div class="font-bold text-xl stat-value">
                  {{ eventStatistics.registeredAttendeesCount }}
                </div>
                <div class="text-xs text-500 stat-label">
                  {{ $t('eventSummary.registeredAttendees') }}
                </div>
              </div>
            </div>

            <!-- Porcentaje de asistencia -->
            <div class="col-6">
              <div class="statistic-container text-center p-2">
                <div class="stats-icon-wrapper">
                  <i class="pi pi-chart-bar text-primary text-2xl"></i>
                </div>
                <div class="font-bold text-xl stat-value" :class="progressClass">
                  {{ formattedPercentage }}
                </div>
                <div class="text-xs text-500 stat-label">
                  {{ $t('eventSummary.attendancePercentage') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
/* Estilos para la tarjeta y efectos de hover */
.event-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  height: 100%;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

/* Estilos para el encabezado del evento */
.event-header {
  min-height: 100px;
  background: linear-gradient(135deg, var(--p-primary-color) 0%, var(--p-primary-color) 100%);
}

.event-header-gradient {
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
}

.event-title {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

/* Línea divisoria entre contenido y footer */
.divider {
  height: 1px;
  background-color: var(--surface-200);
}

/* Estilos para los iconos de estadísticas */
.stats-icon-wrapper {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estilos para los valores de estadísticas */
.stat-value {
  color: var(--primary-600);
}

.stat-label {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Colores según el porcentaje de asistencia */
.attendance-low {
  color: var(--red-500);
}

.attendance-medium {
  color: var(--orange-500);
}

.attendance-high {
  color: var(--green-500);
}

/* Ajustes responsivos */
@media screen and (max-width: 576px) {
  .stat-value {
    font-size: 1.25rem;
  }
}
</style>
