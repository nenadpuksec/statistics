<template>
  <v-container fluid>
    <v-sparkline
      :value="dataFieldValues"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="lineWidth"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      :show-labels="showLabels"
      :label-size="labelSize"
      auto-draw
    />
    <div class="label-wrapper">
      <v-flex xs12 sm12 md12 lg12>
        <label v-for="(val, index) in dataFieldValues" :key="index" class="label-style">
          {{ val }}
        </label>
      </v-flex>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]

export default {
  props: {
    field: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showLabels: false,
      lineWidth: 2,
      labelSize: 7,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false
    }
  },
  created () {
    this.$store.dispatch('fetchFieldValues', this.field)
  },
  computed: {
    ...mapState([
      'dataFieldValues'
    ])
  }
}
</script>

<style scoped>
.label-wrapper {
  padding: 24px
}
.label-style {
  padding:0.3%;
  flex-direction: row;
}
</style>
