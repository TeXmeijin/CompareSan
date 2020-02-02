<template lang="pug">
  .ReadOnlyTableHeader(:style="{ width: `${rowWidth}px` }")
    .emptyHeaderItem(:style="{ minWidth: headWidth }")
    .TableHeaderItem(v-for="header in tableHeader" :style="{ width: cellWidth }")
      comparing-item(
        :comparing-item="header"
      )
</template>

<script lang="ts">
import Vue from 'vue'

import { namespace } from 'vuex-class'

import { Component, Prop } from 'vue-property-decorator'
import { TableHeader } from '~/assets/javascript/types/tableTypes'
import * as tableSize from '~/store/tableSize'
const TableSize = namespace(tableSize.name)

@Component({
  components: {
    ComparingItem: () =>
      import('~/components/atoms/ReadOnly/ReadOnlyComparingItem.vue'),
  },
})
export default class ReadOnlyTableHeaderVue extends Vue {
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
    return this.headWidthRaw + this.cellWidthRaw * this.tableHeader.length
  }
}
</script>

<style lang="scss" scoped>
.ReadOnlyTableHeader {
  display: flex;
  align-items: center;

  .TableHeaderItem {
    text-align: center;
    font-weight: bold;
  }
}
</style>
