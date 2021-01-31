<template>
	<div id="loginPage">
		<form id="loginForm" @submit="handleLogin" method="post">
			<input v-model="username" type="text" placeholder="Username" />
			<input v-model="password" type="password" placeholder="Password" />
			<input type="submit" value="Login" />
		</form>
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ActionNames } from '@store';

@Component({
	name: 'Login',
})
export default class Login extends Vue {
	private username!: string;
	private password!: string;

	handleLogin(e: Event) {
		e.preventDefault();

		const didLogin = this.$tStore.dispatch(ActionNames.TryLoginUser, [
			this.username,
			this.password,
		]);
		if (didLogin) alert(`Welcome, ${this.$tStore.getters.user}`);
	}
}
</script>

<style scoped></style>
