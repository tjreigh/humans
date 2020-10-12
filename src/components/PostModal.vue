<template>
	<div>
		<div class="post" :title="item.id">
			<img class="img" :src="item.img" />
			<p>{{ item.desc }}</p>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'reflect-metadata';
import { Component, Prop } from 'vue-property-decorator';
import { Item } from 'types/item';

@Component
export default class PostModal extends Vue {
	@Prop({ required: true }) private id!: number;

	get item(): Item {
		console.log(this.$store.state);
		return this.$store.getters.oneItem(this.id);
	}

	mounted() {
		console.log(this.item);
	}
}
</script>

<style scoped>
img {
	size: 100%;
}
</style>
