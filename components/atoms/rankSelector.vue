<template>
  <div class="select">
    <input
      type="text"
      class="--stringField"
      :value="value.exactly"
      @input="$emit('input', {
        ...value,
        exactly: $event
      })"
    >
    <select id="selector" class="selector" @input="$emit('input', {...value, value: $event})">
      <template v-for="item in items">
        <option
          :key="item.key"
          :value="item.key"
          :selected="item.key == value"
        >
          {{ item.value }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ValueForSelect } from '../../assets/javascript/types/tableTypes'

interface SelectItem {
  key: string,
  value: string
}

export default Vue.extend({
  props: {
    value: {
      type: Object,
      required: true
    } as PropOptions<ValueForSelect>
  },
  data () {
    const items: Array<SelectItem> = [
      {
        key: '0',
        value: '✕'
      },
      {
        key: '1',
        value: '△'
      },
      {
        key: '2',
        value: '◯'
      },
      {
        key: '3',
        value: '◎'
      }
    ]
    return {
      items
    }
  },
  methods: {
    getCurrentValue (items: Array<SelectItem>) {
      return (items.filter((item) => {
        return item.key === this.value.value
      }))[0].value
    }
  }
})
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: relative;

  .selector {
    width: 100%;
  }
}
</style>
