<template>
  <div class="measure-widget">
    <BarPlot
      :bars="data"
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
  }
</style>