<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab
        v-for="(item1, index1) in fields"
        :key="index1"
        class="tab-width"
      >
        {{ item1.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(item2, index2) in fields"
        :key="index2"
      >
        <v-card flat>
          <Chart :field="item2.name" />
          <Table :field="item2.name" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Chart from '../StatisticsElements/Chart'
import Table from '../StatisticsElements/Table'

export default {
  components: {
    Chart,
    Table
  },
  data () {
    return {
      tab: null
    }
  },
  created () {
    this.$store.dispatch('fetchAllFields')
  },
  computed: {
    ...mapState([
      'fields'
    ])
  }
}
</script>

<style scoped>
.tab-width {
    width: 10%
}
</style>
