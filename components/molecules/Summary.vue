<template lang="pug">
  .SummaryArea(:style="{ width: `${rowWidth}px` }")
    .summary__row
      .summary__heading.--textReadOnly(:style="{ minWidth: headWidth }")
        span 評価合計
      template(v-for="(evaluate, key) in summaries")
        .summary__evaluate.--textReadOnly(:style="{ minWidth: cellWidth }")
          span {{ evaluate.value }}
    .summary__row(v-if="maxEvaluateKey")
      .summary__heading.--textReadOnly(:style="{ minWidth: headWidth }")
        span 価格差
      template(v-for="(evaluate, key) in summaries")
        .summary__price.--textReadOnly(:style="{ minWidth: cellWidth }")
          span ￥{{ priceDiff(evaluate) }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
import { Summary } from '../../assets/javascript/types/tableTypes'

import * as tableSize from '~/store/tableSize'
const TableSize = namespace(tableSize.name)

@Component
export default class SummaryVue extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  summaries: {
    [key: string]: Summary
  }

  @TableSize.Getter headWidth
  @TableSize.Getter headWidthRaw
  @TableSize.Getter cellWidth
  @TableSize.Getter cellWidthRaw
  @TableSize.Getter cellHeight

  get sumamryLength (): number {
    return Object.keys(this.summaries).length
  }

  get rowWidth (): number {
    return this.headWidthRaw + this.cellWidthRaw * this.sumamryLength
  }

  get maxEvaluateKey (): string | null {
    let maxKey = null as string | null
    let max = 0

    for (const summaryKey in this.summaries) {
      if (this.summaries[summaryKey].value > max) {
        maxKey = summaryKey
        max = this.summaries[summaryKey].value
      }
    }

    return maxKey
  }

  priceDiff (summary: Summary): number | string {
    const maxPrice = this.summaries[this.maxEvaluateKey!].price
    if (typeof summary.price === 'undefined') {
      return '-'
    }
    if (typeof maxPrice === 'undefined') {
      return '-'
    }
    return summary.price - maxPrice
  }
}
</script>
