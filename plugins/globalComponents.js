import Vue from 'vue'

Vue.component('c-button', () => import(
  '~/components/atoms/CButton.vue'
))
Vue.component('c-text-field', () => import(
  '~/components/atoms/CTextField.vue'
))
Vue.component('c-checkbox', () => import(
  '~/components/atoms/CCheckBox.vue'
))
