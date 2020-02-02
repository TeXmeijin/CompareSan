<template lang="pug">
  section.table
    template(v-if="compares")
      table-header(
        :table-header="softDeletedTableHeader"
      )
      row(
        :row="row"
        :table-header="tableColumns"
        v-for="(row, index) in tableRows"
        :key="row.rowKey"
      )
      the-summary(:summaries="summaries")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import {
  TableHeader,
  CompareTable,
  Row,
  ComparingItem,
  TextWithEvaluationCell,
  Summary,
} from '~/assets/javascript/types/tableTypes'
import RowVue from '~/components/molecules/ReadOnly/ReadOnlyRow.vue'
import TableHeaderVue from '~/components/molecules/ReadOnly/ReadOnlyTableHeader.vue'
import ComparingItemVue from '~/components/atoms/ReadOnly/ReadOnlyComparingItem.vue'
import SummaryVue from '~/components/molecules/ReadOnly/ReadOnlySummary.vue'

@Component({
  components: {
    ComparingItem: ComparingItemVue,
    TableHeader: TableHeaderVue,
    Row: RowVue,
    TheSummary: SummaryVue,
  },
})
export default class CompareTableView extends Vue {
  @Prop({ type: Object, required: true }) initialTable: CompareTable

  compares = {
    header: [],
    rows: [],
  } as CompareTable

  public created () {
    this.compares = this.initialTable
  }

  get tableRows (): Array<Row> {
    return this.compares.rows.filter((row) => {
      return row.deleted_at === undefined
    })
  }
  get tableColumns (): TableHeader {
    return this.compares.header
  }
  get softDeletedTableHeader (): TableHeader {
    return this.compares.header.filter((header) => {
      return header.deleted_at === undefined
    })
  }
  get summaries (): {
    [key: string]: Summary
    } {
    const result = {}
    this.softDeletedTableHeader.forEach((item: ComparingItem) => {
      let sum = 0
      this.compares.rows.forEach((row: Row) => {
        if (row.deleted_at !== undefined) {
          return
        }

        const cell = row.cells.find(
          cell => cell.comparingItemKey === item.comparingItemKey
        ) as TextWithEvaluationCell | undefined
        if (!cell || !cell.evaluate) {
          return
        }
        sum += cell.evaluate
      })
      result[item.comparingItemKey] = {
        comparingItemKey: item.comparingItemKey,
        value: sum,
      }
    })
    return result
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
