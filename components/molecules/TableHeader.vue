<template lang="pug">
  .TableHeader
    .TableHeaderItem(v-for="header in tableHeader")
      comparing-item(:comparing-item="header")
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { TableHeader } from '../../assets/javascript/types/tableTypes';
import { namespace } from 'vuex-class';

import * as tableSize from '~/store/tableSize'
const TableSize = namespace(tableSize.name)

export default Vue.extend({
  name: 'TableHeader',
  components: {
    ComparingItem: () => import('~/components/atoms/ComparingItem.vue')
  },
  props: {
    tableHeader: {
      type: Array,
      required: true
    } as PropOptions<TableHeader>
  }
})
</script>

<style lang="scss" scoped>
.TableHeader {
  display: flex;
  align-items: center;
}
</style>
