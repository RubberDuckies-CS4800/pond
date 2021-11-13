<template>
	<div class="hello">
		<h1>Meeting Room</h1>
		<p>{{ streams.length }} users are connected</p>
		<p v-if="!myStreamIsOk">
			You have not given Pond permission to use your microphone or webcam
		</p>
		<Whiteboard :whiteboardActive="whiteboardActive" />

		<Avatars
			:name="myName"
			:roomId="roomId"
			:myAvatar="myAvatar"
			:isHost="isHost"
		/>

		<div id="user_controls">
			<UserControls @setWhiteboardActive="setWhiteboardActive" />
		</div>
	</div>
</template>

<script>
import { state } from "@/backend/peers";
import Whiteboard from "@/components/Whiteboard.vue";
import Avatars from "@/components/Avatars.vue";
import UserControls from "@/components/UserControls.vue";
import { sendLeaveRoom } from "@/backend/socket";

export default {
	components: {
		Whiteboard,
		Avatars,
		UserControls,
	},
	data() {
		return {
			whiteboardActive: true,
		};
	},
	name: "Meeting",
	props: {
		msg: String,
	},
	methods: {
		setWhiteboardActive(whiteboardActive) {
			this.whiteboardActive = whiteboardActive;
		},
	},
	computed: {
		streams() {
			return state.streams;
		},
		myName() {
			return state.myName;
		},
		roomId() {
			return state.roomId;
		},
		myStreamIsOk() {
			return state.myStreamIsOk;
		},
		myAvatar() {
			return this.avatars[state.myId];
		},
		isHost() {
			return this.myAvatar.isHost;
		},
	},
	mounted() {
		if (state.roomId === null) {
			this.$router.push("/");
		}
	},
	beforeDestroy() {
		console.log("BEFOREDESTROYED");
		sendLeaveRoom();
	},
};
</script>
<style>
#user_controls {
	position: absolute;
	bottom: 0;
	width: 100%;
}
</style>
