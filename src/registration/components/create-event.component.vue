<!-- registration/components/create-event.component.vue -->
<template>
  <section
    class="event-card p-4 sm:p-6 border-round shadow-3 surface-card"
    role="form"
    aria-label="create-event-form"
  >
    <!-- Título -->
    <header class="text-center mb-4">
      <h2 class="text-2xl md:text-3xl font-bold">
        {{ $t('createEvent.title') }}
      </h2>
      <p class="text-color-secondary">
        {{ $t('createEvent.subtitle') }}
      </p>
    </header>

    <!-- Formulario -->
    <form @submit.prevent="handleSubmit" class="p-fluid">
      <!-- Event Name -->
      <div class="field mb-4">
        <label class="block font-medium mb-1" for="name">
          {{ $t('createEvent.nameLabel') }}
        </label>
        <InputText
          id="name"
          v-model="name"
          :class="['w-full', { 'p-invalid': v$.name.$invalid && submitted }]"
          autocomplete="off"
        />
        <small v-if="v$.name.$invalid && submitted" class="p-error">
          {{ $t('createEvent.nameRequired') }}
        </small>
      </div>

      <!-- Description -->
      <div class="field mb-4">
        <label class="block font-medium mb-1" for="description">
          {{ $t('createEvent.descriptionLabel') }}
        </label>
        <Textarea
          id="description"
          v-model="description"
          rows="4"
          autoResize
          :class="['w-full', { 'p-invalid': v$.description.$invalid && submitted }]"
        />
        <small v-if="v$.description.$invalid && submitted" class="p-error">
          {{ $t('createEvent.descriptionRequired') }}
        </small>
      </div>

      <!-- Scheduled Date -->
      <div class="field mb-4">
        <label class="block font-medium mb-1" for="date">
          {{ $t('createEvent.dateLabel') }}
        </label>
        <Calendar
          id="date"
          v-model="scheduledAt"
          showIcon
          dateFormat="yy-mm-dd"
          :class="['w-full', { 'p-invalid': v$.scheduledAt.$invalid && submitted }]"
        />
        <small v-if="v$.scheduledAt.$invalid && submitted" class="p-error">
          {{ $t('createEvent.dateRequired') }}
        </small>
      </div>

      <!-- Botón Guardar -->
      <div class="flex justify-content-center mt-4">
        <Button
          type="submit"
          :label="$t('createEvent.saveButton')"
          icon="pi pi-check"
          class="w-auto"
          :loading="loading"
        />
      </div>

      <!-- Mensaje de feedback -->
      <Transition name="fade">
        <div
          v-if="responseMessage"
          :class="[
            'p-3 border-round text-center font-medium mt-3',
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

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { EventService } from '../services/event.service'

import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'

export default {
  name: 'CreateEvent',

  setup() {
    return { v$: useVuelidate() }
  },

  components: { InputText, Textarea, Calendar, Button },

  data() {
    return {
      name: '',
      description: '',
      scheduledAt: null,
      loading: false,
      responseMessage: '',
      success: false,
      submitted: false,
      eventService: new EventService(),
    }
  },

  validations() {
    return {
      name: { required },
      description: { required },
      scheduledAt: { required },
    }
  },

  methods: {
    async handleSubmit() {
      this.submitted = true
      const isValid = await this.v$.$validate()
      if (!isValid) return

      try {
        this.loading = true
        const event = {
          id: null,
          name: this.name,
          description: this.description,
          scheduledAt: this.scheduledAt ? new Date(this.scheduledAt).toISOString() : null,
        }
        await this.eventService.create(event)

        this.success = true
        this.responseMessage = this.$t('createEvent.success')
        this.resetForm()
      } catch (e) {
        console.error(e)
        this.success = false
        this.responseMessage = this.$t('createEvent.error')
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.name = ''
      this.description = ''
      this.scheduledAt = null
      this.submitted = false
      this.v$.$reset()
    },
  },
}
</script>

<style scoped>
.event-card {
  max-width: 600px;
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
