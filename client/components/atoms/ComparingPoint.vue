<template lang="pug">
  .ComparingPoint
    span.ComparingPoint__text {{ name }}
    span.ComparingPoint__description(
      v-if="description"
    ) {{ description }}
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
    description (): string | undefined {
      return this.comparingItem.description
    },
  },
})
</script>

<style lang="scss" scoped>
.ComparingPoint {
  position: relative;
  padding: 12px 0;
  margin-right: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;

  &__text {
    font-weight: bold;
    font-size: 0.9rem;
  }

  &__description {
    font-size: 0.8rem;
    color: $gray;
    margin-top: 4px;
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
