<template>
	<v-btn
		:color="drawingOn ? '#00FF00' : '#FFFFFF'"
		x-large
		icon
		@click="toggleDraw"
	>
		<v-icon>mdi-pencil</v-icon>
	</v-btn>
</template>

<script>
export default {
    data() {
        return {
            drawingOn: true,
        }
    },
    methods: {
        toggleDraw() {
            this.drawingOn = !this.drawingOn;
            this.$emit('toggleDraw', this.drawingOn);
        }
    }
};
</script>

<style scoped>
</style>