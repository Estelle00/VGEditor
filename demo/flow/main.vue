<template>
  <v-g-editor class="demo">
    <div class="flow">
      <div class="flow__header">
        <flow-toolbar/>
      </div>
      <div class="flow__container">
        <div class="flow__sidebar">
          <flow-item-panel/>
        </div>
        <div class="flow__main">
          <flow :data="flowChartData"/>
        </div>
        <div class="flow__panel">
          <flow-detail-panel/>
          <editor-minimap/>
        </div>
      </div>
    </div>
    <flow-context-menu/>
  </v-g-editor>
</template>

<script>
import VGEditor, { Flow } from 'vg-editor'
import Dagre from 'dagre'
import { each } from 'lodash'
import { FlowToolbar } from '../components/EditorToolbar'
import { FlowItemPanel } from '../components/EditorItemPanel'
import { FlowDetailPanel } from '../components/EditorDetailPanel'
import EditorMinimap from '../components/EditorMinimap'
import { FlowContextMenu } from '../components/EditorContextMenu'
import mockData from '../mockData/flow-data'

export default {
  name: 'FlowDemo',

  created () {
    // setTimeout(this.formattedData, 1000)
    this.formattedData()
  },

  methods: {
    save () {
      const page = this.$refs.flowChart.editor.getCurrentPage()
      console.log(page, page.save())
    },

    formattedData () {
      let shouldDagre = false
      const nodes = []
      const edges = []

      const typeMap = {
        start: {
          shape: 'flow-circle',
          color: '#FA8C16',
          size: '72*72'
        },
        input: {
          shape: 'flow-rect',
          color: '#1890FF',
          size: '80*48'
        },
        exclusiveChoice: {
          shape: 'flow-rhombus',
          color: '#13C2C2',
          size: '80*72'
        },
        end: {
          shape: 'flow-circle',
          color: '#FA8C16',
          size: '72*72'
        }
      }

      each(mockData.node, (n, index) => {
        if (typeof n.x === 'undefined' || typeof n.y === 'undefined') {
          shouldDagre = true
        }
        nodes.push({
          color: n.color || typeMap[n.type].color || '',
          id: n.id,
          index,
          label: n.name,
          shape: n.shape || typeMap[n.type].shape || '',
          size: n.size || typeMap[n.type].size || '',
          type: 'node',
          x: n.x,
          y: n.y
        })
      })

      each(mockData.link, l => {
        edges.push({ source: l.from, target: l.to, shape: 'flow-polyline' })
      })

      if (shouldDagre) {
        const g = new Dagre.graphlib.Graph()
        g.setGraph({})
        g.setDefaultEdgeLabel(() => ({}))
        g.setGraph({ rankdir: 'TB' })
        each(nodes, n => {
          g.setNode(n.id, { width: 150, height: 50 })
        })
        each(edges, e => {
          g.setEdge(e.source, e.target)
        })
        Dagre.layout(g)

        let coord = void 0
        g.nodes().forEach((node, i) => {
          coord = g.node(node)
          nodes[i].x = coord.x
          nodes[i].y = coord.y
        })
        g.edges().forEach((edge, i) => {
          coord = g.edge(edge)
          edges[i].startPoint = coord.points[0]
          edges[i].endPoint = coord.points[coord.points.length - 1]
          edges[i].controlPoint = coord.points.slice(1, coord.points.length - 1)
        })
      }

      this.flowChartData = { nodes, edges }
    }
  },

  data () {
    return {
      flowChartData: { nodes: [], edges: [] }
    }
  },

  components: {
    VGEditor,
    Flow,
    FlowToolbar,
    FlowItemPanel,
    FlowDetailPanel,
    EditorMinimap,
    FlowContextMenu
  }
}
</script>

<style lang="stylus">
html {
  height 100%
}
body {
  margin 0
  height 100%
}
.demo {
  height 100%
}
.flow {
  position relative
  width 100%
  height 100%
  display flex
  flex-direction column

  // &__header {
  //   // TODO: 暂时不需要toolbar的功能
  //   height 40px
  // }

  &__container {
    flex 1
    display flex
  }

  &__sidebar {
    width 150px
    background-color #fafafa
    border-right 1px solid #e6e9ed
    display flex
    justify-content center
  }

  &__panel {
    width (100 / 6)%
    background-color #fafafa
    border-left 1px solid #e6e9ed
  }

  &__main {
    flex 1
  }
}
</style>
