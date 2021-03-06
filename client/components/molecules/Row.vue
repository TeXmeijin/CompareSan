<template lang="pug">
.row(:style="{ width: `${rowWidth}px` }")
  .head(
    :style="{ maxWidth: headWidth, minWidth: headWidth, minHeight: cellHeight }"
    @click="isShowingUpdateModal = true"
  )
    comparing-point(:comparing-item="head")
  .cell(:style="{ width: cellWidth }" v-for="cell in cells" :key="cell.comparingItemKey")
    cell(
      :cell="cell"
      @on-updated-cell-value="$emit('on-updated-cell-value', $event)"
      @on-updated-cell-evaluate="$emit('on-updated-cell-evaluate', $event)"
    )
  modal(
    :isShowing="isShowingUpdateModal"
    @on-closed="isShowingUpdateModal = false"
  )
    .Form
      .FormContent
        span.Label 名前
        .FormItem
          c-text-field(
            v-model="cellName"
          )
      .FormContent.--no-border.--dense
        .Submit
          c-button(
            @click="onClickedRowUpdate"
            :disabled="!cellType"
            size="medium"
            :block="true"
          ) 保存する
      .FormContent.--no-border.--dense
        .Submit
          c-button(
            type="error-outlined"
            size="small"
            @click="onClickedRowDelete"
          ) 行を削除
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
} from '../../assets/javascript/types/tableTypes'

import ComparingPointVue from '../atoms/ComparingPoint.vue'
import CellVue from '../atoms/Cell.vue'
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
    Modal: () => import('~/components/atoms/Modal.vue'),
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

  isShowingUpdateModal = false
  cellType: null | CellType = null
  cellName = ''

  @TableSize.Getter headWidth
  @TableSize.Getter headWidthRaw
  @TableSize.Getter cellWidth
  @TableSize.Getter cellWidthRaw
  @TableSize.Getter cellHeight

  created () {
    this.cellType = this.row.head.type
    this.cellName = this.row.head.name
  }

  get rowWidth (): number {
    return this.headWidthRaw + this.cellWidthRaw * this.row.cells.length
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
    return [CellType.TEXT, CellType.TEXT_WITH_EVALUATION, CellType.URL]
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
.row {
  display: flex;

  &:nth-child(even) {
    background: $gray-light-4;
  }

  .cell {
    padding: 8px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }

  .head {
    box-sizing: border-box;
    padding: 8px 0;
    display: flex;
    padding: 4px 8px;
    border-right: 1px solid $gray-light-2;
  }

  &__action {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
