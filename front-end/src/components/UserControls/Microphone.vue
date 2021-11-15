<template>
	<div>
		<!-- Not muted -->
		<v-btn
			v-if="audioOn"
			:disabled="!hasMicrophone"
			color="#FFFFFF"
			x-large
			icon
			@click="toggleMute"
		>
			<v-icon>mdi-microphone</v-icon>
		</v-btn>

		<!-- Muted -->
		<v-btn
			v-else
			:disabled="!hasMicrophone"
			color="#FF0000"
			x-large
			icon
			@click="toggleMute"
		>
			<v-icon>mdi-microphone-off</v-icon>
		</v-btn>
	</div>
</template>

<script>
import { setAudioEnabled, onMuteAll } from "@/backend/socket";
export default {
	props: {
		hasMicrophone: Boolean,
	},
	data() {
		return {
			audioOn: false,
		};
	},
	created() {
		onMuteAll((hostAvatar) => {
			console.log(hostAvatar.name + " muted the room.");
			this.audioOn = false;
		});
	},
	methods: {
		toggleMute() {
			this.audioOn = !this.audioOn;
			setAudioEnabled(this.audioOn);
		},
	},
};
</script>

<style scoped>
</style>