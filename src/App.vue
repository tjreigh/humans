<template>
	<div id="app">
		<router-view />
		<!-- <Post :items="items" /> -->
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Post from './components/Post.vue';

@Component({
	components: {
		Post,
	},
})
export default class App extends Vue {}
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
