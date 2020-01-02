<template lang="pug">
form
  section.dataTable
    compare-table-view(
      :initialTable="formTable"
    )
  section.Form
    .FormContent
      span.Label タイトル[必須]
      c-text-field(
        v-model="formTitle"
        :block="true"
      ).FormItem
    .FormContent
      span.Label メモ（詳しい内容/補足など）
      textarea(
        v-model="formContent"
        rows="5"
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
import { CompareTableClass } from '../../assets/javascript/types/tableTypes'
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
  table: CompareTableClass
  formTable: CompareTableClass

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
      table: this.formTable.data,
      title: this.formTitle,
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
  padding: 24px 12px 8px;
  overflow-x: scroll;
  color: $body;
}

.commit {
  padding: 12px;
}
</style>
