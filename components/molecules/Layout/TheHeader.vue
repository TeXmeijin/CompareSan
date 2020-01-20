<template lang="pug">
  header.Header
    nuxt-link(to="/").ServiceLogo
      img(:src="require('@/assets/img/brand/compare-san-logo-v0_4.svg')").ServiceLogo_image
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="scss" scoped>
.Header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $gray-light-4;
  box-shadow: 1px 2px 2px 1px $gray-light-3;
  margin-bottom: 3px;

  .ServiceLogo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    height: 60px;
    padding: 6px 12px;

    .ServiceLogo_image {
      max-height: 100%;
    }
  }
}
</style>
