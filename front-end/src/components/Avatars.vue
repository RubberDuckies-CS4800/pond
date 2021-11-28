<template>
	<div>
		<Avatar
			v-for="avatar of avatars"
			:key="avatar.id"
			:avatar="avatar"
			:isHost="isHost"
			:myAvatar="myAvatar"
		/>
	</div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";

export default {
	props: {
		avatars: Object,
		name: String,
		myAvatar: Object,
		isHost: Boolean,
	},
	components: {
		Avatar,
	},
	computed: {
		initials() {
			return (
				this.name
					.split(" ")
					.map((x) => x.charAt(0))
					.slice(0, 2)
					.join(". ")
					.toUpperCase() + "."
			);
		},
	},
};
</script>

<style scoped>
.v-avatar {
	position: absolute;
	background: rgb(17, 204, 157);
	z-index: 100;
}

#current_user {
	position: absolute;
	background: rgb(20, 145, 202);
	cursor: move;
	cursor: grab;
	z-index: 500;
}

#current_user:active {
	cursor: grabbing;
}
</style>
