<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <Tabs />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import Tabs from '../components/StatisticsElements/Tabs'

export default {
  components: {
    Tabs
  },
  data () {
    return {
      groupField: {}
    }
  },
  computed: {
    ...mapState([
      'changedVal'
    ])
  },
  created () {
    this.$store.dispatch('fetchAllValues')
  }
}
</script>
