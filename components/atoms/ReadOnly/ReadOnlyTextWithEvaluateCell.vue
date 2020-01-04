<template lang="pug">
  .ReadOnlyTextWithEvaluateCell
    .Text
      span {{ cell.value }}
    .Evaluate(v-if="evaluate")
      span {{ evaluate }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  TextWithEvaluationCell,
  EvaluateString,
  MasterEvaluateItemList,
} from '~/assets/javascript/types/tableTypes'

@Component
export default class ReadOnlyTextWithEvaluateCellVue extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  cell: TextWithEvaluationCell

  get evaluate (): EvaluateString | null {
    const item = MasterEvaluateItemList.find((item) => {
      return item.level === this.cell.evaluate
    })

    if (!item) {
      return null
    }

    return item.levelString
  }
}
</script>

<style lang="scss" scoped>
.ReadOnlyTextWithEvaluateCell {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 4px;

  .Text {
    font-size: 0.8rem;
    line-height: 1.4;
    word-break: break-all;
    text-align: center;
  }

  .Evaluate {
    margin-top: 4px;
    text-align: center;
  }
}
</style>
