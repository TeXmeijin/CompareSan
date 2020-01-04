<template lang="pug">
  .ReadOnlyTextCell
    span {{ cell.value }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { TextCell } from '~/assets/javascript/types/tableTypes'

@Component
export default class ReadOnlyTextCellVue extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  cell: TextCell
}
</script>

<style lang="scss" scoped>
.ReadOnlyTextCell {
  padding: 12px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  word-break: break-all;
}
</style>
