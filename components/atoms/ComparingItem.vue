<template lang="pug">
  .ComparingItem
    span.ComparingItem__text {{ name }}
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { ComparingItem } from '../../assets/javascript/types/tableTypes'

export default Vue.extend({
  props: {
    comparingItem: {
      type: Object,
      required: true
    } as PropOptions<ComparingItem>
  },
  computed: {
    name (): string {
      return this.comparingItem.name
    }
  }
})
</script>
