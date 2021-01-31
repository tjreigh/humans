import Vue from 'vue';
import VueRouter from 'vue-router';
import PostGrid from '@web/components/PostGrid.vue';
import PostModal from '@web/components/PostModal.vue';
import Login from '@web/components/Login.vue';

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: PostGrid,
		},
		{
			path: '/post/:id',
			name: 'Post',
			component: PostModal,
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
	],
});
