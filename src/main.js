import Vue from 'vue';
import App from './App.vue';
import router from './router';

window.axios = require('axios');

Vue.config.productionTip = false

Vue.prototype.$API_URL = "http://localhost/api";

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
