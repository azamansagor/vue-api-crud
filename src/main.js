import Vue from 'vue';
import App from './App.vue';
import router from './router';

// import VeeValidate from 'vee-validate';
import './libs/VeeValidate';

//import sweetalert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

// Add Twitter Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//enable axios globally
window.axios = require('axios');

Vue.config.productionTip = false;


//api base path
Vue.prototype.$API_URL = "http://localhost/api";

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
