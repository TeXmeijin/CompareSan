<template>
  <div class="select">
    <select id="selector" class="selector" @input="$emit('input', $event)">
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
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      items: [
        {
          key: 0,
          value: '✕'
        },
        {
          key: 1,
          value: '△'
        },
        {
          key: 2,
          value: '◯'
        },
        {
          key: 3,
          value: '◎'
        }
      ]
    }
  },
  methods: {
    getCurrentValue (items) {
      return (items.filter((item) => {
        return item.key == this.value
      }))[0].value
    }
  }
})
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  font-size: 1rem;
  position: relative;

  .selector {
    width: 100%;
  }
}
</style>
