<template>
  <div id="app">
    <AlertWidget 
      v-for="idx in alertWidgetsNo" 
      :key="`alert-widget-${idx}`"
      :syncTime="syncTime"
    />
  </div>
</template>

<script>
import AlertWidget from './components/AlertWidget.vue'

export default {
  name: 'App',
  components: {
    AlertWidget
  },
  data() {
    return {
      alertWidgetsNo: 1,
      syncTime: 20000
    }
  },
  mounted() {
    //mockup to ensure that alert widgets are created at differnet times and receive different data
    let t = this;
    let intervalID = setInterval(() => {
      if (++t.alertWidgetsNo === 3) {
        window.clearInterval(intervalID);
      }
    }, 1123);
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  background: rgb(9,12,21);
  background: linear-gradient(0deg, rgba(9,12,21,1) 0%, rgba(100,113,112,1) 100%); 
  background-attachment: fixed;
  padding: 20px;
  * {
    font-size: 1rem;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
}
</style>
