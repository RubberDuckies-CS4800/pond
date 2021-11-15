<template>
	<div class="hello">
		<!-- <h1>{{ avatars }}</h1> -->
		<h1>Meeting Room</h1>
		<p>{{ streams.length }} users are connected</p>
		<p v-if="!myStreamIsOk">
			You have not given Pond permission to use your microphone or webcam
		</p>

		<Whiteboard :whiteboardActive="whiteboardActive" />

		<Avatars
			:avatars="avatars"
			:name="myName"
			:myAvatar="myAvatar"
			:isHost="isHost"
		/>

		<UserControls
			@setWhiteboardActive="setWhiteboardActive"
			:hasMicrophone="hasMicrophone"
			:hasCamera="hasCamera"
		/>

		<MuteAll :myAvatar="myAvatar" :isHost="isHost" />
	</div>
</template>

<script>
import { state } from "@/backend/peers";
import Whiteboard from "@/components/Whiteboard.vue";
import Avatars from "@/components/Avatars.vue";
import UserControls from "@/components/UserControls.vue";
import {
	sendLeaveRoom,
	onAvatar,
	onRemoveAvatar,
	requestAvatars,
} from "@/backend/socket";
import MuteAll from "@/components/MuteAll.vue";

export default {
	components: {
		Whiteboard,
		Avatars,
		UserControls,
		MuteAll,
	},
	data() {
		return {
			whiteboardActive: true,
			avatars: {},
		};
	},
	name: "Meeting",
	props: {
		msg: String,
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
		hasMicrophone() {
			return state.hasMicrophone;
		},
		hasCamera() {
			return state.hasCamera;
		},
		myAvatar() {
			if (this.avatars) {
				return this.avatars[state.myId];
			}
			return null;
		},
		isHost() {
			if (this.myAvatar) {
				return this.myAvatar.isHost;
			}
			return false;
		},
	},
	created() {
		if (state.roomId === null) {
			this.$router.push("/");
		}
		onAvatar((avatar) => {
			this.$set(this.avatars, avatar.id, avatar);
		});
		onRemoveAvatar((id) => {
			this.$delete(this.avatars, id);
		});

		requestAvatars();
	},
	methods: {
		setWhiteboardActive(whiteboardActive) {
			this.whiteboardActive = whiteboardActive;
		},
	},
	beforeDestroy() {
		sendLeaveRoom();
	},
};
</script>
<style scoped>
</style>
