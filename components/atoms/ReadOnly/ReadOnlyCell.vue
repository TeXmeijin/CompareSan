<template lang="pug">
  .ReadOnlyBaseCell
    component(
      :is="cellComponentName"
      :cell="cell"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import TextCell from './ReadOnlyTextCell.vue'
import TextWithEvaluateCellVue from './ReadOnlyTextWithEvaluateCell.vue'
import UrlCellVue from './ReadOnlyUrlCell.vue'
import { Cell, CellType } from '~/assets/javascript/types/tableTypes'

@Component({
  components: {
    TextCell,
    UrlCell: UrlCellVue,
    TextEvaluateCell: TextWithEvaluateCellVue,
  },
})
export default class ReadOnlyCellVue extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  cell: Cell

  get cellComponentName (): string {
    if (this.cell.type === CellType.TEXT) {
      return 'text-cell'
    }
    if (this.cell.type === CellType.URL) {
      return 'url-cell'
    }
    return 'text-evaluate-cell'
  }
}
</script>

<style lang="scss" scoped>
.ReadOnlyBaseCell {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 4px;
}
</style>
