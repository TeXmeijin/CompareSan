<template lang="pug">
  .TableHeader
    .emptyHeaderItem(:style="{ minWidth: headWidth }")
    .TableHeaderItem(v-for="header in tableHeader" :style="{ minWidth: cellWidth }")
      comparing-item(:comparing-item="header")
    .TableAddItem.--actionCell
      c-button(size="small" @click="$emit('on-clicked-add-item')") 追加
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
  @TableSize.Getter cellWidth

  mounted () {}
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
}
</style>
