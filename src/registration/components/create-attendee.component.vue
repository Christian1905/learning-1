<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { AttendeeService } from '../services/attendee.service'
import { EventService } from '../services/event.service'

import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

export default {
  name: 'CreateAttendee',

  setup() {
    return { v$: useVuelidate() }
  },

  components: { InputText, Textarea, Dropdown, Button },

  data() {
    return {
      eventOptions: [],
      eventId: null,
      name: '',
      description: '',
      ticketIdentifier: '',
      loading: false,
      responseMessage: '',
      success: false,
      submitted: false,
      attendeeService: new AttendeeService(),
      eventService: new EventService(),
    }
  },

  validations() {
    return {
      eventId: { required },
      name: { required },
      description: { required },
      ticketIdentifier: { required },
    }
  },

  async mounted() {
    // Load events for dropdown
    try {
      const events = await this.eventService.getAll()
      this.eventOptions = events
    } catch (e) {
      console.error('Failed to load events', e)
    }
  },

  methods: {
    async handleSubmit() {
      this.submitted = true
      const isValid = await this.v$.$validate()
      if (!isValid) return

      try {
        this.loading = true
        const attendee = {
          id: null,
          name: this.name,
          description: this.description,
          eventId: this.eventId,
          ticketIdentifier: this.ticketIdentifier,
          checkedInAt: null,
        }
        await this.attendeeService.create(attendee)

        this.success = true
        this.responseMessage = this.$t('createAttendee.success')
        this.resetForm()
      } catch (e) {
        console.error(e)
        this.success = false
        this.responseMessage = this.$t('createAttendee.error')
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.eventId = null
      this.name = ''
      this.description = ''
      this.ticketIdentifier = ''
      this.submitted = false
      this.v$.$reset()
    },
  },
}
</script>

<template>
  <section
    class="attendee-card p-4 sm:p-6 border-round shadow-3 surface-card"
    role="form"
    aria-label="create-attendee-form"
  >
    <!-- Header -->
    <header class="text-center mb-4">
      <h2 class="text-2xl md:text-3xl font-bold">
        {{ $t('createAttendee.title') }}
      </h2>
      <p class="text-color-secondary">
        {{ $t('createAttendee.subtitle') }}
      </p>
    </header>

    <form @submit.prevent="handleSubmit" class="p-fluid">
      <!-- Event Selector -->
      <div class="field mb-4">
        <label class="block font-medium mb-1" for="event">
          {{ $t('createAttendee.eventLabel') }}
        </label>
        <Dropdown
          id="event"
          v-model="eventId"
          :options="eventOptions"
          optionLabel="name"
          optionValue="id"
          :class="['w-full', { 'p-invalid': v$.eventId.$invalid && submitted }]"
        />
        <small v-if="v$.eventId.$invalid && submitted" class="p-error">
          {{ $t('createAttendee.eventRequired') }}
        </small>
      </div>

      <!-- Name -->
      <div class="field mb-4">
        <label class="block font-medium mb-1" for="name">
          {{ $t('createAttendee.nameLabel') }}
        </label>
        <InputText
          id="name"
          v-model="name"
          :class="['w-full', { 'p-invalid': v$.name.$invalid && submitted }]"
          autocomplete="off"
        />
        <small v-if="v$.name.$invalid && submitted" class="p-error">
          {{ $t('createAttendee.nameRequired') }}
        </small>
      </div>

      <!-- Description -->
      <div class="field mb-4">
        <label class="block font-medium mb-1" for="description">
          {{ $t('createAttendee.descriptionLabel') }}
        </label>
        <Textarea
          id="description"
          v-model="description"
          rows="3"
          autoResize
          :class="['w-full', { 'p-invalid': v$.description.$invalid && submitted }]"
        />
        <small v-if="v$.description.$invalid && submitted" class="p-error">
          {{ $t('createAttendee.descriptionRequired') }}
        </small>
      </div>

      <!-- Ticket Identifier -->
      <div class="field mb-4">
        <label class="block font-medium mb-1" for="ticket">
          {{ $t('createAttendee.ticketLabel') }}
        </label>
        <InputText
          id="ticket"
          v-model="ticketIdentifier"
          :class="['w-full', { 'p-invalid': v$.ticketIdentifier.$invalid && submitted }]"
          autocomplete="off"
        />
        <small v-if="v$.ticketIdentifier.$invalid && submitted" class="p-error">
          {{ $t('createAttendee.ticketRequired') }}
        </small>
      </div>

      <!-- Save Button -->
      <div class="flex justify-content-center mt-4">
        <Button
          type="submit"
          :label="$t('createAttendee.saveButton')"
          icon="pi pi-check"
          class="w-auto"
          :loading="loading"
        />
      </div>

      <!-- Feedback -->
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

<style scoped>
.attendee-card {
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
