<template lang="pug">
  .footer
    .footer__addPoint.--actionCell(:style="{ minWidth: headWidth }")
      button(type="button" @click="isShowingAddRowModal = true").--miniBtn 追加
    .--actionCell(v-for="comparingItem in header" :style="{ minWidth: cellWidth }")
      button(type="button" @click="$emit('on-clicked-remove-item', comparingItem.comparingItemKey)").--miniBtn 削除
    modal(
      :isShowing="isShowingAddRowModal"
      @on-closed="isShowingAddRowModal = false"
    )
      .CellUpdate
        span.Label セルの種類を選択
        .SelectCellType
          select(v-model="cellType").selector
            option(
              :key="type"
              :value="type"
              :selected="defaultType === type"
              v-for="type in CellTypeMaster"
            ) {{ type }}
        .Submit
          button(
            @click="onClickedAddRowSubmit"
            :disabled="!cellType"
            class="--mediumButton"
          ) 行を追加
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'

import { TableHeader, CellType } from '../../assets/javascript/types/tableTypes';

import * as tableSize from '~/store/tableSize'
import { namespace } from 'vuex-class'
const TableSize = namespace(tableSize.name)

export interface AddRowContent {
  type: CellType | null
}

@Component({
  components: {
    Modal: () => import('~/components/atoms/Modal.vue'),
  }
})
export default class Footer extends Vue {
  @Prop({
    type: Array,
    required: true,
  })
  header: TableHeader

  isShowingAddRowModal: boolean = false

  cellType: CellType | null = null
  defaultType = CellType.TEXT

  @TableSize.Getter headWidth
  @TableSize.Getter cellWidth

  public get CellTypeMaster(): string[] {
    return [
      CellType.TEXT,
      CellType.TEXT_WITH_EVALUATION,
      CellType.IMAGE,
      CellType.URL,
    ]
  }

  onClickedAddRowSubmit() {
    this.isShowingAddRowModal = false
    this.$emit('on-clicked-add-row', {
      type: this.cellType
    } as AddRowContent)
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
}
</style>
