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
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import {
  CompareTableClass,
  CompareTable,
} from '../../assets/javascript/types/tableTypes'
import { emptyTableFactory } from '../../assets/javascript/factory/emptyTableFactory'
import { FirestoreCompareTableRepository } from '../../assets/javascript/Repository/FirestoreCompareTableRepository'
import CompareTableView from '~/components/organisms/CompareTableView.vue'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  components: {
    CompareTableView,
  },
})
export default class EditPost extends Vue {
  table: CompareTableClass = emptyTableFactory()

  public async created (): Promise<void> {
    const snapshot = await new FirestoreCompareTableRepository().findById(
      this.$route.params.postId
    )

    if (!snapshot) {
      return
    }

    const table = snapshot.table as CompareTable

    this.table.data = table
  }

  @Auth.State uid

  save () {
    new FirestoreCompareTableRepository()
      .update(this.$route.params.postId, this.uid, this.table.data)
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
