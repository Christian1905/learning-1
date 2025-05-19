<script>
import MyToolbar from './public/components/my-toolbar.component.vue'
import Toast from 'primevue/toast'

export default {
  name: 'App',
  components: {
    MyToolbar,
    Toast,
  },
}
</script>

<template>
  <header>
    <my-toolbar />
  </header>
  <main>
    <router-view />
  </main>

  <Toast />
</template>

<style></style>
