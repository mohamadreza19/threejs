import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5); // Adjust camera position to view model

// WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GLTF model loader
const loader = new GLTFLoader();
loader.load(
  "./cardboard_buddy.glb",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust the scale if needed
    model.position.set(0, 0, 0); // Position it at the origin
    console.log(gltf); // Inspect the loaded model in the console
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // For interactive controls
  renderer.render(scene, camera);
}

animate();
