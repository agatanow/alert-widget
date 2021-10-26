<template>
  <div class="measure-widget">
    <BarPlot
      :bars="barData"
      :type="type"
    />
    <Counter
      :value="valueInLastHour"
      :avgValue="averageValue"
      :label="label"
      :type="type"
    />
  </div>
</template>

<script>
import BarPlot from './BarPlot';
import Counter from './Counter';

export default {
  name: 'MeasureWidget',
  components: { Counter, BarPlot },
  props: {
    data: Array,
    label: String,
    type: String
  },
  computed: {
    averageValue() {
      if(this.data) {
        return this.countAverageValue(this.data);
      }
      return 0;
    },
    valueInLastHour() {
      return this.data[0].Value;
    },
    barData() {
      return this.data.slice().reverse();
    } 
  },
  methods: {
    countAverageValue(arr) {
      const sum = arr.reduce((a,b) => {
        return { Value: a.Value + b.Value }
      }).Value;
      return Math.round(sum / arr.length);
    },
  }
}
</script>

<style scoped lang="scss">
  .measure-widget {
    display: flex;
    flex-direction: column-reverse;

    .bar-plot {
      height: 70px;
    }
    @include breakpoint-sm {
      flex-direction: row;
      
      .bar-plot {
        margin-right: 30px;
      }
    }
  }
</style>