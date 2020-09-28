import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import PostModal from './components/PostModal.vue';

Vue.config.productionTip = false;

const router = new VueRouter({
	routes: [
		{ path: '/post/:id', component: PostModal },
	]
});

new Vue({
	render: h => h(App),
	router
}).$mount('#app');
