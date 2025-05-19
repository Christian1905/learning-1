<!-- engagement/components/add-rating.component.vue -->
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, between } from '@vuelidate/validators'
import { EventRatingService } from '../services/event-rating.service'

import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import ButtonPrime from 'primevue/button'

export default {
  name: 'AddRating',

  setup() {
    return { v$: useVuelidate() }
  },

  components: { InputText, InputNumber, ButtonPrime },

  data() {
    return {
      ticketIdentifier: '',
      rating: 3,
      loading: false,
      responseMessage: '',
      success: false,
      submitted: false,
      ratingService: new EventRatingService(),
    }
  },

  validations() {
    return {
      ticketIdentifier: { required },
      rating: { required, between: between(1, 5) },
    }
  },

  methods: {
    async handleSubmit() {
      this.submitted = true
      const isValid = await this.v$.$validate()
      console.log('isValid', isValid)
      if (!isValid) return
      console.log('isValid', isValid)

      try {
        this.loading = true
        const { message, success } = await this.ratingService.rateEvent(
          this.ticketIdentifier,
          this.rating,
        )

        this.success = success
        this.responseMessage = message

        if (success) {
          this.ticketIdentifier = ''
          this.rating = 3
          this.v$.$reset()
          this.submitted = false
        }
      } catch (e) {
        console.error(e)
        this.success = false
        this.responseMessage = this.$t('ratingForm.unexpectedError')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <section
    class="rating-card p-4 sm:p-6 border-round shadow-2 surface-card"
    role="form"
    aria-label="add-rating-form"
  >
    <!-- Título -->
    <header class="mb-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold line-height-2" aria-level="2">
        {{ $t('ratingForm.title') }}
      </h2>
    </header>

    <!-- Formulario -->
    <form @submit.prevent="handleSubmit" class="p-fluid">
      <!-- Ticket Identifier -->
      <div class="field mb-4">
        <label for="ticketIdentifier" class="block font-medium mb-2">
          {{ $t('ratingForm.ticketLabel') }}
        </label>

        <InputText
          id="ticketIdentifier"
          v-model="ticketIdentifier"
          :class="['w-full', { 'p-invalid': v$.ticketIdentifier.invalid && submitted }]"
          aria-describedby="ticketIdentifier-help"
          autocomplete="off"
        />

        <p
          id="ticketIdentifier-help"
          class="p-error mt-2 text-sm"
          v-if="v$.ticketIdentifier.$invalid && submitted"
        >
          {{ $t('ratingForm.ticketRequired') }}
        </p>
      </div>

      <!-- Rating -->
      <div class="field mb-4">
        <label for="rating" class="block font-medium mb-2">
          {{ $t('ratingForm.ratingLabel') }}
        </label>

        <InputNumber
          id="rating"
          v-model="rating"
          :min="1"
          :max="5"
          :showButtons="true"
          buttonLayout="horizontal"
          decrementButtonClass="p-button-secondary"
          incrementButtonClass="p-button-secondary"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          :class="['w-full', { 'p-invalid': v$.rating.$invalid && submitted }]"
          aria-describedby="rating-help"
        />

        <small id="rating-help" class="p-error" v-if="v$.rating.$invalid && submitted">
          {{ $t('ratingForm.ratingRequired') }}
        </small>
      </div>

      <!-- Botón -->
      <div class="flex justify-content-center mb-3">
        <ButtonPrime
          type="submit"
          :label="$t('ratingForm.rateButton')"
          icon="pi pi-star-fill"
          class="w-auto"
          :loading="loading"
        />
      </div>

      <!-- Mensaje de respuesta -->
      <Transition name="fade">
        <div
          v-if="responseMessage"
          :class="[
            'p-3 border-round text-center font-medium',
            success
              ? 'bg-green-50 text-green-700 border-1 border-green-300'
              : 'bg-red-50 text-red-700 border-1 border-red-300',
          ]"
          role="alert"
        >
          {{ responseMessage }}
        </div>
      </Transition>
    </form>
  </section>
</template>

<style scoped>
.rating-card {
  max-width: 500px;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
