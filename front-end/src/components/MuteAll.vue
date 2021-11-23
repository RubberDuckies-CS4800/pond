<template>
	<div>
		<v-btn
			v-if="isHost"
			color="#71BD36"
			class="mute-all-btn"
			@click="muteAll"
		>
			Mute All
		</v-btn>
	</div>
</template>

<script>
import { sendMuteAll } from "@/backend/socket";

export default {
	props: {
		myAvatar: Object,
		isHost: Boolean,
	},
	methods: {
		muteAll() {
			sendMuteAll(this.myAvatar);
		},
	},
};
</script>

<style scoped>
.mute-all-btn {
	position: fixed;
	bottom: 0;
	right: 0;
}
</style>