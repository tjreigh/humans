import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
	el: '#app',
	render: h => h(App),
	store,
	router,
}).$mount('#app');
