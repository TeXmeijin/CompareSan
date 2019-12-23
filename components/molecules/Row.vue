<template lang="pug">

</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Row, ComparingPoint, Cell } from '../../assets/javascript/types/tableTypes'

export default Vue.extend({
  props: {
    row: {
      type: Object,
      required: true
    } as PropOptions<Row>
  },
  computed: {
    head (): ComparingPoint {
      return this.row.head
    },
    cells (): Array<Cell> {
      return this.row.cells
    }
  }
})
</script>
