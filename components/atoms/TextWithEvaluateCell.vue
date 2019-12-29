<template lang="pug">
  .TextEvaluationCell
    input(
      type="text"
      class="--stringField --head"
      :value="cell.value"
      @input="$emit('on-updated-cell-value', { ...cell, value: $event.target.value })"
    )
    select(
      :value="cell.evaluate"
      class="--stringField"
      @input="$emit('on-updated-cell-evaluate', { ...cell, evaluate: $event.target.value })"
    ).selector
      template(v-for="evaluateItem in evaluateItemList")
        option(
          :key="evaluateItem.level"
          :value="evaluateItem.level"
          :selected="evaluateItem.key == cell.evaluate"
        ) {{ evaluateItem.levelString }}
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import {
  Cell,
  TextWithEvaluationCell,
  Evaluate,
  EvaluateString,
} from '../../assets/javascript/types/tableTypes'

@Component
export default class TextWithEvaluateCellVue extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  cell: TextWithEvaluationCell

  public get evaluateItemList(): Evaluate[] {
    return [
      {
        level: 1,
        levelString: EvaluateString.WORST,
      },
      {
        level: 2,
        levelString: EvaluateString.BAD,
      },
      {
        level: 3,
        levelString: EvaluateString.BETTER,
      },
      {
        level: 4,
        levelString: EvaluateString.BEST,
      },
    ]
  }
}
</script>

<style lang="scss" scoped>
.TextEvaluationCell {
  display: flex;
  flex-direction: column;

  font-size: 1rem;
  position: relative;
}

.selector {
  margin-top: 8px;
}
</style>
