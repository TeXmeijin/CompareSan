<template lang="pug">
  .TableHeader(:style="{ width: `${rowWidth}px` }")
    .emptyHeaderItem(:style="{ minWidth: headWidth }")
    .TableHeaderItem(v-for="header in tableHeader" :style="{ width: cellWidth }")
      comparing-item(
        :comparing-item="header"
        @on-clicked-remove-item="$emit('on-clicked-remove-item', $event)"
        @on-clicked-update-item="$emit('on-clicked-update-item', $event)"
      )
    .TableAddItem(
      :style="{ minWidth: headWidth }"
    )
      action-button(@click="$emit('on-clicked-add-item')") 商品を追加
</template>

<script lang="ts">
import Vue from 'vue'

import { namespace } from 'vuex-class'

import { Component, Prop } from 'vue-property-decorator'
import { TableHeader } from '../../assets/javascript/types/tableTypes'
import * as tableSize from '~/store/tableSize'
const TableSize = namespace(tableSize.name)

@Component({
  components: {
    ComparingItem: () => import('~/components/atoms/ComparingItem.vue'),
  },
})
export default class TableHeaderVue extends Vue {
  @Prop({
    type: Array,
    required: true,
  })
  tableHeader: TableHeader

  @TableSize.Getter headWidth
  @TableSize.Getter headWidthRaw
  @TableSize.Getter cellWidth
  @TableSize.Getter cellWidthRaw
  @TableSize.Getter cellHeight

  get rowWidth (): number {
    // 200は商品追加ボタンの幅
    return this.headWidthRaw + this.cellWidthRaw * this.tableHeader.length + 200
  }
}
</script>

<style lang="scss" scoped>
.TableHeader {
  display: flex;
  align-items: center;

  .TableHeaderItem {
    text-align: center;
    font-weight: bold;
  }

  .TableAddItem {
    padding: 0 8px;
  }
}
</style>
