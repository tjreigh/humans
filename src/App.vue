<template>
	<div id="app">
		<div class="header" :class="{ hidden: !showHeader }">
			<div class="exit">
				<button class="exitBtn" onclick="window.location.href = 'https://therideronline.com';">Home</button>
			</div>
			<div class="heading" align="center">
				<img
					src="https://legacystudentmedia.com/media/logo.png"
					style="width:100%; max-height: 300px; max-width: 700px"
				/>
			</div>
		</div>
		<router-view @toggle-header="toggleHeader" />
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class App extends Vue {
	private showHeader = true;

	toggleHeader(headerState: boolean) {
		this.showHeader = headerState;
		console.log(`header toggled to ${headerState}`);
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

.hidden {
	display: none;
}

.header {
	padding: 15px;
	position: sticky;
	top: 0;
	vertical-align: top;
	/*display: inline-block;
	grid-template-columns: 20% [title] auto [title-end] 15%;
	width: 100%;*/
	background: #d52526;
	z-index: 10;
}

.exit {
	display: inline-block;
	position: relative;
	right: 0;
	z-index: 1;
}

.exitBtn {
	font-size: 16px;
	background-color: white;
	color: #231f20;
	border: 2px solid #2e2e2e;
	transition-duration: 0.4s;
}

.exitBtn:hover {
	background-color: #2e2e2e;
	color: white;
}
</style>
