import Vue from 'vue';

const whiteboardState = Vue.observable({
    drawing: true,
    erasing: false,
});

export default whiteboardState;