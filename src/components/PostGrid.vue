<template>
	<!-- all your div are belong to us -->
	<div id="posts">
		<div class="loader" :class="{ hidden: !showLoader }"></div>
		<div class="container">
			<div
				class="post"
				v-for="item in items"
				:key="getSafe(() => item.id)"
				:title="getSafe(() => item.id)"
				@click="openModal(getSafe(() => item.id))"
			>
				<Post
					:id="getSafe(() => item.id)"
					:desc="getSafe(() => item.desc)"
					:img="getSafe(() => item.img)"
					:class="{ hidden: !showPosts }"
				/>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Post from './Post.vue';
import 'reflect-metadata';
import { Component, Watch } from 'vue-property-decorator';
import { Item } from '../../types/item';

@Component({
	components: {
		Post,
	},
})
export default class PostGrid extends Vue {
	private showLoader = true;
	private showPosts = false;

	get items(): Item[] {
		return this.$store.state.items;
	}

	beforeCreate() {
		this.$store.dispatch('fetchItems');
	}

	mounted() {
		this.$emit('toggle-header', true);
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

		this.showLoader = false;
		this.showPosts = true;

		setTimeout(this.resizeAllGridItems, 350);
	}

	/* The following code is a disgusting "migration" from vanilla JS
		 Masonry layout using CSS grid
		 Make many small grid rows, calculate how many rows each element should span
		 TODO: rewrite in SAAS/scss? */
	resizeGridItem(item: HTMLElement) {
		const postContainer = document.querySelector('div.container') as Element;
		const rowHeight = parseInt(
			window.getComputedStyle(postContainer)?.getPropertyValue('grid-auto-rows')
		);
		const rowGap = parseInt(
			window.getComputedStyle(postContainer)?.getPropertyValue('grid-row-gap')
		);
		const rowSpan =
			Math.ceil(
				(item.children[0]?.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
			) ?? 0;
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
#posts {
	margin: 15px;
}

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
	cursor: pointer;
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
