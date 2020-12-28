<template>
	<div>
		<picture-input
			ref="pictureInput"
			@change="onFileReceive"
			width="600"
			height="600"
			margin="16"
			accept="image/jpeg,image/png"
			size="10"
			buttonClass="btn"
			:customStrings="{
				upload: '<h1>Bummer!</h1>',
				drag: 'Click or drag image to upload',
			}"
		/>
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PictureInput from 'vue-picture-input';
import { v2 as cloudinary } from 'cloudinary';
import Component from 'vue-class-component';

@Component({
	components: {
		PictureInput,
	},
})
export default class Upload extends Vue {
	private image: string | null = null;

	onFileReceive(image: string) {
		cloudinary.uploader.upload(image, (err: string, res: string) => {
			if (err) console.error(`Image upload error: ${err}`);
			console.log(res);
			this.image = image;
			this.upload();
		});
	}

	upload() {
		fetch
	}
}
</script>

<style scoped></style>
