<template>
  <command :name="command">
    <span>{{ command }}</span>
  </command>
</template>

<script>
import { Command } from 'vg-editor'

export default {
  name: 'ToolbarButton',

  props: ['command', 'icon', 'text'],

  components: { Command }
}
</script>
