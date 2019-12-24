<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head 比較をはじめる
  section.dataTable(v-if="table")
    compare-table-view(
      :initialTable="table"
    )
  section.commit
    button(type="button" @click="save").--mediumButton.primary 保存する
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { namespace, Action } from 'vuex-class'
import firebase from 'firebase'

import CompareTableView from '~/components/organisms/CompareTableView.vue'

import * as auth from '~/store/auth'
import { CompareTableClass } from '../../assets/javascript/types/tableTypes'
import { displayMonitorFactory } from '../../assets/javascript/factory/displayMonitorFactory'
const Auth = namespace(auth.name)

@Component({
  components: {
    CompareTableView,
  },
})
export default class Post extends Vue {
  table: CompareTableClass = displayMonitorFactory()

  @Auth.State uid

  save() {
    console.log(this.table)
    return
    firebase
      .firestore()
      .collection('compare-san/v0_1_0')
      .add({
        uid: this.uid,
        table: this.table,
      })
      .then(docRef => {
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
