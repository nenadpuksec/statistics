<template>
  <tbody>
    <tr>
      <td style="padding-left: 30px;">
        {{ name }}
      </td>
      <td style="padding-left: 40px;">
        {{ newValue }}
      </td>
      <td style="padding-left: 45px;">
        <i v-if="randomSign == 2" class="fa fa-plus" /><i v-else class="fa fa-minus" />
      </td>
      <td style="padding-left: 40px;">
        <i v-if="arrow == 1" class="fa fa-arrow-up" /><i v-else class="fa fa-arrow-down" />
      </td>
      <td style="padding-left: 30px;">
        <SwitchButton @switch="switchedComponent" />
      </td>
    </tr>
  </tbody>
</template>

<script>
import { mapState } from 'vuex'
import SwitchButton from '../UI/SwitchButton'

export default {
  components: {
    SwitchButton
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    startValue: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      interval: null,
      counter: 0,
      randomValue: 0,
      randomSign: 0,
      lastValue: null,
      newValue: null,
      arrow: 0,
      switch: false
    }
  },
  computed: {
    ...mapState([
      'changedVal',
      'groupArrays'
    ]),
    start () {
      if (this.groupArrays.length > 0) {
        if (this.counter === 0) {
          return this.lastValue
        } else {
          return this.newValue
        }
      } else {
        return this.newValue
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchLastValues')
  },
  created () {
    this.$store.dispatch('fetchAllValues')
  },
  mounted () {
    let startVal = 0

    this.interval = setInterval(() => {
      if (this.switch === true) {
        console.log('test')
      } else {
        if (this.groupArrays.length > 0) {
          for (const key in this.groupArrays) {
            if (this.groupArrays[key].field[0].fieldName === this.name) {
              const one = this.groupArrays[key].field[0].value
              this.lastValue = one
            }
          }
        } else {
          startVal = 3
          this.lastValue = startVal
        }

        const i = 1
        startVal = 0 + this.getRandomInt()
        if (this.randomSignInt() === 2) {
          this.counter === 0 ? this.newValue = startVal + this.lastValue : this.newValue += startVal
          this.counter = i
        } else {
          this.counter === 0 ? this.newValue = startVal + this.lastValue : this.newValue -= startVal
          this.counter = i
        }

        const valuesData = {
          id: this.id,
          value: this.newValue,
          date: new Date(),
          fieldName: this.name
        }
        this.$store.dispatch('storeValues', valuesData)
      }
    }, 2000)
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    getRandomInt () {
      const randomValue = Math.floor(Math.random() * 2) + 1
      this.randomValue = randomValue
      return randomValue
    },
    randomSignInt () {
      const randomSign = Math.floor(Math.random() * 2) + 1
      /* FOR ARROW */
      randomSign > 1 ? this.arrow = 1 : this.arrow = 0
      this.randomSign = randomSign
      return randomSign
    },
    switchedComponent (value) {
      value === false ? this.switch = true : this.switch = false
    }
  }
}
</script>
