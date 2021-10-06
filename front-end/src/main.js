import Vue from 'vue'
import App from './App.vue'
import './backend';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
