<template lang="pug">
  .TextCell
    c-text-field(
      :value="cell.value"
      @input="$emit('on-updated-cell-value', { ...cell, value: $event })"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { TextCell } from '../../assets/javascript/types/tableTypes'

@Component
export default class TextCellVue extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  cell: TextCell
}
</script>

<style lang="scss" scoped>
.TextCell {
  display: flex;
  width: 100%;
}
</style>
