<template lang="pug">
  .TextEvaluationCell
    c-text-field(
      :value="cell.value"
      @input="$emit('on-updated-cell-value', { ...cell, value: $event })"
    )
    select(
      :value="cell.evaluate"
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  TextWithEvaluationCell,
  Evaluate,
  MasterEvaluateItemList,
} from '../../assets/javascript/types/tableTypes'

@Component
export default class TextWithEvaluateCellVue extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  cell: TextWithEvaluationCell

  get evaluateItemList (): Evaluate[] {
    return MasterEvaluateItemList
  }
}
</script>

<style lang="scss" scoped>
.TextEvaluationCell {
  display: flex;
  flex-direction: column;
  width: 100%;

  font-size: 1rem;
  position: relative;
}

.selector {
  margin-top: 8px;
}
</style>
