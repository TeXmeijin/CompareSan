<template lang="pug">
  section.table
    template(v-if="!compares.isEmpty()")
      table-header(:table-header="tableColumns")
      .data(v-for="(row, index) in tableRows")
        comparing-point(:comparing-item="row.head")
        text-cell(:cell="cell" v-for="cell in row.cells" :key="cell.comparingItemKey")
        .data__value.--actionCell
          button(type="button" @click="removeRow(index)").--miniBtn 削除
      .footer
        .footer__addPoint.--actionCell
          button(type="button" @click="addRow").--miniBtn 追加
        .--actionCell(v-for="(key, index) in tableColumns")
          button(type="button" @click="removeColumn(key)").--miniBtn 削除
      .summary
        .summary__heading.--textReadOnly
          span 評価合計：
        template(v-for="(evaluate, key) in summaries")
          .summary__evaluate.--textReadOnly
            span {{ evaluate }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace, Action } from 'vuex-class'
import firebase from 'firebase'

import {
  CompareTable,
  CompareTableClass,
  TableHeader,
  Row,
  ComparingItem,
  TextWithEvaluationCell
} from '../../assets/javascript/types/tableTypes'
import RowVue from '../molecules/Row.vue';
import TableHeaderVue from '../molecules/TableHeader.vue';
import ComparingItemVue from '../atoms/ComparingItem.vue';
import ComparingPointVue from '../atoms/ComparingPoint.vue';
import TextCellVue from '../atoms/TextCell.vue';

@Component({
  components: {
    TableHeader: TableHeaderVue,
    Row: RowVue,
    ComparingItem: ComparingItemVue,
    ComparingPoint: ComparingPointVue,
    TextCell: TextCellVue
  }
})
export default class CompareTableView extends Vue {
  @Prop({ type: Object, required: true }) initialTable: CompareTableClass;

  compares: CompareTableClass = new CompareTableClass();

  public mounted () {
    this.compares = this.initialTable
  }

  public get tableRows (): Array<Row> {
    return this.compares.data.rows
  }
  public get tableColumns (): ComparingItem[] {
    return this.compares.data.header
  }
  public get summaries () {
    const result = {}
    this.tableColumns.forEach((item: ComparingItem) => {
      let sum = 0
      this.compares.data.rows.forEach((row: Row) => {
        const cell = row.cells.find(
          cell => cell.comparingItemKey === item.comparingItemKey
        ) as TextWithEvaluationCell | undefined
        if (!cell || !cell.evaluate) {
          return
        }
        sum += cell.evaluate.level
      })
      result[item.comparingItemKey] = sum
    })
    return result
  }
  updateCheckPoint (index: number, name: string) {
  }
  updateValue (
  ) {
  }
  addRow () {
  }
  addColumn () {
    const generateRandom = (): string => {
      // 生成する文字列の長さ
      const l = 8

      // 生成する文字列に含める文字セット
      const c = 'abcdefghijklmnopqrstuvwxyz0123456789'

      const cl = c.length
      let r = ''
      for (let i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)]
      }
      return r
    }
    const rand: string = generateRandom()
  }
  removeRow (index: number) {
  }
  removeColumn (id: string) {
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
    display: flex;
    align-items: center;

    .data__value {
      padding: 2px;

      .--head {
        width: 96px;
        font-weight: bold;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
  }

  .summary {
    display: flex;
    align-items: center;
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
