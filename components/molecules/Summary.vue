<template lang="pug">
  .summary
    .summary__heading.--textReadOnly(:style="{ minWidth: headWidth }")
      span 評価合計
    template(v-for="(evaluate, key) in summaries")
      .summary__evaluate.--textReadOnly(:style="{ minWidth: cellWidth }")
        span {{ evaluate.value }}
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
  @TableSize.Getter cellWidth
  @TableSize.Getter headHeight
}
</script>

<style lang="scss" scoped>
.summary {
  display: flex;
  background: $gray-light-3;
  padding: 8px 0;

  .summary__heading {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .summary__evaluate {
    font-weight: bold;
    font-size: 1.2rem;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
