import Vue from 'vue';
import VueRouter from 'vue-router';
import Post from './components/Post.vue';
import PostModal from './components/PostModal.vue';

Vue.use(VueRouter);

export default new VueRouter({
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
