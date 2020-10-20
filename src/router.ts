import { createRouter, createWebHashHistory } from 'vue-router';
import Post from './components/Post.vue';
import PostModal from './components/PostModal.vue';

const routes = [
	{
		path: '/post/:id',
		name: 'Post',
		component: PostModal,
		props: true,
	},
	{
		path: '/',
		name: 'Home',
		component: Post,
	},
];

export default createRouter({
	history: createWebHashHistory(),
	routes,
});
