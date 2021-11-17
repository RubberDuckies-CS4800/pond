<template>
	<v-container class="user-controls">
		<v-row justify="center">
			<Pencil />
			<Eraser />
			<Microphone :hasMicrophone="hasMicrophone" />
			<Camera :hasCamera="hasCamera" />

			<v-btn color="#FFFFFF" x-large icon @click="exitRoom">
				<v-icon>mdi-exit-to-app</v-icon>
			</v-btn>
		</v-row>
	</v-container>
</template>

<script>
import Pencil from "@/components/UserControls/Pencil.vue";
import Eraser from "@/components/UserControls/Eraser.vue";
import Microphone from "@/components/UserControls/Microphone.vue";
import Camera from "@/components/UserControls/Camera.vue";

export default {
	props: {
		hasCamera: Boolean,
		hasMicrophone: Boolean,
	},
	components: {
		Pencil,
		Eraser,
		Microphone,
		Camera,
	},
	methods: {
		setWhiteboardActive() {

		},
		exitRoom() {
			console.log("Trying to exit the current room.");
			// some other functionality goes here
			this.$router.push("/");
		},
	},
};
</script>

<style scoped>
.user-controls {
	position: absolute;
	width: 300px;
	bottom: 0px;
	right: 25%;
	left: 50%;
	margin-left: -150px;
}
</style>