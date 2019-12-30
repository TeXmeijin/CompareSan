<template lang="pug">
  .BaseCell
    component(
      :is="cellComponentName"
      :cell="cell"
      @on-updated-cell-value="$emit('on-updated-cell-value', $event)"
      @on-updated-cell-evaluate="$emit('on-updated-cell-evaluate', $event)"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Cell, CellType } from '../../assets/javascript/types/tableTypes'
import TextCell from './TextCell.vue'
import TextWithEvaluateCellVue from './TextWithEvaluateCell.vue'
import UrlCellVue from './UrlCell.vue'

@Component({
  components: {
    TextCell,
    UrlCell: UrlCellVue,
    TextEvaluateCell: TextWithEvaluateCellVue,
  },
})
export default class CellVue extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  cell: Cell

  public get cellComponentName (): string {
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
