<template>
  <div>
    <canvas id="canvas" width="1200" height="600"></canvas>
  </div>
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
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    const light = new THREE.DirectionalLight(0xffffff);

    // テクスチャー
    let pngCubeRenderTarget;
    let pngBackground;
    return {
      scene,
      renderer,
      camera,
      light,
      pngCubeRenderTarget,
      pngBackground
    };
  },
  mounted() {
    const $canvas = document.getElementById("canvas");
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: $canvas
    });
    this.camera.position.set(0, 0, 10);
    this.light.position.set(0, 0, 100);
    this.scene.add(this.light)
    this.scene.add(new THREE.AmbientLight(0x111111));

      const light2 = new THREE.DirectionalLight(0xffffff, 2)
      light2.position.set(1,1,1).normalize()
      this.scene.add(light2)

    // テクスチャーをロード
    const path = "../assets/texture/skyboxsun25deg/";
    let urls = [
      path + "px.jpg",
      path + "nx.jpg",
      path + "py.jpg",
      path + "ny.jpg",
      path + "pz.jpg",
      path + "nz.jpg"
    ];
    const cubeTexture = new THREE.CubeTextureLoader().load(urls);
    cubeTexture.mapping = THREE.CubeReflectionMapping;
    cubeTexture.format = THREE.RGBFormat

    // 背景にテクスチャを設置
    this.scene.background = cubeTexture;

    // 球に環境マッピングを適用
    // 球
    const geometry = new THREE.SphereBufferGeometry(5, 64, 64);
    // const material = new THREE.MeshBasicMaterial({ envMap: cubeTexture });
    const material = new THREE.MeshBasicMaterial();
    const sphereMesh = new THREE.Mesh(geometry, material);
    this.scene.add(sphereMesh);

      var loader = new THREE.TextureLoader();

      loader.load("nx.jpg", function(texture){
          createBox(texture); // mesh作成
          // render();
      });


      function createBox(texture){
          const box = new THREE.Mesh(
              new THREE.BoxGeometry(100, 100, 100),
              new THREE.MeshLambertMaterial({map: texture})  // {map: texture}がキモ
          );
          box.position.set(0, 0, 0);

          // シーンに追加
          this.scene.add(box);
      }

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
