<template lang="pug">
  .UrlCell(:style="{ width: cellWidth }")
    span(v-if="cell.value")
      a(:href="cell.value" rel="nofollow").Link {{ cell.value }}
    span(v-else @click="isShowingModal = true").Placeholder URLを入力...
    edit-button(
      @click="isShowingModal = true"
    ).EditButton
    modal(
      :isShowing="isShowingModal"
      @on-closed="isShowingModal = false"
    )
      .ModalForm
        .FormContent
          span.Label URL
          .FormItem
            c-text-field(
              v-model="url"
            )
        .FormContent.--no-border.--dense
          .Submit
            c-button(
              @click="isShowingModal = false; $emit('on-updated-cell-value', { ...cell, value: url })"
              :disabled="!url"
              size="medium"
              :block="true"
            ) 保存する
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { UrlCell } from '../../assets/javascript/types/tableTypes'
import * as tableSize from '~/store/tableSize'

const TableSize = namespace(tableSize.name)

@Component({
  components: {
    Modal: () => import('~/components/atoms/Modal.vue'),
    EditButton: () => import('~/components/atoms/EditButton.vue'),
  },
})
export default class UrlCellVue extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  cell: UrlCell

  isShowingModal = false
  url = ''

  created () {
    this.url = this.cell.value
  }

  @TableSize.Getter cellWidth
}
</script>

<style lang="scss" scoped>
.UrlCell {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  word-break: break-all;

  .Link {
    font-size: 0.8rem;
    text-decoration: underline;
  }

  .Placeholder {
    color: $gray;
    font-size: 0.8rem;
    font-style: italic;
  }

  .EditButton {
    position: absolute;
    right: 4px;
    bottom: 4px;
  }
}
</style>
