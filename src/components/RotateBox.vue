<template>
  <canvas id="canvas" width="600" height="400"></canvas>
</template>

<script>
import * as THREE from "three";
export default {
  name: "RotateBox",
  props: {
    speed: {
      required: false,
      default: 0.02,
      type: Number
    },
    color: {
      required: false,
      default: "0xffffff",
      type: String
    },
    size: {
      required: false,
      default: 1,
      type: Number
    }
  },
  data() {
    const scene = new THREE.Scene();
    let renderer = null;
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    const light = new THREE.DirectionalLight(0xffffff);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({
      color: parseInt(this.color, 16)
    });
    const cube = new THREE.Mesh(geometry, material);
    return { scene, renderer, camera, light, geometry, material, cube };
  },
  mounted() {
    const $canvas = document.getElementById("canvas");
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: $canvas
    });
    this.camera.position.set(0, 0, 2);
    this.light.position.set(0, 0, 100);
    this.scene.add(this.cube);
    this.scene.add(this.light);

    this.animate();
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      this.cube.rotation.x += this.speed;
      this.cube.rotation.z += this.speed;
      // this.cube.scale.x = 10;
      this.cube.scale.set(this.size,this.size,this.size)
      this.cube.material.emissive.setHex(this.color);
      this.renderer.render(this.scene, this.camera);
    }
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
