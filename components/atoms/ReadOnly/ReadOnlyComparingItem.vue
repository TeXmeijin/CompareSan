<template lang="pug">
  .ReadOnlyComparingItem
    span.ReadOnlyComparingItem__text {{ name }}
</template>

<script lang="ts">
import Vue from 'vue'

import { Prop, Component } from 'vue-property-decorator'
import { ComparingItem } from '~/assets/javascript/types/tableTypes'

export interface UpdateItemContent {
  itemKey: string
  name: string
}

@Component
export default class ReadOnlyComparingItemVue extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  comparingItem: ComparingItem

  name = ''

  created () {
    this.name = this.comparingItem.name
  }
}
</script>

<style lang="scss" scoped>
.ReadOnlyComparingItem {
  position: relative;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    font-weight: bold;
  }
}
</style>
