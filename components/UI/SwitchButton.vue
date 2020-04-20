<template>
  <v-row>
    <v-switch v-model="showMessages" :label="messages" @change="switchValue" />
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      showMessages: true
    }
  },
  computed: {
    messages () {
      return this.showMessages ? 'Enabled' : 'Disabled'
    }
  },
  methods: {
    switchValue () {
      this.$emit('switch', this.showMessages)
    }
  }
}
</script>
