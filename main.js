import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// Inital
const pane = new Pane();
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

const aspect = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 4, 100);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true; // فعال کردن سایه‌ها
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // نوع سایه
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup geometries
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const torusknotGeometry = new THREE.TorusKnotGeometry(0.5, 0.1, 100, 100);
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const cylinerGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const planeGeometry = new THREE.PlaneGeometry(100, 100);

// Material
const material = new THREE.MeshStandardMaterial({
  metalness: 0.8,
  roughness: 0.5,
});

const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x808080,
  roughness: 0.8,
});

// Meshes
const cubeMesh = new THREE.Mesh(cubeGeometry, material);
cubeMesh.position.set(-2, 1, 0);
cubeMesh.castShadow = true; // فعال کردن سایه برای مکعب

const torusknotMesh = new THREE.Mesh(torusknotGeometry, material);
torusknotMesh.position.set(2, 2, 0);
torusknotMesh.castShadow = true;

const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.set(0, 1, -2);
sphereMesh.castShadow = true;

const cylinerMesh = new THREE.Mesh(cylinerGeometry, material);
cylinerMesh.position.set(0, 1, 2);
cylinerMesh.castShadow = true;

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.y = 0;
planeMesh.receiveShadow = true; // فعال کردن دریافت سایه برای سطح

// Grouping and adding to scene
const group = new THREE.Group();
group.add(cubeMesh, torusknotMesh, sphereMesh, cylinerMesh);
scene.add(group);
scene.add(planeMesh);

// Initial lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // نور محیطی
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6); // نور آسمان/زمین
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true; // فعال کردن سایه برای نور
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xff0000, 0.7);
pointLight.position.set(-3, 2, 3);
pointLight.castShadow = true; // فعال کردن سایه برای نور نقطه‌ای
scene.add(pointLight);

const spotLight = new THREE.SpotLight(0x32a881, 1);
spotLight.position.set(8, 6, 0);
spotLight.target.position.set(0, 0, 0);
spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);
// scene.add(spotLight.target);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Clock for animation
const clock = new THREE.Clock();

// Render loop
const renderLoop = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animation: rotating the group of objects
  group.rotation.y = elapsedTime * 0.2;

  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(renderLoop);
};

// Handling window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderLoop();
