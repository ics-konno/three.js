<template>
  <div id="app">
    <div id="nav">
      <router-link to="/box">回転箱</router-link>
      <router-link to="/texture-map">環境マッピング</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
// import BoxPage from "./pages/BoxPage.vue";

export default {
  name: "app",
  components: {
    // BoxPage
  },
  data() {
    return {
      currentPageNum: 1
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
