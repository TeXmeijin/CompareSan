<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head 比較をはじめる
  section.dataTable
    v-client-table(
      v-model="tableData"
      :columns="tableColumns"
      :options="tableOptions"
    )
      template(v-if="products.length > 0")
        template(
          v-for="product in products"
        )
          input(
            type="text"
            :slot="`${product.id}`"
            slot-scope="{row, update}"
            v-model="row[`${product.id}`]"
            @input="update"
            class="--stringField"
          )
      //- input(
      //-   type="text"
      //-   :slot="`FIRST`"
      //-   slot-scope="{row, update}"
      //-   v-model="row[`FIRST`]"
      //-   @input="update"
      //-   class="--stringField"
      //- )
      //- input(
      //-   type="text"
      //-   :slot="`SECOND`"
      //-   slot-scope="{row, update}"
      //-   v-model="row[`SECOND`]"
      //-   @input="update"
      //-   class="--stringField"
      //- )
      button.delete(
        type="button"
        slot="remove"
        slot-scope="{row}"
        @click="remove(row.id)"
      )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace, Action } from 'vuex-class';

import * as auth from '~/store/auth';
const Auth = namespace(auth.name)

enum InputType {
  StringField,
  StringArea,
  Url,
  Select
}

@Component
export default class Post extends Vue {
  compares: Array<any> = [];
  products: Array<any> = [];

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
          type: InputType.StringField
        },
        values: {
          FIRST: '10,000',
          SECOND: '20,000'
        }
      }
    ]
  }

  public get tableData (): Array<any> {
    if (this.compares.length === 0) {
      return []
    }
    console.log(
      this.compares.map((data, index) => {
        return {
          checkPoint: data.meta.name,
          ...data.values
        }
      })
    )
    return this.compares.map((data, index) => {
      return {
        checkPoint: data.meta.name,
        ...data.values
      }
    })
  }
  public set tableData (newTableData: Array<any>) {
    console.log(newTableData)
  }
  public get tableColumns (): Array<any> {
    if (this.products.length === 0) {
      return []
    }
    const columns = ['checkPoint']
    console.log(columns.concat(this.products.map(el => el.id)))
    return columns.concat(this.products.map(el => el.id))
  }
  public get tableOptions () {
    const headings = {}
    this.products.forEach((product) => {
      headings[product.id] = product.name
    })
    const editableColumns = this.products.map((product) => {
      return product.id
    })
    console.log(editableColumns)
    return {
      headings: {
        checkPoint: '',
        ...headings
      },
      filterable: false,
      editableColumns
    }
  }
  remove (id: string) {
    console.log(id)
    this.products = this.products.filter((product) => {
      return product.id !== id
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
    padding: 0 12px;
    overflow-x: scroll;
  }
}

.--stringField {
  border: 1px solid $gray-light-3;
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
}
</style>
