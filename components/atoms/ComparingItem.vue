<template lang="pug">
  .Root
    div(@click="isShowingModal = true").ComparingItem
      span.ComparingItem__text {{ name }}
      span.ComparingItem__text ￥{{ price || '-' }}
      a(
        :href="url"
        v-if="url"
      ).ComparingItem__url {{ url }}
      edit-button.ComparingItem__editBtn
    modal(
      :isShowing="isShowingModal"
      @on-closed="isShowingModal = false"
    )
      .Form
        .FormContent
          span.Label 名前（型番）
          .FormItem
            c-text-field(
              v-model="name"
              block
            )
        .FormContent
          span.Label お値段
          .FormItem
            c-text-field(
              v-model="price"
              block
            )
        .FormContent
          span.Label 販売URL
          .FormItem
            c-text-field(
              v-model="url"
              block
            )
        .FormContent.--no-border.--dense
          .Submit
            c-button(
              @click="onClickedHeaderUpdate"
              :disabled="!name"
              size="medium"
              :block="true"
            ) 保存する
        .FormContent.--no-border.--dense
          .Submit
            c-button(
              type="error-outlined"
              size="small"
              @click="onClickedHeaderDelete"
            ) 商品を削除
</template>

<script lang="ts">
import Vue from 'vue'

import { Prop, Component } from 'vue-property-decorator'
import { ComparingItem } from '../../assets/javascript/types/tableTypes'

export interface UpdateItemContent {
  itemKey: string
  name: string
  price: number
  url: string
}

@Component({
  components: {
    Modal: () => import('~/components/atoms/Modal.vue'),
    EditButton: () => import('~/components/atoms/EditButton.vue'),
  },
})
export default class ComparingItemVue extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  comparingItem: ComparingItem

  isShowingModal = false
  name = ''
  price = 0
  url = ''

  created () {
    this.name = this.comparingItem.name
    this.price = this.comparingItem.price || 0
    this.url = this.comparingItem.url || ''
  }

  onClickedHeaderUpdate () {
    this.isShowingModal = false
    this.$emit('on-clicked-update-item', {
      itemKey: this.comparingItem.comparingItemKey,
      name: this.name,
      price: this.price,
      url: this.url,
    } as UpdateItemContent)
  }
  onClickedHeaderDelete () {
    this.isShowingModal = false
    this.$emit('on-clicked-remove-item', this.comparingItem.comparingItemKey)
  }
}
</script>

<style lang="scss" scoped>
.ComparingItem {
  position: relative;
  padding: 24px 4px;
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

  &__editBtn {
    position: absolute;
    right: 4px;
    bottom: 4px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    color: $gray-light-1;
  }
}

.Submit {
  text-align: left;
}
</style>
