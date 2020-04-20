import Vuex from 'vuex'
import Axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      fields: [],
      values: [],
      changedVal: [],
      dataFieldValues: [],
      dataFieldDates: [],
      groupArrays: []
    },
    mutations: {
      storeAllFields (state, fields) {
        state.fields = fields
      },
      getValues (state, changedVal) {
        state.changedVal = changedVal
      },
      getLastValues (state, groupArrays) {
        state.groupArrays = groupArrays
      },
      getFieldValues (state, dataFieldValues) {
        state.dataFieldValues = dataFieldValues
      },
      getFieldDates (state, dataFieldDates) {
        state.dataFieldDates = dataFieldDates
      },
      storeAllValues (state, values) {
        state.values = values
      }
    },
    actions: {
      fetchAllFields ({ commit }) {
        Axios.get('https://factory-worldwide.firebaseio.com/fields.json')
          .then(res => res.data)
          .then((fields) => { commit('storeAllFields', fields) })
          .catch(error => console.log(error))
      },
      fetchAllValues ({ commit }) {
        Axios.get('https://factory-worldwide.firebaseio.com/values.json')
          .then(res => res.data)
          .then((changedVal) => { commit('getValues', changedVal) })
          .catch(error => console.log(error))
      },
      fetchLastValues ({ commit }) {
        Axios.get('https://factory-worldwide.firebaseio.com/values.json')
          .then((res) => {
            const data = res.data
            const dataArray = []
            for (const key in data) {
              const one = data[key]
              dataArray.push(one)
            }
            const groups = dataArray.reduce((groups, field) => {
              const date = field.fieldName.split(' ')[0]
              if (!groups[date]) {
                groups[date] = []
              }
              groups[date].push(field)
              return groups
            }, {})

            const groupArrays = Object.keys(groups).map((date) => {
              return {
                date,
                field: groups[date].slice(-1)
              }
            })
            commit('getLastValues', groupArrays)
          })
          .catch(error => console.log(error))
      },
      fetchFieldValues ({ commit }, field) {
        Axios.get('https://factory-worldwide.firebaseio.com/values.json')
          .then((res) => {
            const dataFieldValues = []
            const result = res.data
            for (const key in result) {
              const one = result[key]
              if (one.fieldName === field) {
                dataFieldValues.push(one.value)
              }
            }
            commit('getFieldValues', dataFieldValues)
          })
          .catch(error => console.log(error))
      },
      fetchFieldDates ({ commit }, field) {
        Axios.get('https://factory-worldwide.firebaseio.com/values.json')
          .then((res) => {
            const dataFieldDates = []
            const result = res.data
            for (const key in result) {
              const one = result[key]
              if (one.fieldName === field) {
                dataFieldDates.push(one.date)
              }
            }
            commit('getFieldDates', dataFieldDates)
          })
          .catch(error => console.log(error))
      },
      storeValues (vuexContext, values) {
        const changedValues = {
          ...values
        }
        return this.$axios
          .$post('/values.json', changedValues)
          .then((data) => { vuexContext.commit('storeAllValues', { ...changedValues }) })
          .catch(e => console.log(e))
      },
      resetAllValues () {
        Axios.delete('https://factory-worldwide.firebaseio.com/values.json')
          .then((response) => {
            this.result.splice(response.length, 0)
          })
          .catch(error => console.log(error))
        location.reload()
      }
    },
    getters: {}
  })
}

export default createStore
