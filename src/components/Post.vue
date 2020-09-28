<template>
	<div class="container">
		<p>test {{ items }}</p>
		<div class="post" v-for="item in items" :key="item.id" @click="openModal(item.id)">
			<img class="postImg" :src="item.img"/>
			<div class="desc">
				<p>{{ item.desc }}</p>
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
	@Prop()	private items!: Item[]

	openModal(id: number) {
		this.$router.push({ path: `/post/${id}` });
	}
};
</script>

<style lang="scss">
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

.postImg {
	width: 100%;
	max-height: 750px;
	overflow: hidden;
}
</style>
