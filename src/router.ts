import VueRouter from 'vue-router';
import Post from './components/Post.vue';
import PostModal from './components/PostModal.vue';

export const router = new VueRouter({
	routes: [
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
	],
});
