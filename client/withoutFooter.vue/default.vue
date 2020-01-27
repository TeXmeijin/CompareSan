<template lang="pug">
  main.Main
    the-header
    nuxt
    the-footer
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '../components/molecules/Layout/TheHeader.vue'
import TheFooter from '../components/molecules/Layout/TheFooter.vue'

export default Vue.extend({
  components: {
    TheHeader,
    TheFooter,
  },
})
</script>

<style lang="scss" scoped>
.Main {
  padding-bottom: 60px;
}
</style>
