<script>
import TicketValidation from '../components/ticket-validation.component.vue.vue'

export default {
  name: 'CheckinPage',
  components: {
    TicketValidation,
  },
}
</script>

<template>
  <div class="checkin-view-container p-4">
    <h1 class="text-3xl font-bold mb-5 text-primary text-center">Check-In</h1>
    <ticket-validation />
  </div>
</template>

<style scoped>
.checkin-view-container {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 2em;
}
</style>
