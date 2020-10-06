<template>
	<!-- all your div are belong to us -->
	<div id="posts">
		<div id="loader"></div>
		<div class="container">
			<div class="post" v-for="item in items" :key="item.id" @click="openModal(item.id)" :title="item.id">
				<div class="postContent">
					<img class="postImg" :src="item.img" />
					<div class="desc">
						<p>{{ item.desc }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Item } from '../../types/item';

@Component
export default class Post extends Vue {
	@Prop({ required: true })
	private items!: Item[];

	openModal(id: number) {
		this.$router.push({ path: `/post/${id}` });
	}

	@Watch('items')
	dataLoaded(newData: Item[], oldData: Item[]) {
		const loader = document.querySelector('#loader') as HTMLElement;
		const postContainer = document.querySelector('div.container') as HTMLElement;

		loader.style.display = 'none';
		postContainer.style.display = 'grid';
	}

	/* The following code is a disgusting "migration" from vanilla JS
		 Please refrain from informing me just how awful it is.
		 Trust me, I know. I wrote it. */
	resizeGridItem = (item: HTMLElement) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const grid = document.querySelector('div.container') as HTMLElement; // Yes this assertion is stupid
		const rowHeight = parseInt(window.getComputedStyle(grid)?.getPropertyValue('grid-auto-rows'));
		const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
		const rowSpan = Math.ceil((item.children[0].getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)) ?? 0;
		item.style.gridRowEnd = `span ${rowSpan}`;
	};

	resizeAllGridItems = () => {
		const allItems = document.getElementsByClassName('post');
		for (let x = 0; x < allItems.length; x++) {
			this.resizeGridItem(allItems[x] as HTMLElement); // Assert to HTMLElement for style property
		}
	};

	mounted() {
		setTimeout(this.resizeAllGridItems, 350);
		window.addEventListener('resize', this.resizeAllGridItems);
	}
}
</script>

<style scoped>
#loader {
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
	display: none;
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
