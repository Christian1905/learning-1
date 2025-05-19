<!-- 
Este componente maneja la validación y check-in de tickets.
Funcionalidad principal:
1. Permite ingresar un identificador de ticket
2. Valida el ticket contra el backend
3. Si es válido y no tiene check-in: Marca la asistencia y muestra detalles
4. Si es inválido: Muestra mensaje de error
5. Si ya tiene check-in: Muestra mensaje de ya registrado
-->
<script>
import { useI18n } from 'vue-i18n'
import { CheckInService } from '../services/check-in.service.js'
import { TicketValidationResponse } from '../services/responses/ticket-validation.response.js'

export default {
  name: 'TicketValidation',
  // Estado del componente
  data() {
    return {
      ticketIdentifier: '', // ID del ticket a validar
      isLoading: false,    // Estado de carga durante la validación
      validationResult: null, // Resultado de la validación (SUCCESS, INVALID, ALREADY_CHECKED_IN)
      attendee: null,      // Datos del asistente si el ticket es válido
      event: null,         // Datos del evento si el ticket es válido
    }
  },
  // Propiedades computadas para manejar estados
  computed: {
    // Verifica si la validación fue exitosa
    isSuccess() {
      return this.validationResult === TicketValidationResponse.RESULT.SUCCESS
    },
    // Verifica si el ticket es inválido
    isInvalid() {
      return this.validationResult === TicketValidationResponse.RESULT.INVALID
    },
    // Verifica si el ticket ya fue usado para check-in
    isAlreadyCheckedIn() {
      return this.validationResult === TicketValidationResponse.RESULT.ALREADY_CHECKED_IN
    },
    // Formatea la fecha de check-in
    checkedInDate() {
      if (this.attendee && this.attendee.checkedInAt) {
        return new Date(this.attendee.checkedInAt).toLocaleString()
      }
      return ''
    },
  },
  setup() {
    const { t } = useI18n()
    const checkInService = new CheckInService()
    return { t, checkInService }
  },
  methods: {
    // Método principal para validar el ticket
    async validateTicket() {
      if (!this.ticketIdentifier.trim()) {
        return
      }

      this.isLoading = true
      this.validationResult = null
      this.attendee = null
      this.event = null

      try {
        // Llama al servicio para validar y hacer check-in
        const response = await this.checkInService.validateAndCheckIn(this.ticketIdentifier)
        // Actualiza el estado con la respuesta
        this.validationResult = response.result
        this.attendee = response.attendee
        this.event = response.event
      } catch (error) {
        console.error(error)
        this.validationResult = TicketValidationResponse.RESULT.INVALID
      } finally {
        this.isLoading = false
      }
    },
    // Reinicia el formulario
    resetForm() {
      this.ticketIdentifier = ''
      this.validationResult = null
      this.attendee = null
      this.event = null
    },
  },
}
</script>

<template>
  <div class="ticket-validation-container">
    <!-- Card principal de validación -->
    <pv-card class="shadow-4 border-round-xl pt-3">
      <!-- Título del formulario -->
      <template #title>
        <div class="text-center mb-4">
          <h2 class="text-3xl font-bold text-primary m-0">{{ t('ticketValidation.title') }}</h2>
        </div>
      </template>

      <template #content>
        <!-- Formulario de validación -->
        <div class="check-in-form mb-4">
          <form @submit.prevent="validateTicket" class="p-fluid">
            <!-- Campo de entrada del ticket -->
            <div class="field mb-4">
              <pv-float-label class="p-input-filled">
                <pv-input-text
                  id="ticketIdentifier"
                  v-model="ticketIdentifier"
                  :disabled="isLoading"
                  class="p-inputtext-lg w-full"
                  aria-describedby="ticket-help"
                />
                <label for="ticketIdentifier">{{ t('ticketValidation.ticketLabel') }}</label>
              </pv-float-label>
              <p id="ticket-help" class="mt-2 text-sm">
                {{ t('ticketValidation.ticketHelp') }}
              </p>
            </div>

            <!-- Botones de acción -->
            <div class="flex justify-content-between">
              <!-- Botón de reinicio -->
              <pv-button
                type="button"
                :label="t('ticketValidation.resetButton')"
                icon="pi pi-refresh"
                class="p-button-outlined p-button-rounded"
                :disabled="isLoading || !ticketIdentifier"
                @click="resetForm"
              />

              <!-- Botón de check-in -->
              <pv-button
                type="submit"
                :label="t('ticketValidation.checkInButton')"
                icon="pi pi-check-circle"
                class="p-button-primary p-button-rounded"
                :loading="isLoading"
                :disabled="!ticketIdentifier"
              />
            </div>
          </form>
        </div>

        <!-- Resultados de la validación -->
        <div
          v-if="validationResult"
          class="validation-results mt-5 p-4 border-round-lg"
          :class="{
            'bg-green-50': isSuccess,
            'bg-red-50': isInvalid,
            'bg-yellow-50': isAlreadyCheckedIn,
          }"
        >
          <!-- Mensaje de ticket inválido -->
          <div v-if="isInvalid" class="flex align-items-center">
            <i class="pi pi-times-circle text-red-500 text-5xl mr-3"></i>
            <h3 class="text-red-700 font-bold text-xl m-0">
              {{ t('ticketValidation.invalidTicket') }}
            </h3>
          </div>

          <!-- Mensaje de ya registrado -->
          <div v-else-if="isAlreadyCheckedIn" class="flex align-items-center">
            <i class="pi pi-exclamation-circle text-yellow-500 text-5xl mr-3"></i>
            <h3 class="text-yellow-700 font-bold text-xl m-0">
              {{ t('ticketValidation.alreadyCheckedIn') }}
            </h3>
          </div>

          <!-- Detalles del evento y asistente si el ticket es válido -->
          <div v-if="attendee && event" class="mt-4 p-3 surface-card border-round shadow-1">
            <h3 class="text-xl font-bold mb-3 text-primary">
              {{ t('ticketValidation.attendeeDetails') }}
            </h3>

            <div class="grid">
              <!-- Información del evento -->
              <div class="col-12 md:col-6">
                <div class="p-card p-3 h-full">
                  <h4 class="font-bold text-lg text-primary mb-3">
                    <i class="pi pi-calendar mr-2"></i>
                    {{ t('ticketValidation.eventInfo') }}
                  </h4>
                  <div class="detail-row py-1">
                    <span class="font-semibold">{{ t('ticketValidation.eventId') }}:</span>
                    <span>{{ event.id }}</span>
                  </div>
                  <div class="detail-row py-1">
                    <span class="font-semibold">{{ t('ticketValidation.eventName') }}:</span>
                    <span>{{ event.name }}</span>
                  </div>
                  <div class="detail-row py-1">
                    <span class="font-semibold">{{ t('ticketValidation.eventDescription') }}:</span>
                    <span>{{ event.description }}</span>
                  </div>
                  <div class="detail-row py-1">
                    <span class="font-semibold">{{ t('ticketValidation.scheduledAt') }}:</span>
                    <span>{{ new Date(event.scheduledAt).toLocaleString() }}</span>
                  </div>
                </div>
              </div>

              <!-- Información del asistente -->
              <div class="col-12 md:col-6">
                <div class="p-card p-3 h-full">
                  <h4 class="font-bold text-lg text-primary mb-3">
                    <i class="pi pi-user mr-2"></i>
                    {{ t('ticketValidation.attendeeInfo') }}
                  </h4>
                  <div class="detail-row py-1">
                    <span class="font-semibold">{{ t('ticketValidation.attendeeId') }}:</span>
                    <span>{{ attendee.id }}</span>
                  </div>
                  <div class="detail-row py-1">
                    <span class="font-semibold">{{ t('ticketValidation.attendeeName') }}:</span>
                    <span>{{ attendee.name }}</span>
                  </div>
                  <div class="detail-row py-1">
                    <span class="font-semibold">{{ t('ticketValidation.ticketId') }}:</span>
                    <span>{{ attendee.ticketIdentifier }}</span>
                  </div>
                  <div class="detail-row py-1">
                    <span class="font-semibold">{{ t('ticketValidation.checkedInAt') }}:</span>
                    <span :class="{ 'font-bold text-green-600': isSuccess }">
                      {{ checkedInDate }}
                    </span>
                  </div>
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
.ticket-validation-container {
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
}

.check-in-form {
  max-width: 500px;
  margin: 0 auto;
}

/* Estilos para las filas de detalles */
.detail-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.detail-row .font-semibold {
  color: var(--primary-600);
  margin-bottom: 0.25rem;
}

/* Ajustes responsivos */
@media screen and (min-width: 768px) {
  .detail-row {
    flex-direction: row;
    justify-content: space-between;
  }

  .detail-row .font-semibold {
    min-width: 120px;
    margin-bottom: 0;
  }
}
</style>
