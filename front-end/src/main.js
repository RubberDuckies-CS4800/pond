import Vue from 'vue'
import App from './App.vue'
import './backend';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
