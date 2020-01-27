<template>
    <canvas id="canvas" width="1200" height="600"></canvas>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "TextureMapping",
  props: {
    params: {
      required: false,
      default: () => ({
        envMap: "EXR",
        roughness: 0.0,
        metalness: 0.0,
        exposure: 1.0,
        debug: false
      }),
      type: Object
    }
  },
  data() {
    const scene = new THREE.Scene();
    let renderer = null;
    const camera = new THREE.PerspectiveCamera(
      40,
      1200 / 600,
      1,
      5000
    );
    const ambient = new THREE.AmbientLight(0xffffff);
    const pointLight = new THREE.PointLight(0xffffff, 2)

    // テクスチャー
    let reflectionCube;
    let pngBackground;
    return {
      scene,
      renderer,
      camera,
      reflectionCube,
      pngBackground,
      ambient,
      pointLight
    };
  },
  mounted() {
    const $canvas = document.getElementById("canvas");
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: $canvas
    });
    this.renderer.setSize(1200, 600)
    this.renderer.setClearColor(0xefefef)

    this.camera.position.set(0, 0, 20);

    this.scene.add(this.ambient)
    this.scene.add(this.pointLight)
    // const directionalLight = new THREE.DirectionalLight(0xffffff)
    // directionalLight.position.set(1,1,1)
    // this.scene.add(directionalLight)

    // テクスチャーをロード
    const path = "./skyboxsun25deg/";
    // const path = "./static/skyboxsun25deg/";
    let urls = [
      require(path + "px.jpg"),
      require(path + "nx.jpg"),
      require(path + "py.jpg"),
      require(path + "ny.jpg"),
      require(path + "pz.jpg"),
      require(path + "nz.jpg")
    ];
    this.reflectionCube = new THREE.CubeTextureLoader().load(urls);
    this.reflectionCube.mapping = THREE.CubeReflectionMapping;
    this.reflectionCube.format = THREE.RGBFormat

    // 背景にテクスチャを設置
    this.scene.background = this.reflectionCube;

    // 球に環境マッピングを適用
    // 球
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshPhongMaterial({ envMap: this.reflectionCube });
    // const imgPath = require("./earth.jpg")
    // const material = new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load(imgPath)});
    const sphereMesh = new THREE.Mesh(geometry, material);
    this.scene.add(sphereMesh);

    // オービットコントロール
    // eslint-disable-next-line no-unused-vars
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.animate();
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);

      // this.render();
      this.renderer.render(this.scene, this.camera);
    }
    // render() {
    //
    //   // this.scene.background = this.pngBackground;
    //   this.renderer.render(this.scene, this.camera);
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
