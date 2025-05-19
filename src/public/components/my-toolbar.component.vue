<script>
import LanguageSwitcher from './language-switcher.component.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default {
  name: 'MyToolbar',
  components: {
    LanguageSwitcher,
  },
  computed: {
    menuItems() {
      return [
        { label: this.t('toolbar.home'), to: '/' },
        { label: this.t('toolbar.event'), to: '/registration/event' },
        { label: this.t('toolbar.attendee'), to: '/registration/attendee' },
        { label: this.t('toolbar.checkIn'), to: '/registration/event-check-ins/new' },
        { label: this.t('toolbar.rating'), to: '/engagement/rating' },
      ]
    },
  },
  methods: {
    navigateTo(route) {
      this.router.push(route)
    },
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    return {
      t,
      router,
    }
  },
}
</script>

<template>
  <nav class="surface-0 shadow-2 relative z-5" role="banner">
    <pv-toolbar class="container mx-auto px-3">
      <template #start>
        <div class="flex align-items-center">
          <img
            src="https://logo.clearbit.com/eventify.io"
            alt="Eventify Logo"
            class="mr-2 h-2rem logo_img"
            @error="$event.target.src = 'https://via.placeholder.com/80x40?text=Eventify'"
          />
          <span class="font-medium text-900 hidden md:block vertical-align-middle ml-2">
            ISO 27001:2022 certified
          </span>
        </div>
      </template>

      <template #center>
        <nav class="flex justify-content-center" role="navigation">
          <pv-button
            v-for="item in menuItems"
            :key="item.label"
            :label="item.label"
            text
            class="mx-1 p-button-text p-button-rounded hover:surface-200 my-app-primary"
            @click="navigateTo(item.to)"
            aria-haspopup="true"
          />
        </nav>
      </template>

      <template #end>
        <div class="flex align-items-center">
          <language-switcher />
        </div>
      </template>
    </pv-toolbar>
  </nav>
</template>

<style scoped>
.logo_img {
  width: 60px;
  height: 60px !important;
}
/* Ajustes adicionales para responsive */
@media screen and (max-width: 576px) {
  :deep(.p-toolbar) {
    flex-wrap: wrap;
    padding: 0.5rem;
  }

  :deep(.p-toolbar-group-start),
  :deep(.p-toolbar-group-center),
  :deep(.p-toolbar-group-end) {
    margin: 0.5rem 0;
  }

  :deep(.p-button) {
    font-size: 0.875rem;
    padding: 0.4rem 0.8rem;
  }
}

/* Ajustes para el logo */
.h-2rem {
  height: 2rem;
}
</style>
