<template>
  <div :class="['counter', type ? `counter--${type}` : '']">
    <div class="counter__value">
      {{ value }}
    </div>
    <div class="counter__avg-value">
      <span v-if="avgValue">({{ avgValue }})</span>
    </div>
    <div class="counter__label">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: [
    'value',
    'avgValue',
    'label',
    'type'
  ]
}
</script>

<style scoped lang="scss">
  .counter {
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    justify-content: space-between;
    color: $--graphit;

    @include breakpoint-sm {
      align-items: center;
    }

    &__value{
      font-size: 1.6rem;
    }

    &__avg-value {
      font-size: 0.7rem;
      line-height: 0.7rem;
    }

    &__label {
      font-size: 0.9rem;
    }

    &--error {
      color: $--red;
    }

    &--warning {
      color: $--mustard;
    }

    &--operation {
      color: $--blue;
    }
  }
</style>