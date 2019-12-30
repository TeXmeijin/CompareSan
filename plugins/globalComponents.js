import Vue from 'vue'

Vue.component('c-button', () => import(
  '~/components/atoms/CButton.vue'
))
