<template lang="pug">
  .summary
    .summary__heading.--textReadOnly(:style="{ minWidth: headWidth }")
      span 評価合計：
    template(v-for="(evaluate, key) in summaries")
      .summary__evaluate.--textReadOnly(:style="{ width: cellWidth }")
        span {{ evaluate.value }}
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";

import { Summary } from '../../assets/javascript/types/tableTypes';

import * as tableSize from '~/store/tableSize'
import { namespace } from "vuex-class";
const TableSize = namespace(tableSize.name)

@Component
export default class SummaryVue extends Vue {
  @Prop({
    type: Object,
    required: true
  }) summaries: {
    [key: string]: Summary
  }

  @TableSize.Getter headWidth;
  @TableSize.Getter cellWidth;
}
</script>

<style lang="scss" scoped>
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
</style>
