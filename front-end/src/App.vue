<template>
	<v-app id="app">
		<router-view />
	</v-app>
</template>

<style lang="scss">
// html {
//   background: linear-gradient(45deg, #172a74, #21a9af);
//   background-color: #184e8e;
//   font-family: "Source Sans Pro", sans-serif;
//   height: 100%;
//   margin: 0;
//   padding: 0;
//   background-attachment: fixed;
// }

#app {
	// background-color: #29BEDF;
	// height: 100%;
	// margin: 0;
	// padding: 0;
	// background-attachment: fixed;
	// font-family: Avenir, Helvetica, Arial, sans-serif;
	// -webkit-font-smoothing: antialiased;
	// -moz-osx-font-smoothing: grayscale;
	// text-align: center;
	// z-index: 0; // might mess things up
}

.scrollbar-hidden::-webkit-scrollbar {
	display: none;
}
</style>
