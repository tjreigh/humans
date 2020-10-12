<template>
	<!-- all your div are belong to us -->
	<div id="posts">
		<div class="loader" :class="{ hidden: !showLoader }"></div>
		<div class="container" :class="{ hidden: !showPosts }">
			<div class="post" v-for="item in items" :key="item.id" @click="openModal(item.id)" :title="item.id">
				<div class="postContent">
					<img class="postImg" :src="item.img" />
					<div class="desc">
						<p>{{ item.desc }}</p>
					</div>
				</div>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'reflect-metadata';
import { Component, Watch } from 'vue-property-decorator';
import { Item } from '../../types/item';

@Component
export default class Post extends Vue {
	private items: Item[] = [];
	private showLoader = true;
	private showPosts = false;

	beforeCreate() {
		console.log(this.$store.state);
		this.items = this.$store.getters.items;
	}

	mounted() {
		window.addEventListener('resize', this.resizeAllGridItems);
	}

	openModal(id: number) {
		this.showPosts = false;

		this.$router.push({ name: 'Post', params: { id: `${id}` } });
	}

	// Hide loader once items load
	@Watch('items')
	dataLoaded(newItems: Item[]) {
		if (newItems.length < 0) return;

		this.toggleVisibility();

		setTimeout(this.resizeAllGridItems, 350);
	}

	toggleVisibility() {
		this.showLoader = !this.showLoader;
		this.showPosts = !this.showPosts;
	}

	/* The following code is a disgusting "migration" from vanilla JS
		 Masonry layout using CSS grid
		 Make many small grid rows, calculate how many rows each element should span
		 TODO: rewrite in SAAS/scss? */
	resizeGridItem(item: HTMLElement) {
		const postContainer = document.querySelector('div.container') as Element;
		const rowHeight = parseInt(window.getComputedStyle(postContainer)?.getPropertyValue('grid-auto-rows'));
		const rowGap = parseInt(window.getComputedStyle(postContainer)?.getPropertyValue('grid-row-gap'));
		const rowSpan = Math.ceil((item.children[0]?.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)) ?? 0;
		item.style.gridRowEnd = `span ${rowSpan}`;
	}

	resizeAllGridItems() {
		console.log('resize');
		this.showPosts = false;

		const allItems = document.getElementsByClassName('post');
		for (let x = 0; x < allItems.length; x++) {
			this.resizeGridItem(allItems[x] as HTMLElement);
		}

		this.showPosts = true;
	}
}
</script>

<style scoped>
.loader {
	position: absolute;
	left: 50%;
	top: 50%;
	z-index: 1;
	width: 150px;
	height: 150px;
	margin: -75px 0 0 -75px;
	border: 16px solid #f3f3f3;
	border-radius: 50%;
	border-top: 16px solid #3498db;
	width: 120px;
	height: 120px;
	animation: spin 2s linear infinite;
	-webkit-animation: spin 2s linear infinite;
}

.hidden {
	display: none;
}

.container {
	position: relative;
	z-index: 0;
	top: 30;
	display: grid;
	grid-column-gap: 50px;
	grid-row-gap: 20px;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	grid-auto-rows: 20px;
}

.post {
	position: relative;
}

.desc {
	padding: 5px 15px 10px;
	font-size: 13pt;
}

.desc p {
	margin-bottom: 10px;
}

.postImg {
	width: 100%;
	max-height: 750px;
	overflow: hidden;
}

@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
