<!-- 
Este componente muestra un grid de eventos registrados.
Funcionalidad:
1. Carga los eventos y sus estadísticas al montarse
2. Muestra un estado de carga mientras obtiene los datos
3. Maneja errores y muestra mensajes apropiados
4. Permite ajustar el número de columnas del grid modificando las clases
-->
<script>
import EventSummary from './event-summary.component.vue'
import { EventStatisticsService } from '../services/event-statistics.service.js'

export default {
  name: 'ListEventSummary',
  components: {
    EventSummary, // Componente que renderiza cada tarjeta de evento
  },
  // Estado del componente
  data() {
    return {
      eventsStatistics: [], // Lista de eventos con sus estadísticas
      loading: false,       // Estado de carga
      error: null,         // Mensaje de error si falla la carga
    }
  },
  setup() {
    const eventStatisticsService = new EventStatisticsService()
    return {
      eventStatisticsService,
    }
  },
  // Carga los eventos al montar el componente
  created() {
    this.fetchEventsStatistics()
  },
  methods: {
    // Obtiene los eventos y sus estadísticas del backend
    async fetchEventsStatistics() {
      this.loading = true
      this.error = null

      try {
        this.eventsStatistics = await this.eventStatisticsService.getAllEventsWithStatistics()
      } catch (err) {
        console.error('Error fetching events statistics:', err)
        this.error = this.$t('listEventSummary.loadError')
        this.$toast.add({
          severity: 'error',
          summary: this.$t('listEventSummary.errorTitle'),
          detail: this.$t('listEventSummary.loadError'),
          life: 3000,
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="events-summary-container">
    <!-- Título de la sección -->
    <h2 class="text-3xl font-bold mb-4 text-center text-primary section-title">
      {{ $t('listEventSummary.title') }}
    </h2>

    <!-- Estado de carga -->
    <div v-if="loading" class="p-5 text-center">
      <i class="pi pi-spin pi-spinner text-primary" style="font-size: 2rem"></i>
      <p class="mt-3">{{ $t('listEventSummary.loading') }}</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="p-5 text-center">
      <i class="pi pi-exclamation-triangle text-red-500" style="font-size: 2rem"></i>
      <p class="mt-3 text-red-600">{{ error }}</p>
      <pv-button
        @click="fetchEventsStatistics"
        class="mt-3 p-button-outlined p-button-rounded"
        :label="$t('listEventSummary.retry')"
      />
    </div>

    <!-- Estado sin eventos -->
    <div v-else-if="eventsStatistics.length === 0" class="p-5 text-center">
      <i class="pi pi-calendar-times text-primary" style="font-size: 2rem"></i>
      <p class="mt-3">{{ $t('listEventSummary.noEvents') }}</p>
    </div>

    <!-- Grid de eventos -->
    <div v-else class="grid">
      <!-- 
      Para modificar el número de columnas, ajusta las clases col-* según la siguiente guía:
      - Para 2 columnas: col-12 md:col-6 (12/2=6)
      - Para 3 columnas: col-12 md:col-4 (12/3=4)
      - Para 4 columnas: col-12 md:col-3 (12/4=3)
      - Para 5 columnas: col-12 md:col-2.4 (12/5=2.4)
      
      Ejemplo:
      2 columnas (actual): class="col-12 md:col-6"
      3 columnas: class="col-12 md:col-4"
      4 columnas: class="col-12 md:col-3"
      
      El col-12 asegura que en móviles se muestre una columna,
      mientras que md:col-* define el número de columnas en pantallas medianas y grandes.
      -->
      <div
        v-for="eventStats in eventsStatistics"
        :key="eventStats.event.id"
        class="col-12 md:col-6 event-grid-item"
      >
        <event-summary :event-statistics="eventStats" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.events-summary-container {
  padding: 1.5rem;
}

/* Estilos para el título de la sección */
.section-title {
  position: relative;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}

/* Línea decorativa debajo del título */
.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 25%;
  width: 50%;
  height: 3px;
  background: var(--primary-500);
  border-radius: 3px;
}

/* Espaciado entre tarjetas de eventos */
.event-grid-item {
  margin-bottom: 1.5rem;
}

/* Ajustes responsivos */
@media screen and (max-width: 768px) {
  .events-summary-container {
    padding: 1rem;
  }
}
</style>
