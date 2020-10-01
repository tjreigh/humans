<template>
	<div class="container">
		<div class="post" v-for="item in items" :key="item.id" @click="openModal(item.id)" :title="item.id">
			<div class="postContent">
				<img class="postImg" :src="item.img"/>
				<div class="desc">
					<p>{{ item.desc }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Item } from '../../types/item';

@Component
export default class Post extends Vue {
	@Prop({
		required: true,
	})
	private items!: Item[]

	openModal = (id: number) => {
		this.$router.push({ path: `/post/${id}` });
	}

	/* The following code is a disgusting "migration" from vanilla JS
		 Please refrain from informing me just how awful it is.
		 Trust me, I know. I wrote it. */
	resizeGridItem = (item: HTMLElement) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const grid: Element = document.querySelector('div.container')!; // Yes this assertion is stupid
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
	};
};
</script>

<style scoped>
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
</style>
