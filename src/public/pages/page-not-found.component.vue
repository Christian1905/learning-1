<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'page-not-found',
  data() {
    return {
      unavailableRoute: null,
    }
  },
  created() {
    this.unavailableRoute = this.$route.path
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
}
</script>

<template>
  <div
    class="flex flex-column min-h-screen p-4"
  >
    <h1 class="text-4xl font-bold mb-2">{{ t('pageNotFound.title') }}</h1>
    <p class="text-lg mb-4" v-html="t('pageNotFound.message', { path: unavailableRoute })">
    </p>
    <router-link to="/home" class="pv-button p-button-rounded p-button-outlined w-auto">
      {{ t('pageNotFound.goHome') }}
    </router-link>
  </div>
</template>

<style scoped>
.text-center {
  text-align: left;
}
.pv-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  width: fit-content;
}
</style>
