<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-simple-table style="min-width: 1200px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left text-center">
                Field {{ field }} ({{ numberOfValuesCounter }})
              </th>
              <th class="text-left text-center">
                Value
              </th>
              <th class="text-left text-center">
                Date
              </th>
              <th class="text-left text-center">
                Time
              </th>
            </tr>
          </thead>
        </template>
      </v-simple-table>
      <v-simple-table>
        <template v-slot:default>
          <tbody v-for="(single, index) in changedVal" :key="index">
            <tr v-if="single.fieldName === field">
              <td class="text-left text-center" />
              <td class="text-left text-center">
                {{ single.value }}
              </td>
              <td class="text-left text-center">
                {{ single.date.split("T")[0] }}
              </td>
              <td class="text-left text-center">
                {{ single.date.split("T")[1].split(".")[0] }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    field: {
      type: String,
      required: true
    }
  },
  created () {
    this.$store.dispatch('fetchAllValues')
  },
  computed: {
    ...mapState([
      'changedVal'
    ]),
    numberOfValuesCounter () {
      let length = 0
      for (const key in this.changedVal) {
        if (this.changedVal[key].fieldName === this.field) {
          if (this.changedVal.hasOwnProperty(key)) {
            ++length
          }
        }
      }
      return length
    }
  }
}
</script>

<style scoped>
.text-center {
    text-align: center !important;
    width: 25%;
}
</style>
