<template lang="pug">
  .ReadOnlyComparingItem
    span.ReadOnlyComparingItem__text {{ name }}
    span.ReadOnlyComparingItem__text ￥{{ price }}
    a(
      :href="url"
      v-if="!!url"
      target="_blank"
      rel="nofollow"
    ).ReadOnlyComparingItem__url {{ url }}
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
  price = 0
  url = ''

  created () {
    this.name = this.comparingItem.name
    this.price = this.comparingItem.price || 0
    this.url = this.comparingItem.url || ''
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__text {
    font-weight: bold;
  }

  &__url {
    font-size: 0.8rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    overflow-x: hidden;
    text-decoration: underline;
    color: $primary;
  }
}
</style>
