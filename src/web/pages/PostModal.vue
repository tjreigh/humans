<template>
	<div>
		<div class="exit" @click="exit()">&#10006;</div>
		<Post :id="getSafe(() => id)" :desc="getSafe(() => desc)" :img="getSafe(() => img)" />
		<router-view />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
	components: {
		Post: () => import('@web/components/Post.vue'),
	},
})
export default class PostModal extends Vue {
	@Prop({ type: String, required: true }) id: number = parseInt(this.$route.params.id);
	private itemGetter = this.$tStore.getters.oneItem(this.$tStore.state);
	private item = this.itemGetter(this.id);
	private title = this.item?.id ?? '';
	private img = this.item?.img ?? '';
	private desc = this.item?.desc ?? '';

	beforeCreate() {
		this.$store.dispatch('fetchItems');
	}

	mounted() {
		this.$emit('toggle-header', false);
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
