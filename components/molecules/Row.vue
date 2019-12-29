<template lang="pug">
.row
  .head(:style="{ minWidth: headWidth }")
    comparing-point(:comparing-item="head")
  .cell(:style="{ width: cellWidth }" v-for="cell in cells" :key="cell.comparingItemKey")
    cell(
      :cell="cell"
      @on-updated-cell-value="$emit('on-updated-cell-value', $event)"
      @on-updated-cell-evaluate="$emit('on-updated-cell-evaluate', $event)"
    )
  .row__action.--actionCell
    button(type="button" @click="isShowingUpdateModal = true").--miniBtn 編集
    button(type="button" @click="$emit('on-clicked-remove-row', row.rowKey)").--miniBtn 削除
  modal(
    :isShowing="isShowingUpdateModal"
    @on-closed="isShowingUpdateModal = false"
  )
    .CellUpdate
      span.Label セルの種類を選択
      .SelectCellType
        select(v-model="cellType").selector
          option(
            :key="type"
            :value="type"
            :selected="head.type === type"
            v-for="type in CellTypeMaster"
          ) {{ type }}
      .Submit
        button(
          @click="onClickedSaveCellUpdate"
          :disabled="!cellType"
          class="--mediumButton"
        ) 保存する
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {
  Row,
  ComparingPoint,
  Cell,
  TableHeader,
  CellType,
} from '../../assets/javascript/types/tableTypes'

import * as tableSize from '~/store/tableSize'
import { Component, Prop } from 'vue-property-decorator'
const TableSize = namespace(tableSize.name)

import ComparingPointVue from '../atoms/ComparingPoint.vue'
import CellVue from '../atoms/Cell.vue'
import { namespace } from 'vuex-class'

export interface UpdateRowContent {
  rowKey: string,
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
  cellType = null

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

  public get CellTypeMaster(): string[] {
    return [
      CellType.TEXT,
      CellType.TEXT_WITH_EVALUATION,
      CellType.IMAGE,
      CellType.URL,
    ]
  }

  onClickedSaveCellUpdate() {
    this.isShowingUpdateModal = false
    const update: UpdateRowContent = {
      rowKey: this.row.rowKey,
      type: this.cellType
    }
    this.$emit('on-clicked-update-row', update)
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
