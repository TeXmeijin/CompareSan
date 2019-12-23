<template lang="pug">
  .summary(:style="{height: headHeight}")
    .summary__heading.--textReadOnly(:style="{ minWidth: headWidth }")
      span 評価合計
    template(v-for="(evaluate, key) in summaries")
      .summary__evaluate.--textReadOnly(:style="{ minWidth: cellWidth }")
        span {{ evaluate.value }}
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'

import { Summary } from '../../assets/javascript/types/tableTypes'

import * as tableSize from '~/store/tableSize'
import { namespace } from 'vuex-class'
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

  .summary__heading {
    height: 100%;
    font-weight: bold;
    font-size: 0.9rem;
    background: $gray-light-3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .summary__evaluate {
    height: 100%;
    font-weight: bold;
    letter-spacing: 2px;
    background: $gray-light-3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
