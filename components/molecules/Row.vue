<template lang="pug">
.row
  .head(:style="{ minWidth: headWidth }")
    comparing-point(:comparing-item="head")
  .cell(:style="{ minWidth: cellWidth }" v-for="cell in cells" :key="cell.comparingItemKey")
    cell(
      :cell="cell"
      @on-updated-cell-value="$emit('on-updated-cell-value', $event)"
      @on-updated-cell-evaluate="$emit('on-updated-cell-evaluate', $event)"
    )
  .data__value.--actionCell
    button(type="button" @click="$emit('on-clicked-remove-row', row.rowKey)").--miniBtn 削除
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {
  Row,
  ComparingPoint,
  Cell,
  TableHeader,
} from '../../assets/javascript/types/tableTypes'

import * as tableSize from '~/store/tableSize'
import { Component, Prop } from 'vue-property-decorator'
const TableSize = namespace(tableSize.name)

import ComparingPointVue from '../atoms/ComparingPoint.vue'
import CellVue from '../atoms/Cell.vue'
import { namespace } from 'vuex-class'

@Component({
  components: {
    ComparingPoint: ComparingPointVue,
    Cell: CellVue,
  },
})
export default class RowView extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  row: Row

  @Prop({
    type: Array,
    required: true,
  })
  tableHeader: TableHeader

  @TableSize.Getter headWidth
  @TableSize.Getter cellWidth

  public get head(): ComparingPoint {
    return this.row.head
  }
  public get cells(): Cell[] {
    const removedKeys = this.tableHeader
      .filter(head => {
        return head.deleted_at !== undefined
      })
      .map(head => head.comparingItemKey)

    if (removedKeys.length <= 0) {
      return this.row.cells
    }

    return this.row.cells.filter(cell => {
      return !removedKeys.includes(cell.comparingItemKey)
    })
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;

  .head {
    padding: 12px 0;
  }
}
</style>
