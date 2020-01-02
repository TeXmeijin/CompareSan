<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head 比較をはじめる
  section.dataTable(v-if="table")
    compare-table-view(
      :initialTable="table"
    )
  section.Form
    .FormContent
      span.Label タイトル[必須]
      c-text-field(
        v-model="title"
        :block="true"
      ).FormItem
    .FormContent
      span.Label メモ（詳しい内容/補足など）
      textarea(
        v-model="content"
        rows="5"
      ).TextArea.FormItem
    .FormContent
      c-checkbox(
        v-model="isPublic"
        label="比較内容を公開する"
      )
  section.commit
    c-button(
      type="primary"
      :block="true"
      size="large"
      @click="save"
      :disabled="!CanPost"
    ) 保存する
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { CompareTableClass } from '../../assets/javascript/types/tableTypes'
import { displayMonitorFactory } from '../../assets/javascript/factory/displayMonitorFactory'
import { FirestoreCompareTableRepository } from '../../assets/javascript/Repository/FirestoreCompareTableRepository'
import ICompareTableRepository from '../../assets/javascript/Repository/ICompareTableRepository'
import CompareTableView from '~/components/organisms/CompareTableView.vue'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  components: {
    CompareTableView,
  },
})
export default class Post extends Vue {
  table: CompareTableClass = displayMonitorFactory()

  @Auth.State uid

  repository: ICompareTableRepository

  title: string = ''
  content: string = ''
  isPublic: boolean = true

  created () {
    this.repository = new FirestoreCompareTableRepository()
  }

  save () {
    this.repository
      .create({
        uid: this.uid,
        table: this.table.data,
        title: this.title,
        content: this.content,
        is_public: this.isPublic,
        created_at: Date.now(),
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
        this.$router.push({
          name: 'post-postId',
          params: {
            postId: docRef.id,
          },
        })
      })
  }

  public get CanPost (): boolean {
    return !!this.title
  }
}
</script>

<style lang="scss" scoped>
.sec-main {
  background: $white;
  color: $body;
  padding: 40px 0;
  min-height: 100vh;

  .heading {
    text-align: center;
    padding: 0 12px;

    .heading__head {
      font-weight: bold;
      font-size: 1.4rem;
    }
  }

  .dataTable {
    padding: 24px 12px 8px;
    overflow-x: scroll;
    color: $body;
  }

  .commit {
    padding: 12px;
  }
}

.TextArea {
  font-size: 1rem;
  border: 1px solid $gray-light-3;
  border-radius: 4px;
}
</style>
