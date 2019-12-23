<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head 比較を編集する
  section.dataTable
    compare-table-view(
      :initialProducts="products"
      @changeProducts="products = $event"
      :initialCompares="compares"
      @changeCompares="compares = $event"
      v-if="products.length && compares.length"
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
const Auth = namespace(auth.name)

enum InputType {
  StringField,
  StringArea,
  Url,
  Select
}

@Component({
  components: {
    CompareTableView
  }
})
export default class EditPost extends Vue {
  compares: Array<any> = [];
  products: Array<any> = [];

  public async created (): Promise<void> {
    const savedData = await firebase.firestore().collection('compare-san').doc(this.$route.params.postId).get()

    const snapshot = savedData.data()

    if (!snapshot) {
      return
    }

    this.products = snapshot.products
    this.compares = snapshot.compares
  }

  @Auth.State uid;

  save () {
    firebase
      .firestore()
      .collection('compare-san')
      .doc(this.$route.params.postId)
      .set({
        uid: this.uid,
        products: this.products,
        compares: this.compares
      }).then(() => {
      })
  }
}
</script>

<style lang="scss" scoped>
.sec-main {
  background: linear-gradient(#20e5f3, #089dca) fixed;
  color: $white;
  padding: 40px 0;
  min-height: 100vh;

  .heading {
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
