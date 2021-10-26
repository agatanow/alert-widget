<template>
  <div class="alert-widget">
    <div class="alert-widget__header">
      <div class="alert-widget__header__info">
        <h3 class="alert-widget__name"> {{ systemName }} </h3>
        <p class="alert-widget__domain"> {{ systemDomain }} </p>
      </div>
      <Counter
        :value="`${avgResponseTime} ${labels.ms}`"
        :label="labels.avgResponseTime"
        :type="averageResponseTimeType"
      />
    </div>
    <div class="alert-widget__counters">
      <MeasureWidget
        :data="errors"
        :label="labels.errorsInLastHour"
        :type="'error'"
      />
      <MeasureWidget
        :data="warnings"
        :label="labels.warningsInLastHour"
        :type="'warning'"
      />
      <MeasureWidget
        :data="operations"
        :label="labels.operationsInLastHour"
        :type="'operation'"
      />
    </div>
    <div class="alert-widget__details">
      <div><p>{{ labels.lastError }}: {{ lastErrorDate }}</p></div>
      <div><p>{{ labels.sinceLastSync }}: {{ sinceLastSync }}</p></div>
      <div><p>{{ labels.dailyErrorCount }}: {{ dailyErrorCount }}</p></div>
    </div>
  </div>
</template>

<script>
import { getAlerts } from '../services/alerts';
import labels from '../labels/labels';
import Counter from './Counter';
import MeasureWidget from './MeasureWidget.vue';

export default {
  name: 'AlertWidget',
  components: { Counter, MeasureWidget },
  props: ['syncTime'],
  data() {
    return {
      systemName: '',
      systemDomain: '',
      avgResponseTime: 0,
      avgResponseTimeWarningLimit: 0,
      avgResponseTimeAlertLimit: 0,
      errors: [],
      warnings: [],
      operations: [],
      lastErrorDate: '-',
      dailyErrorCount: 0,
      sinceLastSyncDate: null,
      dateNow: new Date(),
      labels
    };
  },
  methods: {
    updateTime() {
      this.dateNow = new Date();
    },
    async updateAlerts(){
      let res = await getAlerts();
      this.systemName = res.Name;
      this.systemDomain = res.Url;
      this.avgResponseTime = res.AvgResponseTime;
      this.avgResponseTimeWarningLimit = res.AvgResponseTimeWarningLimit;
      this.avgResponseTimeAlertLimit = res.AvgResponseTimeAlertLimit;
      this.dailyErrorCount = res.DailyErrorCount;
      this.lastErrorDate = res.LastErrorStr;
      this.errors = res.Errors;
      this.warnings = res.Warnings;
      this.operations = res.Operations;
      this.sinceLastSyncDate = new Date();
    }
  },
  computed: {
    sinceLastSync() {
      if(this.sinceLastSyncDate){
        const duration = Math.max(this.dateNow - this.sinceLastSyncDate,0);
        return new Date(duration).toISOString().substr(11, 8);
      }
      return '-'
    },
    averageResponseTimeType() {
      if(this.avgResponseTime > this.avgResponseTimeAlertLimit) {
        return 'error';
      }
      if(this.avgResponseTime > this.avgResponseTimeWarningLimit) {
        return 'warning';
      }
      return '';
    }
  },
  async mounted() {
    this.updateTime();
    this.clockInterval = setInterval(this.updateTime, 100);
    await this.updateAlerts();
    this.clockInterval = setInterval(this.updateAlerts, this.syncTime);
  },
  beforeDestroy() {
    clearInterval(this.clockInterval)
  }
}
</script>

<style scoped lang="scss">
.alert-widget {
  padding: 20px;
  background: $--black-semi-transparent;
  margin: auto;
  margin-bottom: 20px;
  max-width: 900px;

  &__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;

    @include breakpoint-sm {
      flex-direction: row;
      align-items: end;
      padding-bottom: 10px;

      & .counter {
        padding: 0;

        &__value{
          font-size: 1.3rem;
        }
      }
    }
  }

  &__name {
    margin: 0;
    text-transform: uppercase;
    font-size: 1.7rem;
    color: $--white;
  }

  &__domain {
    margin: 0;
    color: $--graphit;
  }

  &__counters {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;

    @include breakpoint-sm {
      flex-direction: row;
    }
  }
  &__details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;

    & div {

      & p {
        white-space: nowrap;
        margin: 10px 0 0;
        color: $--lavender;
        display: inline-block;
      }

      @include breakpoint-sm {
        width: 50%;

        &:nth-child(even){
          text-align: right;
        }
      }
    }

    @include breakpoint-sm {
      flex-direction: row;
      align-items: end;
    }
  }
}
</style>
