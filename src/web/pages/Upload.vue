<template>
	<div>
		<form id="uploadForm" @submit="handleForm" enctype="multipart/form-data" action="">
			<label for="desc">Post description</label>
			<input id="desc" v-model="desc" type="textarea" />
			<input id="img" @change="onFileChange" type="file" />
			<input type="submit" value="Upload" />
		</form>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { CloudinaryUploadRes } from '@typings';

interface HTMLInputEvent extends Event {
	target: HTMLInputElement & EventTarget;
}

@Component
export default class Upload extends Vue {
	private desc!: string;
	private imgFile!: File;

	onFileChange(e: HTMLInputEvent) {
		e.preventDefault();

		this.imgFile = e.target.files![0];
	}

	async uploadFile(imgFile: File) {
		const formData = new FormData();
		formData.append('file', imgFile);

		const res = await fetch('https://api.cloudinary.com/v1_1/lhs-humans/image/upload', {
			method: 'POST',
			body: formData,
		});
		const body: CloudinaryUploadRes = await res.json();

		return { ok: res.ok, url: body.url };
	}

	async addToApi(img: string, desc: string): Promise<boolean> {
		const body = JSON.stringify({ img, desc });

		const res = await fetch('/api/add', {
			method: 'POST',
			mode: 'same-origin',
			body,
		});

		if (res.ok) return true;
		return false;
	}

	async handleForm(e: Event) {
		e.preventDefault();

		if (!this.imgFile) return alert('Could not find image file (did you upload it?)');

		const uploadRes = await this.uploadFile(this.imgFile);
		if (!uploadRes.ok) return alert('Problem uploading image to cloud provider, please try again');

		const addRes = this.addToApi(uploadRes.url, this.desc);
		if (!addRes) return alert('Problem adding image record');
	}
}
</script>

<style scoped></style>
