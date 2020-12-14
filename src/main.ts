import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import { v2 as cloudinary } from 'cloudinary';

// /*eslint-disable @typescript-eslint/camelcase*/
// cloudinary.config({
// 	cloud_name: '',
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// /*eslint-enable @typescript-eslint/camelcase*/

Vue.config.productionTip = false;

// Mixin for optionals
Vue.mixin({
	methods: {
		getSafe: function(func: () => any) {
			try {
				return func();
			} catch (e) {}
		},
	},
});

new Vue({
	el: '#app',
	render: h => h(App),
	store,
	router,
}).$mount('#app');
