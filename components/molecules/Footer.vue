<template lang="pug">
  .footer
    .footer__addPoint.--actionCell(:style="{ minWidth: headWidth }")
      button(type="button" @click="$emit('on-clicked-add-row')").--miniBtn 追加
    .--actionCell(v-for="comparingItem in header" :style="{ width: cellWidth }")
      button(type="button" @click="removeColumn(comparingItem.comparingItemKey)").--miniBtn 削除
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";

import { TableHeader } from '../../assets/javascript/types/tableTypes';

import * as tableSize from '~/store/tableSize'
import { namespace } from "vuex-class";
const TableSize = namespace(tableSize.name)

@Component
export default class Footer extends Vue {
  @Prop({
    type: Array,
    required: true
  }) header: TableHeader

  @TableSize.Getter headWidth;
  @TableSize.Getter cellWidth;

  addRow() {}

  removeColumn(key: string) {}
}
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    align-items: center;
  }
</style>
