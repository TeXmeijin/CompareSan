<template lang="pug">
  .TextEvaluationCell
    .MiniLabel 仕様
    c-text-field(
      :value="cell.value"
      @input="$emit('on-updated-cell-value', { ...cell, value: $event })"
    )
    .MiniLabel 自己評価
    .TheSelect
      v-icon(
        name="chevron-down"
      ).TheSelect__icon
      select(
        :value="cell.evaluate"
        @input="$emit('on-updated-cell-evaluate', { ...cell, evaluate: $event.target.value })"
      ).TheSelect__selector
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
import 'vue-awesome/icons/chevron-down'
import Icon from 'vue-awesome/components/Icon.vue'

@Component({
  components: {
    'v-icon': Icon,
  },
})
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

.MiniLabel {
  margin-top: 6px;
  font-size: 0.6rem;
  text-align: right;
  color: $gray;
}

.selector {
  margin-top: 2px;
}
</style>
