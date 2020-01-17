<template lang="pug">
  .footer
    action-button(
      :style="{ minWidth: headWidth }"
      @click="isShowingAddRowModal = true"
    ).footer__addPoint 比較ポイントを追加
    modal(
      :isShowing="isShowingAddRowModal"
      @on-closed="cellType = null; isShowingAddRowModal = false"
    )
      .Form
        .FormContent
          span.Label セルの種類を選択
          .FormItem
            select(v-model="cellType").selector
              option(
                :key="type"
                :value="type"
                :selected="defaultType === type"
                v-for="type in CellTypeMaster"
              ) {{ type }}
        .FormContent.--dense.--no-border
          .Submit
            c-button(
              @click="onClickedAddRowSubmit"
              :disabled="!cellType"
              size="medium"
              type="primary"
              :block="true"
            ) 行を追加
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
import { TableHeader, CellType } from '../../assets/javascript/types/tableTypes'

import * as tableSize from '~/store/tableSize'
const TableSize = namespace(tableSize.name)

export interface AddRowContent {
  type: CellType | null
}

@Component({
  components: {
    Modal: () => import('~/components/atoms/Modal.vue'),
  },
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

  public get CellTypeMaster (): string[] {
    return [
      CellType.TEXT,
      CellType.TEXT_WITH_EVALUATION,
      CellType.IMAGE,
      CellType.URL,
    ]
  }

  onClickedAddRowSubmit () {
    this.isShowingAddRowModal = false
    this.$emit('on-clicked-add-row', {
      type: this.cellType,
    } as AddRowContent)
    this.cellType = null
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  padding: 16px 0;

  &__addPoint {
    padding: 0 8px;
  }
}
</style>
