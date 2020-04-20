<template>
  <v-simple-table>
    <template v-slot:default>
      <SingleValues
        v-for="(field, index) in fields"
        :key="index"
        :id="field.id"
        :name="field.name"
        :startValue="field.startValue"
        :value="field.changedValue"
      />
    </template>
  </v-simple-table>
</template>

<script>
import { mapState } from 'vuex'
import SingleValues from '../ChangingValues/SingleValues'

export default {
  components: {
    SingleValues
  },
  computed: {
    ...mapState([
      'fields'
    ])
  },
  created () {
    this.$store.dispatch('fetchAllFields')
  }
}
</script>
