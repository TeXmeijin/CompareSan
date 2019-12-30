<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head 比較を編集する
  section.dataTable(v-if="!table.isEmpty()")
    compare-table-view(
      :initialTable="table"
    )
  section.commit
    c-button(type="primary" size="large" :block="true" @click="save") 保存する
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { namespace, Action } from 'vuex-class'
import firebase from 'firebase'

import {
  CompareTableClass,
  CompareTable,
} from '../../assets/javascript/types/tableTypes'
import { emptyTableFactory } from '../../assets/javascript/factory/emptyTableFactory'
import CompareTableView from '~/components/organisms/CompareTableView.vue'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

enum InputType {
  StringField,
  StringArea,
  Url,
  Select,
}

@Component({
  components: {
    CompareTableView,
  },
})
export default class EditPost extends Vue {
  table: CompareTableClass = emptyTableFactory()

  public async created (): Promise<void> {
    const savedData = await firebase
      .firestore()
      .collection('compare-data-v0_1_0')
      .doc(this.$route.params.postId)
      .get()

    const snapshot = savedData.data()

    if (!snapshot) {
      return
    }

    const table = snapshot.table as CompareTable

    this.table.data = table
  }

  @Auth.State uid

  save () {
    firebase
      .firestore()
      .collection('compare-data-v0_1_0')
      .doc(this.$route.params.postId)
      .set({
        uid: this.uid,
        table: this.table.data,
      })
      .then(() => {})
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
