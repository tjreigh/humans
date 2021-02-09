<template>
	<!-- all your div are belong to us -->
	<div id="posts">
		<Spinner v-if="showLoader" />
		<div id="error" v-if="items == null">
			<p>Error loading posts</p>
		</div>
		<div v-if="!didError" class="container">
			<div
				class="post"
				v-for="item in items"
				:key="item.id"
				:title="item.id"
				@click="openModal(item.id)"
			>
				<Post v-if="item != null" v-show="showPosts" :item="item" />
			</div>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Item } from '@typings';
import { ActionNames } from '@store';

@Component({
	components: {
		Post: () => import('@web/components/Post.vue'),
		Spinner: () => import('@web/components/Spinner.vue'),
	},
})
export default class PostGrid extends Vue {
	private showLoader = true;
	private showPosts = false;

	get items(): Item[] | null {
		const maybeItems = this.$tStore.state.items;

		if (!maybeItems) {
			this.showLoader = false;
			return null;
		}

		return maybeItems;
	}

	beforeCreate() {
		this.$tStore.dispatch(ActionNames.FetchItems);
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
	onRecieveItems(newItems: Item[]) {
		if (newItems.length < 0) return;

		this.showLoader = false;

		setTimeout(this.resizeAllGridItems, 350);
	}

	/* The following code is a disgusting "migration" from vanilla JS
		 Masonry layout using CSS grid
		 Make many small grid rows, calculate how many rows each element should span
		 TODO: rewrite in SAAS/scss? */
	resizeGridItem(item: HTMLElement) {
		const postContainer = document.querySelector('div.container') as HTMLElement;
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

#error {
	display: flex;
	align-items: center;
	justify-content: center;
}

#error > p {
	padding: 5px;
	text-align: center;
	font-size: 32pt;
}
</style>
