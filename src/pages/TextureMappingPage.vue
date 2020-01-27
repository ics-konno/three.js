<template>
  <div id="TextureMappingPage">
    <TextureMapping></TextureMapping>
  </div>
</template>

<script>

import TextureMapping from "../components/TextureMapping";

export default {
  name: "TextureMappingPage",
  components: {
      TextureMapping,
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
