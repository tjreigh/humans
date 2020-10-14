<template>
	<div>
		<div class="exit" @click="exit()">&#10006;</div>
		<div class="post" :title="title">
			<img class="img" :src="img" />
			<p class="desc">{{ desc }}</p>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'reflect-metadata';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Item } from '../../types/item';

@Component
export default class PostModal extends Vue {
	@Prop({ type: String, required: true }) id: string = this.$route.params.id;
	private item!: Item;
	private title = this.item?.id ?? '';
	private img = this.item?.img ?? '';
	private desc = this.item?.desc ?? '';

	beforeCreate() {
		this.$store.dispatch('fetchItems');
	}

	mounted() {
		this.$emit('toggle-header', false);
	}

	@Watch('item', { immediate: true })
	itemChange() {
		console.log('itemChange');
		console.log(this.$store);
		const item: Item = this.$store.getters.oneItem(parseInt(`${this.id}`));
		console.log(item);
		this.setProps(item);
		return item;
	}

	setProps(item: Item) {
		this.title = item.id;
		this.img = item.img;
		this.desc = item.desc;
	}

	exit() {
		this.$router.push('/');
	}
}
</script>

<style scoped>
img {
	height: 100%;
	width: 60%;
}

.exit {
	position: absolute;
	right: 25px;
	z-index: 1;
	padding: 5px;
	color: red;
	font-size: 40pt;
	cursor: pointer;
}

.post {
	padding: 25px;
	text-align: center;
}

.desc {
	padding: 5px 15px 10px;
	font-size: 13pt;
}
</style>
