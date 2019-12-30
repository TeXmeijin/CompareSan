import Vue from 'vue'

Vue.component('c-button', () => import(
  '~/components/atoms/CButton.vue'
))
Vue.component('c-text-field', () => import(
  '~/components/atoms/CTextField.vue'
))
