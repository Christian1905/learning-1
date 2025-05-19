<script>
import AddRatingComponent from '../components/add-rating.component.vue'

export default {
  name: 'RatingPage',
  components: { AddRatingComponent },
}
</script>

<template>
  <div class="rating-page">
    <!-- Encabezado -->
    <div class="header-section" aria-label="Rating header">
      <i class="pi pi-star-fill star-icon" aria-hidden="true"></i>

      <!-- Título y subtítulo traducidos -->
      <h1 class="title">{{ $t('rating.title') }}</h1>
      <p class="subtitle">
        {{ $t('rating.subtitle') }}
      </p>
    </div>

    <!-- Sección formulario -->
    <section class="add-rating-section" aria-label="Add rating section">
      <add-rating-component />
    </section>
  </div>
</template>

<style scoped>
/* --- (estilos originales sin cambios) --- */
.rating-page {
  padding: 0;
  margin: 0;
}
.header-section {
  max-width: 600px;
  margin: 3rem auto 2rem;
  text-align: center;
  padding: 2rem 1rem 1.5rem;
  border-radius: 1.5rem;
}
.star-icon {
  font-size: 3rem;
  color: #f59e42;
  margin-bottom: 0.5rem;
  animation: pop 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
@keyframes pop {
  0% {
    transform: scale(0.7);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}
.subtitle {
  font-size: 1.1rem;
  margin: 0;
  font-weight: 400;
}
.add-rating-section {
  margin-top: 2rem;
}
</style>
