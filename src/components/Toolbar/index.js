import Editor from '@components/Base/Editor'
import { TOOLBAR_CONTAINER } from '@common/constants'

export default {
  name: 'Toolbar',

  created () {
    this.getContainerId()
  },

  beforeDestroy () {
    this.toolbar = null
  },

  mounted () {
    const { editor, handleAfterAddPage } = this.root

    handleAfterAddPage(() => {
      this.toolbar = new Editor.Toolbar({
        container: this.containerId
      })

      editor.add(this.toolbar)
    })
  },

  methods: {
    getContainerId () {
      const { editor } = this.root
      this.containerId = `${TOOLBAR_CONTAINER}_${editor.id}`
    }
  },

  inject: ['root'],

  data () {
    return {
      containerId: '',
      toolbar: null
    }
  },

  render () {
    const { containerId } = this
    return (
      <div id={containerId}>
        {this.$scopedSlots.default()}
      </div>
    )
  }
}
