<template lang="pug">
  .ComparingPoint
    span.ComparingPoint__text {{ name }}
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ComparingPoint } from '../../assets/javascript/types/tableTypes'

export default Vue.extend({
  props: {
    comparingItem: {
      type: Object,
      required: true
    } as PropOptions<ComparingPoint>
  },
  computed: {
    name (): string {
      return this.comparingItem.name
    }
  }
})
</script>
