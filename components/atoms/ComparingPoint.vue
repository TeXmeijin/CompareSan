<template lang="pug">
  .ComparingPoint
    span.ComparingPoint__text {{ name }}
    edit-button.ComparingPoint__editBtn
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ComparingPoint } from '../../assets/javascript/types/tableTypes'

export default Vue.extend({
  props: {
    comparingItem: {
      type: Object,
      required: true,
    } as PropOptions<ComparingPoint>,
  },
  components: {
    EditButton: () => import('~/components/atoms/EditButton.vue'),
  },
  computed: {
    name (): string {
      return this.comparingItem.name
    },
  },
})
</script>

<style lang="scss" scoped>
.ComparingPoint {
  position: relative;
  padding: 12px 0;
  border-radius: 4px;
  background: $gray-light-3;
  margin-right: 4px;
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    font-weight: bold;
  }

  &__editBtn {
    position: absolute;
    right: 4px;
    bottom: 4px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    color: $gray-light-1;
  }
}
</style>
