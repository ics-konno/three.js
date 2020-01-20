<template>
  <div id="app">
    <div>
      <label for="size">Size</label>
      <input
          type="range"
          name="size"
          id="size"
          v-model.number="size"
          min="0.5"
          max="2"
          step="0.005"
      />
      <label for="speed">speed</label>
      <input
        type="range"
        name="speed"
        id="speed"
        v-model.number="speed"
        min="0.000"
        max="0.1"
        step="0.005"
      />
      <input type="radio" name="color" id="red" v-model="color" value="0xf54242"><label for="red">Red</label>
      <input type="radio" name="color" id="blue" v-model="color" value="0x4272f5"><label for="blue">Blue</label>
      <input type="radio" name="color" id="yellow" v-model="color" value="0xf5ef42"><label for="yellow">Yellow</label>
      {{color}}
    </div>
    <RotateBox :speed="speed" :color="color" :size="size"></RotateBox>
  </div>
</template>

<script>
import RotateBox from "./components/RotateBox.vue";

export default {
  name: "app",
  components: {
    RotateBox
  },
  data() {
    return {
      speed: 0.02,
      color: "0xf54242",
        size: 1
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
