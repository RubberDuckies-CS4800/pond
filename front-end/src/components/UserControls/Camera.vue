<template>
	<div>
		<!-- Camera off -->
		<v-btn
			v-if="cameraOn"
			:disabled="!hasCamera"
			color="#FFFFFF"
			x-large
			icon
			@click="toggleCamera"
		>
			<v-icon>mdi-camera</v-icon>
		</v-btn>

		<!-- Camera on -->
		<v-btn
			v-else
			:disabled="!hasCamera"
			color="#FF0000"
			x-large
			icon
			@click="toggleCamera"
		>
			<v-icon>mdi-camera-off</v-icon>
		</v-btn>
	</div>
</template>

<script>
import { setVideoEnabled } from "@/backend/socket";
export default {
	props: {
		hasCamera: Boolean,
	},
	data() {
		return {
			cameraOn: false,
		};
	},
	methods: {
		toggleCamera() {
			this.cameraOn = !this.cameraOn;
			setVideoEnabled(this.cameraOn);
		},
	},
};
</script>

<style scoped>
</style>