<script>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'LanguageSwitcher',
  setup() {
    const i18n = useI18n()
    const selectedLocale = ref(i18n.locale.value)

    const localeOptions = [
      { label: 'EN', value: 'en' },
      { label: 'ES', value: 'es' },
    ]

    watch(selectedLocale, (newLocale) => {
      if (typeof newLocale === 'string' && (newLocale === 'en' || newLocale === 'es')) {
        i18n.locale.value = newLocale
        localStorage.setItem('locale', newLocale)
      }
    })

    return {
      selectedLocale,
      localeOptions,
    }
  },
}
</script>

<template>
  <div class="language-switcher">
    <pv-select-button
      v-model="selectedLocale"
      :options="localeOptions"
      option-label="label"
      option-value="value"
      aria-label="Seleccionar idioma"
    />
  </div>
</template>

<style scoped>
.language-switcher {
  margin: 0 1rem;
}
</style>
