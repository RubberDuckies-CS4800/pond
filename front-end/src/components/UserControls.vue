<template>
	<v-container>
		<v-item-group>
			<v-btn
				:color="drawingOn ? '#00FF00' : '#FFFFFF'"
				x-large
				icon
				@click="toggleDraw"
			>
				<v-icon>mdi-pencil</v-icon>
			</v-btn>

			<!-- Not muted -->
			<v-btn
				v-if="audioOn"
				color="#FFFFFF"
				x-large
				icon
				@click="toggleMute"
			>
				<v-icon>mdi-microphone</v-icon>
			</v-btn>
			<!-- Muted -->
			<v-btn v-else color="#FF0000" x-large icon @click="toggleMute">
				<v-icon>mdi-microphone-off</v-icon>
			</v-btn>

			<!-- Camera off -->
			<v-btn
				v-if="cameraOn"
				color="#FFFFFF"
				x-large
				icon
				@click="toggleCamera"
			>
				<v-icon>mdi-camera</v-icon>
			</v-btn>

			<!-- Camera on -->
			<v-btn v-else color="#FF0000" x-large icon @click="toggleCamera">
				<v-icon>mdi-camera-off</v-icon>
			</v-btn>

			<v-btn color="#FFFFFF" x-large icon @click="exitRoom">
				<v-icon>mdi-exit-to-app</v-icon>
			</v-btn>
		</v-item-group>
	</v-container>
</template>

<script>
import { setAudioEnabled, setVideoEnabled, onMuteAll } from "@/backend/socket";

export default {
	data() {
		return {
			audioOn: false,
			cameraOn: false,
			drawingOn: true,
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
		toggleCamera() {
			this.cameraOn = !this.cameraOn;
			setVideoEnabled(this.cameraOn);
		},
		toggleDraw() {
			this.drawingOn = !this.drawingOn;
			this.$emit("setWhiteboardActive", this.drawingOn);
		},
		exitRoom() {
			console.log("Trying to exit the current room.");
			// some other functionality goes here
			this.$router.push("/");
		},
	},
};
</script>

<style>
</style>