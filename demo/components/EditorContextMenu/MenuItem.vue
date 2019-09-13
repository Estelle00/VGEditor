<template>
  <command :name="command">
    <div class="item">
      <!-- <IconFont :type="`icon-${icon || command}`"/> -->
      <span>{{ icon || command }}</span>
      <span>{{ label }}</span>
    </div>
  </command>
</template>

<script>
import { Command } from 'vg-editor'
import upperFirst from 'lodash/upperFirst'

export default {
  name: 'MenuItem',

  props: ['command', 'icon', 'text'],

  computed: {
    label () {
      return this.text || upperFirst(this.command)
    }
  },

  components: { Command }
}
</script>
