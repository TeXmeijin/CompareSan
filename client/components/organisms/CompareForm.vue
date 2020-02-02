<template lang="pug">
form
  section.Form
    .FormContent
      span.Label タイトル[必須]
      c-text-field(
        v-model="formTitle"
        :block="true"
      ).FormItem
  section.Form
    span.Label 比較表
  compare-table-view(
    :initialTable="formTable"
  )
  section.Form
    .FormContent
      span.Label 比較の内容（補足やメモなど）
      client-only
        vue-simplemde(
          v-model="formContent"
          :configs="{ spellChecker: false, }"
        ).TextArea.FormItem
    .FormContent
      c-checkbox(
        v-model="formIsPublic"
        label="比較内容を公開する"
      )
  section.commit
    c-button(
      type="primary"
      :block="true"
      size="large"
      @click="$emit('on-submitted', article)"
      :disabled="!CanPost"
    ) 保存する
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { CompareTable } from '../../assets/javascript/types/tableTypes'
import { CompareArticle } from '../../assets/javascript/types/articleTypes'
import CompareTableView from '~/components/organisms/CompareTableView.vue'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  components: {
    CompareTableView,
  },
})
export default class CompareForm extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  table: CompareTable
  formTable: CompareTable

  @Prop({
    type: String,
    required: true,
  })
  title
  formTitle = ''

  @Prop({
    type: String,
    default: '',
  })
  content
  formContent = ''

  @Prop({
    type: Boolean,
    default: true,
  })
  isPublic
  formIsPublic = true

  @Auth.State uid

  created () {
    this.formTable = this.table
    this.formTitle = this.title
    this.formContent = this.content
    this.formIsPublic = this.isPublic
  }

  get article (): CompareArticle {
    return {
      uid: this.uid,
      table: this.formTable,
      title: this.formTitle,
      // h1タグは禁止。勝手にh2に変換する
      content: this.formContent,
      is_public: this.formIsPublic,
      created_at: Date.now(),
    }
  }

  get CanPost (): boolean {
    return !!this.formTitle
  }
}
</script>

<style lang="scss" scoped>
.dataTable {
  padding: 8px 0;
  @include mq {
    padding-left: 12px;
    padding-right: 12px;
  }
  color: $body;
}

.commit {
  padding: 12px;
}

.TextArea {
  padding: 8px;
  font-size: 1rem;
  border: 1px solid $gray-light-3;
  border-radius: 4px;
}
</style>
