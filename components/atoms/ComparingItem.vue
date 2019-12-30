<template lang="pug">
  .ComparingItem
    div(@click="isShowingModal = true")
      span.ComparingItem__text {{ name }}
      edit-button.ComparingItem__editBtn
    modal(
      :isShowing="isShowingModal"
      @on-closed="isShowingModal = false"
    )
      .ModalForm
        .FormContent
          span.Label 商品の名前
          .FormItem
            input(
              type="text"
              class="--stringField --head"
              v-model="name"
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

  created () {
    this.name = this.comparingItem.name
  }

  onClickedHeaderUpdate () {
    this.isShowingModal = false
    this.$emit('on-clicked-update-item', {
      itemKey: this.comparingItem.comparingItemKey,
      name: this.name,
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
</style>
