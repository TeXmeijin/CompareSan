<template lang="pug">
    table.table
      tr.heading
        th.heading__header
        th.heading__header(v-for="product in products")
          input(
            type="text"
            class="--stringField"
            v-model="product.name"
          )
        th.heading__header.--actionCell
          button(type="button" @click="addColumn").--miniBtn 追加
      tr.data(v-for="(data, index) in tableData")
        td.data__value
          input(
            type="text"
            class="--stringField --head"
            :value="data['checkPoint']"
            @input="updateCheckPoint(index, $event.target.value)"
          )
        td.data__value(v-for="(key) in tableColumns")
          component(
            :is="tagOf(data.__type)"
            :type="typeOf(data.__type)"
            class="--stringField"
            :value="data[key]"
            @input="updateValue(index, key, $event)"
          )
        td.data__value.--actionCell
          button(type="button" @click="removeRow(index)").--miniBtn 削除
      tr.footer
        td.footer__addPoint.--actionCell
          button(type="button" @click="addRow").--miniBtn 追加
        td(v-for="(key, index) in tableColumns").--actionCell
          button(type="button" @click="removeColumn(key)").--miniBtn 削除
      tr.summary
        td.summary__heading.--textReadOnly
          span 評価合計：
        template(v-for="(evaluate, key) in summaries")
          td.summary__evaluate.--textReadOnly
            span {{ evaluate }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace, Action } from 'vuex-class';
import firebase from 'firebase';

import {
  InputType,
  CompareOneRow,
  Product,
  ValueForSelect,
  HTMLElementEvent
} from '../../assets/javascript/types/tableTypes';
import Selector from '~/components/atoms/rankSelector.vue';

@Component({
  components: {
    Selector
  }
})
export default class DataTable extends Vue {
  @Prop({ type: Array, required: true }) initialCompares: Array<CompareOneRow>;
  @Prop({ type: Array, required: true }) initialProducts: Array<Product>;

  compares: Array<CompareOneRow> = [];
  products: Array<Product> = [];

  public mounted () {
    this.compares = this.initialCompares
    this.products = this.initialProducts
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
  public get tableColumns (): Array<string> {
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
  public get summaries () {
    const result = {}
    this.tableColumns.forEach((key) => {
      let sum = 0
      this.compares.forEach((data) => {
        const value = data.values[key]
        if (data.values && typeof value === 'string' && parseInt(value) >= 0) {
          sum += parseInt(value)
        }
      })
      result[key] = sum
    })
    return result
  }
  tagOf (type: InputType): string {
    if (type === InputType.StringField) {
      return 'input';
    }
    if (type === InputType.Select) {
      return 'selector';
    }
    return 'span';
  }
  typeOf (type: InputType): string {
    return type === InputType.StringField ? 'text' : '';
  }
  updateCheckPoint (index: number, name: string) {
    this.compares[index].meta.name = name
    this.$emit('changeCompares', this.compares)
  }
  updateValue (
    index: number,
    key: string,
    val: HTMLElementEvent<HTMLInputElement> | ValueForSelect
  ) {
    if (!this.compares[index].values) {
      this.compares[index].values = {}
    }
    if (val instanceof HTMLElementEvent) {
      this.compares[index].values[key] = val.target!.value
    } else {
      this.compares[index].values[key] = val.value
    }
    this.$emit('changeCompares', this.compares)
  }
  addRow () {
    const values = {}
    this.tableColumns.forEach((column) => {
      values[column] = 0
    })
    this.compares.push({
      meta: {
        name: '',
        type: InputType.Select
      },
      values
    })
    this.$emit('changeCompares', this.compares)
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
    this.compares.forEach((data) => {
      this.$set(data.values, rand, 0)
    })
    this.$emit('changeProducts', this.products)
    this.$emit('changeCompares', this.compares)
  }
  removeRow (index: number) {
    this.compares.splice(index, 1)
    this.$emit('changeCompares', this.compares)
  }
  removeColumn (id: string) {
    this.products = this.products.filter((product) => {
      return product.id !== id
    })
    this.$emit('changeProducts', this.products)
  }
}
</script>

<style lang="scss" scoped>
.table {
  background: $white;

  .heading {
    border-bottom: 1px solid $gray-light-3;

    .heading__header {
      padding: 12px 2px 0;

      &:first-child {
        min-width: 96px;
      }

      &:last-child {
        min-width: 96px;
      }
    }
  }

  .data {
    .data__value {
      padding: 2px;

      .--head {
        width: 96px;
        font-weight: bold;
      }
    }
  }

  .summary {
    background: $gray-light-3;

    .summary__heading {
      font-weight: bold;
      font-size: 0.9rem;
    }

    .summary__evaluate {
      font-weight: bold;
      letter-spacing: 2px;
    }
  }
}
</style>
