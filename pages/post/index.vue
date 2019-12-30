<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head 比較をはじめる
  section.dataTable(v-if="table")
    compare-table-view(
      :initialTable="table"
    )
  section.commit
    c-button(type="primary" :block="true" size="large" @click="save") 保存する
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

  created () {
    this.repository = new FirestoreCompareTableRepository()
  }

  save () {
    this.repository.create(this.uid, this.table.data).then((docRef) => {
      console.log('Document written with ID: ', docRef.id)
      this.$router.push({
        name: 'post-postId',
        params: {
          postId: docRef.id,
        },
      })
    })
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
    padding: 24px 12px;
    overflow-x: scroll;
    color: $body;
  }

  .commit {
    padding: 12px;
  }
}
</style>
