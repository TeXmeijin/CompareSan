<template lang="pug">
.ReadOnlyRow
  .head(
    :style="{ minWidth: headWidth, minHeight: cellHeight }"
  )
    comparing-point(:comparing-item="head")
  .cell(:style="{ width: cellWidth }" v-for="cell in cells" :key="cell.comparingItemKey")
    cell(
      :cell="cell"
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import {
  Row,
  ComparingPoint,
  Cell,
  TableHeader,
  CellType,
} from '~/assets/javascript/types/tableTypes'

import ComparingPointVue from '~/components/atoms/ReadOnly/ReadOnlyComparingPoint.vue'
import CellVue from '~/components/atoms/ReadOnly/ReadOnlyCell.vue'
import * as tableSize from '~/store/tableSize'

const TableSize = namespace(tableSize.name)

export interface UpdateRowContent {
  rowKey: string
  type: CellType | null
  name: string
}

@Component({
  components: {
    ComparingPoint: ComparingPointVue,
    Cell: CellVue,
  },
})
export default class ReadOnlyRowView extends Vue {
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

  isShowingUpdateModal = false
  cellType: null | CellType = null
  cellName = ''

  @TableSize.Getter headWidth
  @TableSize.Getter cellWidth
  @TableSize.Getter cellHeight

  created () {
    this.cellType = this.row.head.type
    this.cellName = this.row.head.name
  }

  get head (): ComparingPoint {
    return this.row.head
  }
  get cells (): Cell[] {
    const removedKeys = this.tableHeader
      .filter((head) => {
        return head.deleted_at !== undefined
      })
      .map(head => head.comparingItemKey)

    if (removedKeys.length <= 0) {
      return this.row.cells
    }

    return this.row.cells.filter((cell) => {
      return !removedKeys.includes(cell.comparingItemKey)
    })
  }

  get CellTypeMaster (): string[] {
    return [
      CellType.TEXT,
      CellType.TEXT_WITH_EVALUATION,
      CellType.URL,
    ]
  }

  onClickedRowUpdate () {
    this.isShowingUpdateModal = false
    const update: UpdateRowContent = {
      rowKey: this.row.rowKey,
      type: this.cellType,
      name: this.cellName,
    }
    this.$emit('on-clicked-update-row', update)
  }

  onClickedRowDelete () {
    this.isShowingUpdateModal = false
    this.$emit('on-clicked-remove-row', this.row.rowKey)
  }
}
</script>

<style lang="scss" scoped>
.ReadOnlyRow {
  display: flex;
  border-top: 1px dashed $gray-light-2;

  &:nth-child(even) {
    background: $gray-light-4;
  }

  .cell {
    display: flex;
    align-items: center;
  }

  .head {
    display: flex;
    padding: 4px 0;
  }

  &__action {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
