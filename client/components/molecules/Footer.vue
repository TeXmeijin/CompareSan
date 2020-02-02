<template lang="pug">
  .footer
    action-button(
      :style="{ minWidth: headWidth }"
      @click="onClickedAddRowSubmit"
    ).footer__addPoint 比較ポイントを追加
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

  cellType: CellType | null = CellType.TEXT_WITH_EVALUATION

  @TableSize.Getter headWidth
  @TableSize.Getter cellWidth

  onClickedAddRowSubmit () {
    this.isShowingAddRowModal = false
    this.$emit('on-clicked-add-row', {
      type: this.cellType,
    } as AddRowContent)
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
