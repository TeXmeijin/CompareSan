<template lang="pug">
  .TextCell
    input(
      type="text"
      class="--stringField --head"
      :value="cell.value"
      @input="$emit('on-updated-cell-value', { ...cell, value: $event.target.value })"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import { Cell, TextCell } from '../../assets/javascript/types/tableTypes'

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
}
</style>
