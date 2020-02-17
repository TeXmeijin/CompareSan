<template lang="pug">
  toast-ui-editor(
    :value="content"
    @input="$emit('input', $event)"
    :height="height"
    :options="options"
  )
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import { Editor } from '@toast-ui/vue-editor'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import { generateRandom } from '../../assets/javascript/utils/GenerateRandom'

import 'codemirror/lib/codemirror.css'
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'

@Component({
  components: {
    ToastUiEditor: Editor,
  },
})
export default class TheEditor extends Vue {
  @Prop({
    type: String,
    default: '400px',
  })
  height

  @Prop({
    type: String,
    required: true,
  })
  value

  content: string = ''

  created () {
    this.content = this.value
  }

  options = {
    hideModeSwitch: true,
    hooks: {
      addImageBlobHook: this.addImageBlobHook.bind(this),
    },
  }

  addImageBlobHook (blob, callback) {
    const storageRef = firebase.storage().ref()
    storageRef
      .child(`/article-images/${generateRandom(10)}.jpg`)
      .put(blob)
      .then(async (snapshot) => {
        const url = await snapshot.ref.getDownloadURL()
        callback(url, '')
      })
  }
}
</script>
