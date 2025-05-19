<!-- registration/views/event-page.component.vue -->
<template>
  <main
    class="p-d-flex p-flex-column p-ai-center p-px-3 p-mt-6 home-view"
    role="main"
    aria-label="Create event page"
  >
    <section class="hero surface-0 text-center p-6 mb-4" aria-label="Header">
      <i
        class="pi pi-calendar-plus p-text-4xl p-text-primary-500 p-mb-2 text-4xl"
        aria-hidden="true"
      ></i>
      <div class="container mx-auto">
        <h1 class="text-5xl font-bold mb-4 text-primary">
          {{ $t('eventPage.title') }}
        </h1>
        <p class="text-2xl text-700 line-height-3 mb-6">
          {{ $t('eventPage.subtitle') }}
        </p>
      </div>
    </section>

    <section aria-label="Create event form">
      <create-event-component />
    </section>
  </main>
</template>

<script>
import CreateEventComponent from '../components/create-event.component.vue'

export default {
  name: 'EventPage',
  components: {
    CreateEventComponent,
  },
}
</script>

<style scoped>
.hero {
  border-radius: 0 0 2rem 2rem;
  padding-top: 8rem;
}
</style>
