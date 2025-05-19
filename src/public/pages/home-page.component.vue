<!-- 
Este es el componente principal de la página Home.
Muestra:
1. Un hero section con el título y mensaje de bienvenida
2. Una sección de eventos registrados usando el componente ListEventSummary
-->
<script>
import { useI18n } from 'vue-i18n'
import ListEventSummary from '../../registration/components/list-event-summary.component.vue'

export default {
  name: 'HomeView',
  components: {
    ListEventSummary, // Componente que muestra el grid de eventos
  },
  setup() {
    const { t } = useI18n() // Hook para internacionalización
    return { t }
  },
}
</script>

<template>
  <div class="home-view">
    <!-- Hero section con título y mensaje de bienvenida -->
    <section class="hero surface-0 text-center p-6 mb-4">
      <div class="container mx-auto">
        <h1 class="text-5xl font-bold mb-4 text-primary">{{ t('home.title') }}</h1>
        <p class="text-2xl text-700 line-height-3 mb-6">{{ t('home.welcome') }}</p>
      </div>
    </section>

    <!-- Sección de eventos registrados -->
    <section class="registered-events p-4">
      <div class="container mx-auto">
        <list-event-summary />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Estilos para el hero section */
.hero {
  border-radius: 0 0 2rem 2rem;
  padding-top: 8rem;
}

/* Estilos para las tarjetas de eventos */
.event-card {
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  height: 100%;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
}

.placeholder-content {
  opacity: 0.7;
}

/* Ajustes responsivos */
@media screen and (max-width: 768px) {
  .hero {
    padding-top: 7rem;
    border-radius: 0 0 1.5rem 1.5rem;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.25rem;
  }
}
</style>
