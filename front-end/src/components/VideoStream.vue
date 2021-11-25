<template>
	<div>
		<video ref="video" :muted="muted" :volume="volume" />
	</div>
</template>

<script>
export default {
	name: "VideoStream",
	props: {
		stream: MediaStream,
		muted: Boolean,
		volume: Number,
	},
	data() {
		return {
			isMounted: false,
		};
	},
	methods: {
		updateMeter() {
			const array = new Uint8Array(this.analyser.fftSize);
			this.analyser.getByteTimeDomainData(array);
			let max = 0;
			for (let a of array) {
				a = Math.abs(a - 128);
				max = Math.max(max, a);
			}

			this.$emit("talking", max > 4);

			if (this.isMounted)
				window.requestAnimationFrame(() => this.updateMeter());
		},
		updateVolume() {
			const vid = this.$refs.video;
			vid.volume = this.volume;
		},
	},
	watch: {
		volume: function () {
			this.updateVolume();
		},
	},
	mounted() {
		this.isMounted = true;

		const vid = this.$refs.video;
		vid.srcObject = this.stream;
		vid.addEventListener("loadedmetadata", () => {
			vid.play();
		});

		const ctx = new AudioContext();
		const src = ctx.createMediaStreamSource(this.stream);
		window.src = src;
		const analyser = ctx.createAnalyser();
		src.connect(analyser);

		this.analyser = analyser;
		this.updateMeter();
	},
	beforeUnmount() {
		this.isMounted = false;
	},
};
</script>
<style>
video {
	height: 100%;
	transform: rotateY(180deg);
}
</style>
