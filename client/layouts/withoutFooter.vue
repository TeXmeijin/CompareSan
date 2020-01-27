<template lang="pug">
  main.Main
    the-header
    nuxt
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '../components/molecules/Layout/TheHeader.vue'

export default Vue.extend({
  components: {
    TheHeader,
  },
})
</script>

<style lang="scss" scoped></style>
