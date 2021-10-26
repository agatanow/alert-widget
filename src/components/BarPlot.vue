<template>
  <div :class="['bar-plot', `bar-plot--${type}`]">
    <div v-for="(el, idx) in bars" :key="`bar-plot-el-${idx}`" class="bar-plot__element">
      <div class="bar-plot__element__bar" :style="`height: ${el.Value/maxValue * 100}%`">
        <div class="bar-plot__element__bar__value">
          {{ el.Value }}
        </div>
      </div>
      <div class="bar-plot__element__label">
      {{ el.Date | dateLabel  }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarPlot',
  props: {
    bars: Array,
    type: String
  },
  filters: {
    dateLabel: (dateString) => {
      const val = parseInt(dateString.slice(11,13));
      const mod_4 = val % 4;
      return mod_4 ? '' : val - mod_4;
    }
  },
  computed: {
    maxValue() {
      return this.bars.reduce((a,b) => {
        return { Value: Math.max(a.Value, b.Value) }
      }).Value;
    }
  }
}
</script>

<style scoped lang="scss">
  .bar-plot {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    flex-direction: row;

    &__element{
      position: relative;
      flex-grow: 1;
      flex-basis: 0;
      margin-bottom: 20px;
      margin-right: 1px;
      @include breakpoint-sm {
        margin-right: 2px;
      }

      &__label {
        height: 15px;
        bottom: -20px;
        left: 0;
        position: absolute;
        font-size: 10px;
        font-weight: bold;
      }

      &__bar {
        background: $--graphit;
        width: 100%;
        position: absolute;
        bottom:0;
        left:0;
        transition: height 0.25s ease-in;
        &__value {
          display: none;
        }
        &:hover &__value{
          display: block;
          z-index: 3;
          position: absolute;
          bottom: 30px;
          background: $--white;
          padding: 5px;
        }
      }
    }

    &--error &__element{
      &__bar {
        background: $--red;
      }
      &__label {
        color:  $--red;
      }
    }

    &--warning &__element {
      &__bar {
        background: $--mustard;
      }
      &__label {
        color: $--mustard;
      }
    }

    &--operation &__element {
      &__bar {
        background: $--blue;
      }
      &__label {
        color: $--blue;
      }
    }
  }
</style>