<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <TitleOfValues />
        <ListOfValues />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import TitleOfValues from '../components/ChangingValues/TitleOfValues'
import ListOfValues from '../components/ChangingValues/ListOfValues'

export default {
  components: {
    TitleOfValues,
    ListOfValues
  }
}
</script>
