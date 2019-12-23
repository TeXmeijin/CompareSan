<template lang="pug">
  section.table
    template(v-if="!compares.isEmpty()")
      table-header(
        :table-header="softDeletedTableHeader"
        @on-clicked-add-item="addItem"
      )
      row(
        :row="row"
        :table-header="tableColumns"
        @on-clicked-remove-row="removeRow($event)"
        v-for="(row, index) in tableRows"
        :key="row.rowKey"
      )
      the-footer(
        :header="softDeletedTableHeader"
        @on-clicked-add-row="addRow"
        @on-clicked-remove-item="removeItem($event)"
      )
      the-summary(:summaries="summaries")
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
  TextWithEvaluationCell,
  Summary,
} from '../../assets/javascript/types/tableTypes'
import RowVue from '../molecules/Row.vue'
import TableHeaderVue from '../molecules/TableHeader.vue'
import ComparingItemVue from '../atoms/ComparingItem.vue'
import ComparingPointVue from '../atoms/ComparingPoint.vue'
import TextCellVue from '../atoms/TextCell.vue'
import FooterVue from '../molecules/Footer.vue'
import SummaryVue from '../molecules/Summary.vue'
import { oneRowFactory } from '../../assets/javascript/factory/oneRowFactory'
import { addItemUseCase } from '../../assets/javascript/useCase/addItemUseCase'

@Component({
  components: {
    ComparingItem: ComparingItemVue,
    TableHeader: TableHeaderVue,
    Row: RowVue,
    TheFooter: FooterVue,
    TheSummary: SummaryVue,
  },
})
export default class CompareTableView extends Vue {
  @Prop({ type: Object, required: true }) initialTable: CompareTableClass

  compares: CompareTableClass = new CompareTableClass()

  public mounted() {
    this.compares = this.initialTable
  }

  public get tableRows(): Array<Row> {
    return this.compares.data.rows.filter(row => {
      return row.deleted_at === undefined
    })
  }
  public get tableColumns(): TableHeader {
    return this.compares.data.header
  }
  public get softDeletedTableHeader(): TableHeader {
    return this.compares.data.header.filter(header => {
      return header.deleted_at === undefined
    })
  }
  public get summaries(): {
    [key: string]: Summary
  } {
    const result = {}
    this.softDeletedTableHeader.forEach((item: ComparingItem) => {
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
      result[item.comparingItemKey] = {
        comparingItemKey: item.comparingItemKey,
        value: sum,
      }
    })
    return result
  }
  updateCheckPoint(index: number, name: string) {}
  updateValue() {}
  addItem() {
    this.compares = addItemUseCase(this.compares)
  }
  removeItem(itemKey: string) {
    this.compares.data.header = this.compares.data.header.map(item => {
      if (item.comparingItemKey === itemKey) {
        item.deleted_at = Date.now()
      }
      return item
    })
  }
  addRow() {
    this.compares.data.rows.push(oneRowFactory(this.compares))
  }
  removeRow(rowKey: string) {
    this.compares.data.rows = this.compares.data.rows.map(row => {
      if (row.rowKey === rowKey) {
        row.deleted_at = Date.now()
      }
      return row
    })
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
}
</style>
