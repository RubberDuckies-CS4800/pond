<template>
	<div class="wrapper">
		<!-- <h1>{{ avatars }}</h1> -->
		<MeetingGraphics class="graphics" />
		<h1>Meeting Room</h1>
		<p>{{ streams.length }} users are connected</p>
		<p v-if="!myStreamIsOk">
			You have not given Pond permission to use your microphone or webcam
		</p>

		<Whiteboard />

		<Avatars
			:avatars="avatars"
			:name="myName"
			:myAvatar="myAvatar"
			:isHost="isHost"
		/>

		<UserControls
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
import MeetingGraphics from "@/components/MeetingGraphics.vue";
import {
	sendLeaveRoom,
	handlers,
	requestAvatars,
} from "@/backend/socket";
import MuteAll from "@/components/MuteAll.vue";

export default {
	components: {
		Whiteboard,
		Avatars,
		UserControls,
		MuteAll,
		MeetingGraphics
	},
	data() {
		return {
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
		handlers.onAvatar = (avatar) => {
			this.$set(this.avatars, avatar.id, avatar);
		};
		handlers.onRemoveAvatar = (id) => {
			this.$delete(this.avatars, id);
		};

		requestAvatars();
	},
	beforeDestroy() {
		sendLeaveRoom();
	},
};
</script>
<style scoped>
.graphics {
  position: fixed;
}

.wrapper {
  display: grid;
  text-align: center;
}

.wrapper:not(.graphics){
    z-index: 10;
}

h1{
	z-index: 10;
}

p {
	z-index: 10;
}

Whiteboard {
	z-index: 11;
}
</style>
