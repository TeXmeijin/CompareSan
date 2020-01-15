<template lang="pug">
  transition(
    name="modal"
    appear
  )
    template(v-if="isShowing")
      .ModalBackground(@click.self="onClickedBackground")
        .ModalContents
          slot
          slot(name="closeButton")
            button(type="button" @click="onClickedBackground").CloseButton ✕
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    isShowing: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onClickedBackground () {
      this.$emit('on-closed')
    },
  },
})
</script>

<style lang="scss" scoped>
.ModalBackground {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.ModalContents {
  position: relative;
  padding: 8px;
  background: $white;
  border-radius: 4px;
  z-index: 3;
}

.CloseButton {
  position: absolute;
  top: -12px;
  right: -12px;
  content: '';
  width: 24px;
  height: 24px;
  background: $body;
  color: $white;
  border-radius: 50%;
  border: 0;
}

// オーバーレイのトランジション
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;

  // オーバーレイに包含されているモーダルウィンドウのトランジション
  .ModalContents {
    transition: opacity 0.2s, transform 0.2s;
  }
}

// ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える
.modal-leave-active {
  transition: opacity 0.3s ease 0.2s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;

  .ModalContents {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
