<template lang="pug">
  .TableHeader
    .emptyHeaderItem(:style="{ minWidth: headWidth }")
    .TableHeaderItem(v-for="header in tableHeader" :style="{ width: cellWidth }")
      comparing-item(:comparing-item="header")
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { TableHeader } from '../../assets/javascript/types/tableTypes';
import { namespace } from 'vuex-class';

import { Component, Prop } from 'vue-property-decorator';
import * as tableSize from '~/store/tableSize'
const TableSize = namespace(tableSize.name)

@Component({
  components: {
    ComparingItem: () => import('~/components/atoms/ComparingItem.vue')
  }
})
export default class TableHeaderVue extends Vue {
  @Prop({
    type: Array,
    required: true
  }) tableHeader: TableHeader

  @TableSize.Getter headWidth;
  @TableSize.Getter cellWidth;

  mounted() {
    console.log(this.headWidth)
  }
}
</script>

<style lang="scss" scoped>
.TableHeader {
  display: flex;
  align-items: center;
}
</style>
