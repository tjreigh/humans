<template>
	<div>
		<router-view>
			<p>This is the modal with id {{ $route.params.id }}</p>
		</router-view>
	</div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class PostModal extends Vue {

}
</script>

<style>

</style>
