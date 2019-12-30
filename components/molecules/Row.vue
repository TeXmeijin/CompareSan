<template lang="pug">
.row
  .head(
    :style="{ minWidth: headWidth, minHeight: cellHeight }"
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
    .ModalForm
      .FormContent
        span.Label 名前
        .FormItem
          input(
            type="text"
            class="--stringField --head"
            v-model="cellName"
          )
      .FormContent
        span.Label セルの種類
        .FormItem
          select(v-model="cellType").selector
            option(
              :key="type"
              :value="type"
              v-for="type in CellTypeMaster"
            ) {{ type }}
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
  @TableSize.Getter cellWidth
  @TableSize.Getter cellHeight

  created () {
    this.cellType = this.row.head.type
    this.cellName = this.row.head.name
  }

  public get head (): ComparingPoint {
    return this.row.head
  }
  public get cells (): Cell[] {
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

  public get CellTypeMaster (): string[] {
    return [
      CellType.TEXT,
      CellType.TEXT_WITH_EVALUATION,
      CellType.IMAGE,
      CellType.URL,
    ]
  }

  onClickedRowUpdate () {
    this.isShowingUpdateModal = false
    const update: UpdateRowContent = {
      rowKey: this.row.rowKey,
      type: this.cellType,
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
