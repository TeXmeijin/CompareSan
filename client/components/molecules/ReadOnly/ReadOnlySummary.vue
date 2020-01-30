<template lang="pug">
  .summary(:style="{height: headHeight, width: `${rowWidth}px` }")
    .summary__heading.--textReadOnly(:style="{ minWidth: headWidth }")
      span 評価合計
    template(v-for="(evaluate, key) in summaries")
      .summary__evaluate.--textReadOnly(:style="{ minWidth: cellWidth }")
        span {{ evaluate.value }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
import { Summary } from '~/assets/javascript/types/tableTypes'

import * as tableSize from '~/store/tableSize'
const TableSize = namespace(tableSize.name)

@Component
export default class ReadOnlySummaryVue extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  summaries: {
    [key: string]: Summary
  }

  @TableSize.Getter headWidth
  @TableSize.Getter headHeight
  @TableSize.Getter headWidthRaw
  @TableSize.Getter cellWidth
  @TableSize.Getter cellWidthRaw
  @TableSize.Getter cellHeight

  get rowWidth (): number {
    return (
      this.headWidthRaw + this.cellWidthRaw * Object.keys(this.summaries).length
    )
  }
}
</script>

<style lang="scss" scoped>
.summary {
  display: flex;
  border-top: 1px solid $gray-light-2;
  background: $gray-light-4;

  .summary__heading {
    height: 100%;
    font-weight: bold;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .summary__evaluate {
    height: 100%;
    font-weight: bold;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
