<template>
	<div id="app">
		<Post :items="items" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Post from './components/Post.vue';
import { Item } from '../types/item';

@Component({
	components: {
		Post,
	},
})
export default class App extends Vue {
	items: Item[] = [];
	created() {
		fetch('https://lhs-humans.glitch.me/data')
			.then(res => res.json())
			.then(data => {
				this.items = data.items;
			});
	}
}
</script>

<style>
body {
	margin: 10px;
	padding: 5px;
	color: #231f20;
	background: #efefef;
	font-family: 'Proxima Nova', sans-serif;
	font-size: 1em;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	overflow-x: hidden;
}
</style>
