import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import PostGrid from './pages/PostGrid.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'Home',
		component: PostGrid, // No lazy loading for home component
	},
	{
		path: '/post/:id',
		name: 'Post',
		component: () => import(/* webpackChunkName: "PostModal" */ './pages/PostModal.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "Login" */ './components/Login.vue'),
	},
];

const router = new VueRouter({
	base: '/',
	mode: 'history',
	routes,
});

export default router;
