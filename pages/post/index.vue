<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head 比較をはじめる
  section.dataTable
    data-table(
      :initialProducts="products"
      @changeProducts="products = $event"
      :initialCompares="compares"
      @changeCompares="compares = $event"
    )
  section.commit
    button(type="button" @click="save").--mediumButton.primary 保存する
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { namespace, Action } from 'vuex-class'
import firebase from 'firebase'

import {
  InputType,
  CompareOneRow,
  Product
} from '../../assets/javascript/types/tableTypes'
import DataTable from '~/components/organisms/dataTable.vue'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  components: {
    DataTable
  }
})
export default class Post extends Vue {
  compares: Array<CompareOneRow> = [];
  products: Array<Product> = [];

  public created (): void {
    this.products = [
      {
        id: 'FIRST',
        name: '比較製品１'
      },
      {
        id: 'SECOND',
        name: '比較製品２'
      }
    ]
    this.compares = [
      {
        meta: {
          name: 'メーカー',
          type: InputType.StringField
        },
        values: {
          FIRST: 'MSI',
          SECOND: 'IO-data'
        }
      },
      {
        meta: {
          name: '価格',
          type: InputType.Select
        },
        values: {
          FIRST: {
            value: '1',
            exactly: ''
          },
          SECOND: {
            value: '2',
            exactly: ''
          }
        }
      }
    ]
  }

  @Auth.State uid;

  save () {
    firebase
      .firestore()
      .collection('compare-san')
      .add({
        uid: this.uid,
        products: this.products,
        compares: this.compares
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
        this.$router.push({
          name: 'post-postId',
          params: {
            postId: docRef.id
          }
        })
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
