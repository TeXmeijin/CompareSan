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
      required: true,
    } as PropOptions<ComparingPoint>,
  },
  computed: {
    name(): string {
      return this.comparingItem.name
    },
  },
})
</script>

<style lang="scss" scoped>
.ComparingPoint {
  padding: 12px 0;
  border-radius: 4px;
  background: $gray-light-3;
  margin-right: 4px;
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    font-weight: bold;
  }
}
</style>
