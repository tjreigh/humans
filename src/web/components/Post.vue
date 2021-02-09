<template>
	<div :title="item.id">
		<img class="postImg" :src="item.img" />
		<div class="desc">
			<p>{{ item.desc }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Item } from '@typings';
import { isItem } from '@/util';

@Component
export default class Post extends Vue {
	@Prop({ type: Object, required: true }) item: Item | null = null;

	@Watch('item')
	onRecieveItem(newItem: Item) {
		if (!isItem(newItem)) this.item = null;
	}
}
</script>

<style scoped>
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
