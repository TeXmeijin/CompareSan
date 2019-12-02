<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head 比較をはじめる
  section.dataTable
    table.table
      tr.heading
        th.heading__header
        th.heading__header(v-for="product in products")
          input(
            type="text"
            class="--stringField"
            v-model="product.name"
          )
        th.heading__header
          button(type="button" @click="addColumn").btn 追加
      tr.data(v-for="(data, index) in tableData")
        td.data__value
          input(
            type="text"
            class="--stringField --head"
            v-model="data['checkPoint']"
          )
        td.data__value(v-for="(key, index) in tableColumns")
          component(
            :is="tagOf(data.__type)"
            :type="typeOf(data.__type)"
            class="--stringField"
            v-model="data[key]"
          )
        td.data__value
          button(type="button" @click="removeRow(index)").btn 削除
      tr.footer
        td.footer__addPoint
          button(type="button" @click="addRow").btn 追加
        td(v-for="(key, index) in tableColumns")
          button(type="button" @click="removeColumn(key)").btn 削除
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
    return this.compares.map((data, index) => {
      return {
        __type: data.meta.type,
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
    return this.products.map(el => el.id)
  }
  public get tableOptions () {
    const headings = {}
    this.products.forEach((product) => {
      headings[product.id] = product.name
    })
    const editableColumns = this.products.map((product) => {
      return product.id
    })
    return {
      headings: {
        checkPoint: '',
        ...headings
      },
      filterable: false,
      editableColumns
    }
  }
  tagOf (type: InputType): string {
    return type === InputType.StringField ? 'input' : 'span';
  }
  typeOf (type: InputType): string {
    return type === InputType.StringField ? 'text' : '';
  }
  addRow () {
    const value = {}
    this.tableColumns.forEach((column) => {
      value[column] = '';
    })
    this.compares.push({
      meta: {
        name: '',
        type: InputType.StringField
      },
      value
    })
  }
  addColumn () {
    const generateRandom = (): string => {
      // 生成する文字列の長さ
      const l = 8

      // 生成する文字列に含める文字セット
      const c = 'abcdefghijklmnopqrstuvwxyz0123456789';

      const cl = c.length
      let r = '';
      for (let i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)]
      }
      return r
    };
    const rand: string = generateRandom()
    this.products.push({
      id: rand,
      name: ''
    })
  }
  removeRow (index: number) {
    this.compares.splice(index, 1)
  }
  removeColumn (id: string) {
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
    padding: 24px 12px;
    overflow-x: scroll;
    color: $body;

    .table {
      background: $white;

      .heading {
        border-bottom: 1px solid $gray-light-3;

        .heading__header {
          padding: 8px;

          &:first-child {
            min-width: 96px;
          }
        }
      }

      .data {
        .data__value {
          padding: 8px;

          .--head {
            width: 96px;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.--stringField {
  border: 1px solid $gray-light-3;
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
}
</style>
