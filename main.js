import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { mx_bilerp_1 } from "three/src/nodes/materialx/lib/mx_noise.js";
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
//
// camera.position.y = 5;
camera.position.x = 0;
camera.position.z = 3;
// camera.position.set(59, -77, 23);

const renderer = new THREE.WebGLRenderer({
  // canvas: true,
  antialias: true,
});

document.body.appendChild(renderer.domElement);

//Moving

//Setup
const cubegeometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
const circleGeometry = new THREE.CircleGeometry(1, 52);
const torusknotGeometry = new THREE.TorusKnotGeometry(0.5, 0.1, 100, 100);
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const cylinerGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const planeGeometry = new THREE.PlaneGeometry(1, 1);

// Inital Material

const lavarockAlbedo = textureLoader.load(
  "texture/columned-lava-rock-bl/columned-lava-rock_albedo.png"
);
const lavarockAo = textureLoader.load(
  "texture/columned-lava-rock-bl/columned-lava-rock_ao.png"
);
const lavarockHeight = textureLoader.load(
  "texture/columned-lava-rock-bl/columned-lava-rock_height.png"
);
const lavarockMetallic = textureLoader.load(
  "texture/columned-lava-rock-bl/columned-lava-rock_metallic.png"
);
const lavarockNormal = textureLoader.load(
  "texture/columned-lava-rock-bl/columned-lava-rock_normal-ogl.png"
);
const lavarockRoughness = textureLoader.load(
  "texture/columned-lava-rock-bl/columned-lava-rock_roughness.png"
);

const material = new THREE.MeshStandardMaterial();
lavarockAlbedo.repeat.set(6, 6);
material.map = lavarockAlbedo;
material.aoMap = lavarockAo;
material.roughnessMap = lavarockRoughness;
material.metalnessMap = lavarockMetallic;
material.normalMap = lavarockNormal;
material.displacementMap = lavarockHeight;

material.roughness = 1;
material.metalness = 1;
material.displacementScale = 0.1;

// lavarockAlbedo.wrapS = THREE.MirroredRepeatWrapping;
// lavarockAlbedo.wrapT = THREE.MirroredRepeatWrapping;

lavarockAlbedo.wrapS = THREE.RepeatWrapping;
lavarockAlbedo.wrapT = THREE.RepeatWrapping;

pane.addBinding(lavarockAlbedo, "offset", {
  x: {
    min: 0,
    max: 1,
    step: 0.001,
  },
  y: {
    min: 0,
    max: 1,
    step: 0.001,
  },
});
// Inital Mesh

const cubeMesh = new THREE.Mesh(cubegeometry, material);
const circleMesh = new THREE.Mesh(circleGeometry, material);
const torusknotMesh = new THREE.Mesh(torusknotGeometry, material);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
const cylinerMesh = new THREE.Mesh(cylinerGeometry, material);
const planeMesh = new THREE.Mesh(planeGeometry, material);

// Position Object

cubeMesh.position.x = -2;
torusknotMesh.position.y = 2;
sphereMesh.position.x = 2;
cylinerMesh.position.y = -2;

// planeMesh.rotation.x = THREE.MathUtils.degToRad(-90);
// planeMesh.scale.set(100, 100, 100);

// Orbit Controls

// Add Scene

circleMesh.position.x = -1.5;
torusknotMesh.position.x = 2;

// //Grouping
const group = new THREE.Group();
group.add(cubeMesh, torusknotMesh, sphereMesh, cylinerMesh, planeMesh);
// scene.add(planeMesh);
scene.add(group);
// const group = new THREE.Group();

// group.add(cube);
// group.add(cube2);
// group.add(cube3);

// Inial light
// حذف نورهای قبلی و تنظیم نورهای جدید

// نور محیطی
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // قدرت نور محیطی را کاهش دادم
scene.add(ambientLight);

// نور نقطه‌ای
const pointLight = new THREE.PointLight(0xffffff, 1, 100); // نور نقطه‌ای با دامنه بیشتر
pointLight.position.set(10, 10, 10); // موقعیت نور نقطه‌ای را تنظیم کردم
// scene.add(pointLight);

// اضافه کردن یک نور نقطه‌ای دیگر
const pointLight2 = new THREE.PointLight(0xffaa00, 0.7, 50); // نور نقطه‌ای با رنگ متفاوت و شدت کمتر
pointLight2.position.set(-10, 5, 10); // تنظیم موقعیت
// scene.add(pointLight2);

// نور جهت‌دار برای ایجاد سایه‌ها
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // شدت نور 0.5
directionalLight.position.set(5, 10, 7); // موقعیت نور جهت‌دار را تنظیم کردم
// scene.add(directionalLight);

// فعال کردن سایه‌ها
directionalLight.castShadow = true; // فعال کردن سایه‌ها
renderer.shadowMap.enabled = true; // فعال کردن سایه‌زنی در رندرر
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // نوع سایه‌زنی نرم

// scene.add(circleMesh);

// Pane
// pane.addBinding(material, "metalness", { min: 0, max: 1, step: 0.01 });
// pane.addBinding(material, "roughness", { min: 0, max: 1, step: 0.01 });
// pane.addBinding(material, "reflectivity", { min: 0, max: 1, step: 0.01 });

// Add AxesHelper
// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);
// cube.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

// Inital clock

const clock = new THREE.Clock();
let previusTime = 0;

const renderLoop = () => {
  // controls.enableDamping = true;
  // controls.autoRotate = true;

  const currentTime = clock.getElapsedTime();

  // group.position.x += Math.sin(currentTime) * 0.01;

  // console.log(currentTime);

  // cube.scale.x = Math.sin(currentTime) * 100;

  // group.scale.set(xMove, xMove, xMove);

  // camera.position.z = -(xMove + 0.1);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  controls.update();
  window.requestAnimationFrame(renderLoop);
};

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderLoop();
