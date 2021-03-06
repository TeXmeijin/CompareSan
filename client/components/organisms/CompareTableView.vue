<template lang="pug">
  section.table
    template(v-if="compares")
      table-header(
        :table-header="softDeletedTableHeader"
        @on-clicked-add-item="addItem"
        @on-clicked-remove-item="removeItem($event)"
        @on-clicked-update-item="updateItem($event)"
      )
      row(
        :row="row"
        :table-header="tableColumns"
        @on-clicked-remove-row="removeRow($event)"
        @on-clicked-update-row="updateRow($event)"
        @on-updated-cell-value="updatedCellValue($event, index)"
        @on-updated-cell-evaluate="updatedCellEvaluate($event, index)"
        v-for="(row, index) in tableRows"
        :key="row.rowKey"
      )
      the-footer(
        :header="softDeletedTableHeader"
        @on-clicked-add-row="addRow"
      )
      the-summary(:summaries="summaries")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import {
  TableHeader,
  Row,
  ComparingItem,
  TextWithEvaluationCell,
  Summary,
  TextCell,
  CompareTable,
} from '../../assets/javascript/types/tableTypes'
import RowVue, { UpdateRowContent } from '../molecules/Row.vue'
import TableHeaderVue from '../molecules/TableHeader.vue'
import ComparingItemVue, { UpdateItemContent } from '../atoms/ComparingItem.vue'
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
  @Prop({ type: Object, required: true }) initialTable: CompareTable

  compares = {
    header: [],
    rows: [],
  } as CompareTable

  public mounted () {
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
    const result = {} as {
      [key: string]: Summary
    }
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
        price: item.price,
      }
    })
    return result
  }
  updatedCellValue (cell: TextCell | TextWithEvaluationCell, index: number) {
    const targetIndex = this.compares.rows[index].cells.findIndex(
      (searchCell) => {
        return searchCell.comparingItemKey === cell.comparingItemKey
      }
    )
    if (targetIndex < 0) {
      return
    }

    const target = this.compares.rows[index].cells[targetIndex] as
      | TextCell
      | TextWithEvaluationCell

    target.value = cell.value

    const row = this.compares.rows[index]
    row.cells.splice(targetIndex, 1, Object.assign({}, target))
    this.compares.rows.splice(index, 1, row)
  }
  updatedCellEvaluate (cell: TextWithEvaluationCell, index: number) {
    const targetIndex = this.compares.rows[index].cells.findIndex(
      (searchCell) => {
        return searchCell.comparingItemKey === cell.comparingItemKey
      }
    )
    if (targetIndex < 0) {
      return
    }

    const target = this.compares.rows[index].cells[
      targetIndex
    ] as TextWithEvaluationCell

    target.evaluate = parseInt(`${cell.evaluate}`)

    const row = this.compares.rows[index]
    row.cells.splice(targetIndex, 1, target)
    this.compares.rows.splice(index, 1, row)
  }
  addItem () {
    this.compares = addItemUseCase(this.compares)
  }
  updateItem (content: UpdateItemContent) {
    const index = this.compares.header.findIndex((header) => {
      return header.comparingItemKey === content.itemKey
    })

    if (index < 0) {
      return
    }

    this.compares.header.splice(
      index,
      1,
      ((item) => {
        item.name = content.name
        item.price = content.price
        item.url = content.url
        return item
      })(this.compares.header[index])
    )
  }
  removeItem (itemKey: string) {
    this.compares.header = this.compares.header.map((item) => {
      if (item.comparingItemKey === itemKey) {
        item.deleted_at = Date.now()
      }
      return item
    })
  }
  addRow ({ type }) {
    this.compares.rows.push(oneRowFactory(this.compares, type))
    this.compares.rows = this.compares.rows.concat()
  }
  removeRow (rowKey: string) {
    this.compares.rows = this.compares.rows.map((row) => {
      if (row.rowKey === rowKey) {
        row.deleted_at = Date.now()
      }
      return row
    })
  }
  updateRow (update: UpdateRowContent) {
    this.compares.rows = this.compares.rows.map((row) => {
      if (row.rowKey === update.rowKey && !!update.type) {
        row.head.name = update.name

        row.head.type = update.type
        row.cells = row.cells.map((cell) => {
          if (update.type) {
            cell.type = update.type
          }
          return cell
        })
      }
      return row
    })
  }
}
</script>

<style lang="scss" scoped>
.table {
  background: $white;
  overflow-x: scroll;
}
</style>
