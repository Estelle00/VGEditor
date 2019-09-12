import Editor from '@components/Base/Editor'
import {
  FLOW_CLASS_NAME,
  EVENT_BEFORE_ADD_PAGE,
  EVENT_AFTER_ADD_PAGE
} from '@common/constants'
import Page from '../Page'

export default {
  mixins: [Page],

  name: 'Flow',

  methods: {
    initPage () {
      const editor = this.root.editor

      editor.emit(EVENT_BEFORE_ADD_PAGE, { className: FLOW_CLASS_NAME })

      this.page = new Editor.Flow(this.config)

      editor.add(this.page)

      editor.emit(EVENT_AFTER_ADD_PAGE, { page: this.page })
    }
  },

  props: {
    data: { default: () => ({ nodes: [], edges: [] }) }
  },

  data () {
    return {
      pageId: ''
    }
  }
}
