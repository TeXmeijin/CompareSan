<template lang="pug">
.row
  .head(:style="{ minWidth: headWidth }")
    comparing-point(:comparing-item="head")
  .cell(:style="{ width: cellWidth }" v-for="cell in cells" :key="cell.comparingItemKey")
    text-cell(:cell="cell")
  .data__value.--actionCell
    button(type="button" @click="removeRow(index)").--miniBtn 削除
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Row, ComparingPoint, Cell } from '../../assets/javascript/types/tableTypes'

import * as tableSize from '~/store/tableSize'
import { Component, Prop } from 'vue-property-decorator';
const TableSize = namespace(tableSize.name)

import ComparingPointVue from '../atoms/ComparingPoint.vue';
import TextCellVue from '../atoms/TextCell.vue';
import { namespace } from 'vuex-class';

@Component({
  components: {
    ComparingPoint: ComparingPointVue,
    TextCell: TextCellVue
  }
})
export default class RowView extends Vue {
  @Prop({
    type: Object,
    required: true
  }) row: Row

  @TableSize.Getter headWidth;
  @TableSize.Getter cellWidth;

  public get head (): ComparingPoint {
    return this.row.head
  }
  public get cells (): Cell[] {
    return this.row.cells
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
}
</style>
