<template>
  <main
    class="p-d-flex p-flex-column p-ai-center p-px-3 p-mt-6"
    role="main"
    aria-label="create-attendee-page"
  >
    <section class="hero surface-0 text-center p-6 mb-4" aria-label="Header">
      <i
        class="pi pi-user-plus p-text-4xl p-text-primary-500 p-mb-2 text-4xl"
        aria-hidden="true"
      ></i>
      <div class="container mx-auto">
        <h1 class="text-5xl font-bold mb-4 text-primary">
          {{ $t('attendeePage.title') }}
        </h1>
        <p class="text-2xl text-700 line-height-3 mb-6">
          {{ $t('attendeePage.subtitle') }}
        </p>
      </div>
    </section>

    <section aria-label="Create attendee form">
      <create-attendee-component />
    </section>
  </main>
</template>

<script>
import CreateAttendeeComponent from '../components/create-attendee.component.vue'

export default {
  name: 'AttendeePage',
  components: { CreateAttendeeComponent },
}
</script>

<!-- No extra styles: PrimeVue theme + PrimeFlex handle layout -->
