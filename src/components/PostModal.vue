<template>
	<div>
		<p>This is the modal with id {{ id }}</p>
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class PostModal extends Vue {
	@Prop() private id!: number;
}
</script>

<style></style>
