<template>
	<div :title="getSafe(() => id)">
		<img class="postImg" :src="getSafe(() => img)" />
		<div class="desc">
			<p>{{ getSafe(() => desc) }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Post extends Vue {
	@Prop({ type: Number, required: true }) readonly id!: number;
	@Prop({ type: String, required: true }) readonly desc!: string;
	@Prop({ type: String, required: true }) readonly img!: string;
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
