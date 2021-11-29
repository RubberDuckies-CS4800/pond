<template>
	<!-- <h1>volume: {{ scaledVolume }}</h1> -->
	<v-menu
		bottom
		rounded
		offset-y
		:close-on-content-click="false"
		z-index="50"
	>
		<template v-slot:activator="{ on }">
			<v-avatar
				:class="{
					isMyAvatar: isMyAvatar,
					talking: talking && avatar.audio,
				}"
				size="120"
				:style="`height: 90px; min-width: 90px; width: 90px; top: ${screenPos.y}px; left:${screenPos.x}px; position:absolute;`"
				@contextmenu.prevent="on.click"
				@mousedown="onMouseDown($event)"
				:color="`rgb(${color.r},${color.g},${color.b})`"
			>
				<AvatarInside
					:avatar="avatar"
					:initials="initials"
					:volume="scaledVolume"
					:enableVideo="enableVideo"
					@talking="setTalking($event)"
				/>
			</v-avatar>
		</template>

		<v-card class="avatar-card" style="width: 200px; padding: 5px">
			<AvatarMenu
				:name="avatar.name"
				:initials="initials"
				:color="color"
				:isMyAvatar="isMyAvatar"
				:hostPrivilege="isHost"
				@changeVolume="changeVolume"
				@setEnableVideo="setEnableVideo"
			/>
		</v-card>
	</v-menu>
</template>

<script>
import AvatarInside from "@/components/AvatarInside";
import AvatarMenu from "@/components/AvatarMenu";
import { state } from "@/backend/peers";
import { updateAvatar } from "@/backend/socket";
import _ from "lodash";

export default {
	components: {
		AvatarInside,
		AvatarMenu,
	},
	props: {
		avatar: Object,
		isHost: Boolean,
		myAvatar: Object,
	},
	data() {
		return {
			dragOffsetX: 0.0,
			dragOffsetY: 0.0,
			talking: false,
			volume: 50,
			enableVideo: true,
			color: { r: 93, g: 111, b: 199 },
			radius: 2.5,
			dropoffFactor: 0.4,
		};
	},
	created() {
		this.color = this.getRandColor();
	},
	computed: {
		initials() {
			return (
				(this.avatar.name || "")
					.split(" ")
					.map((x) => x.charAt(0))
					.slice(0, 2)
					.join(". ")
					.toUpperCase() + "."
			);
		},
		isMyAvatar() {
			return state.myId === this.avatar.id;
		},
		canvasPos() {
			return {
				x: this.avatar.left,
				y: this.avatar.top,
			};
		},
		screenPos() {
			return this.canvasToScreenPosition({
				x: this.avatar.left,
				y: this.avatar.top,
			});
		},
		scaledVolume() {
			if (this.isMyAvatar) {
				return 0;
			}
			if (this.avatar && this.myAvatar) {
				return (
					(this.volume / 100) *
					this.calcScale(
						this.avatar,
						this.myAvatar,
						this.radius,
						this.dropoffFactor
					)
				);
			}
			return 0;
		},
	},
	methods: {
		calcScale(userA, userB, radius, dropoffFactor) {
			// VIEW THE DESMOS PAGE HERE
			// https://www.desmos.com/calculator/iwz4q1tpqz
			// dropoffFactor must be greater than 0
			// smaller values mean volume drops off more slowly with distance
			// higher values mean that volume drops off more sharply
			// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

			// calculate distance
			// calculate x-intercept

			// if distance is between 0 and radius
			// return 1
			// if distance is between radius and x-intercept
			// return cos(b(x-r))
			// if distance is greater than x-intercept
			// return 0
			// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

			let distance = Math.sqrt(
				Math.pow(userA.left - userB.left, 2) +
					Math.pow(userA.top - userB.top, 2)
			);
			let period = (2 * Math.PI) / Math.abs(dropoffFactor);
			let x_intercept = radius + period / 4;
			let scale;
			if (distance <= radius) {
				scale = 1;
			} else if (radius < distance && distance < x_intercept) {
				scale = this.roundTo(
					Math.cos(dropoffFactor * (distance - radius)),
					2
				);
			} else {
				scale = 0;
			}

			return scale;
		},
		roundTo(num, decimals) {
			return (
				Math.round(num * Math.pow(10, decimals)) /
				Math.pow(10, decimals)
			);
		},
		setTalking(to) {
			this.talking = to;
			// console.log(this.talking)
		},
		getRandColor() {
			const colors = [
				{ r: 93, g: 111, b: 199 },
				{ r: 164, g: 93, b: 199 },
				{ r: 199, g: 93, b: 151 },
				{ r: 199, g: 93, b: 93 },
				{ r: 199, g: 153, b: 93 },
				{ r: 178, g: 199, b: 93 },
				{ r: 104, g: 199, b: 93 },
				{ r: 93, g: 199, b: 164 },
				{ r: 93, g: 180, b: 199 },
				{ r: 93, g: 129, b: 199 },
			];

			let colorIndex = Math.floor(Math.random() * colors.length);
			let randColor = colors[colorIndex];
			return randColor;
		},
		onMouseDown(e) {
			if (!this.isMyAvatar) return;
			e.preventDefault();
			document.onmouseup = () => this.onMouseUp();
			document.onmousemove = (e) => this.onMouseMove(e);
			this.dragOffsetX = e.clientX - this.screenPos.x;
			this.dragOffsetY = e.clientY - this.screenPos.y;
		},
		onMouseMove(e) {
			e.preventDefault();
			let p = {
				x: e.clientX - this.dragOffsetX,
				y: e.clientY - this.dragOffsetY,
			};
			p = this.mouseToCanvasPosition(p);

			// limit this to be called only after 50ms has passed since the last call
			this.updateAvatarThrottle(p);
		},
		updateAvatarThrottle: _.throttle((p) => {
			updateAvatar({
				left: p.x,
				top: p.y,
			});
		}, 10),
		onMouseUp() {
			document.onmouseup = null;
			document.onmousemove = null;
		},
		changeVolume(volume) {
			this.volume = volume;
		},
		setEnableVideo(value) {
			this.enableVideo = value;
		},
		// Copied from Whiteboard.vue
		mouseToCanvasPosition(point) {
			const svgWidth = 16;
			const svgHeight = 9;
			const svgAspectRatio = svgWidth / svgHeight;
			let xOrigin = 0;
			let yOrigin = 0;
			let scale;
			const containerWidth = window.innerWidth;
			const containerHeight = window.innerHeight;
			const containerAspectRatio = containerWidth / containerHeight;

			if (containerAspectRatio > svgAspectRatio) {
				const boxWidth = svgAspectRatio * containerHeight;
				xOrigin = (containerWidth - boxWidth) / 2;
				scale = containerHeight / svgHeight;
			} else {
				const boxHeight = containerWidth / svgAspectRatio;
				yOrigin = (containerHeight - boxHeight) / 2;
				scale = containerWidth / svgWidth;
			}

			return {
				x: (point.x - xOrigin) / scale,
				y: (point.y - yOrigin) / scale,
			};
		},
		canvasToScreenPosition(point) {
			const svgWidth = 16;
			const svgHeight = 9;
			const svgAspectRatio = svgWidth / svgHeight;
			let xOrigin = 0;
			let yOrigin = 0;
			let scale;
			const containerWidth = window.innerWidth;
			const containerHeight = window.innerHeight;
			const containerAspectRatio = containerWidth / containerHeight;

			if (containerAspectRatio > svgAspectRatio) {
				const boxWidth = svgAspectRatio * containerHeight;
				xOrigin = (containerWidth - boxWidth) / 2;
				scale = containerHeight / svgHeight;
			} else {
				const boxHeight = containerWidth / svgAspectRatio;
				yOrigin = (containerHeight - boxHeight) / 2;
				scale = containerWidth / svgWidth;
			}

			return {
				x: point.x * scale + xOrigin,
				y: point.y * scale + yOrigin,
			};
		},
	},
	updated() {
		if (this.isMyAvatar) {
			this.volume = 0; // prevents you from hearing yourself (might take a second to complete)
		}
	},
};
</script>

<style>
.talking {
	border: 0.3rem solid lime;
	border-color: lime !important;
}
</style>

<style scoped>
.v-avatar {
	z-index: 10;
}
.isMyAvatar {
	z-index: 20;
	cursor: move;
	cursor: grab;
}
.isMyAvatar:active {
	cursor: grabbing;
}
.avatar-card {
	z-index: 30;
}
</style>
