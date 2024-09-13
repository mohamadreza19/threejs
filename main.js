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
const material = new THREE.MeshStandardMaterial({
  metalness: 0.8,
  roughness: 0.5,
  wireframe: true,
  // map: lavarockAlbedo,
  // displacementMap: lavarockDisplacement,
  // displacementScale: 0.1,
});
const material2 = new THREE.MeshStandardMaterial({
  metalness: 0.8,
  roughness: 0.5,
  // wireframe: true,
  // map: lavarockAlbedo,
  // displacementMap: lavarockDisplacement,
  // displacementScale: 0.1,
});

// lavarockAlbedo.wrapS = THREE.MirroredRepeatWrapping;
// lavarockAlbedo.wrapT = THREE.MirroredRepeatWrapping;

// Inital Mesh

const cubeMesh = new THREE.Mesh(cubegeometry, material);
const circleMesh = new THREE.Mesh(circleGeometry, material);
const torusknotMesh = new THREE.Mesh(torusknotGeometry, material);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
const cylinerMesh = new THREE.Mesh(cylinerGeometry, material);
const planeMesh = new THREE.Mesh(planeGeometry, material2);

// Position Object

cubeMesh.position.x = -2;
torusknotMesh.position.y = 2;
sphereMesh.position.x = 2;
cylinerMesh.position.y = -2;

planeMesh.rotation.x = THREE.MathUtils.degToRad(-90);
planeMesh.scale.set(100, 100, 100);
planeMesh.position.y = -4;
// Orbit Controls

// Add Scene

circleMesh.position.x = -1.5;
torusknotMesh.position.x = 2;

// //Grouping
const group = new THREE.Group();
group.add(cubeMesh, torusknotMesh, sphereMesh, cylinerMesh);
scene.add(planeMesh);
scene.add(group);
// const group = new THREE.Group();

// group.add(cube);
// group.add(cube2);
// group.add(cube3);

// Inial light

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // قدرت نور محیطی را کاهش دادم
// scene.add(ambientLight);

// const hemisphereLight = new THREE.HemisphereLight(0xf57fb6, "black", 0.8);
// scene.add(hemisphereLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper);

// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// scene.add(pointLight);

// const pointLightLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightLightHelper);

const spotLight = new THREE.SpotLight(0xffffff, 0.5);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLight, spotLightHelper);
spotLightHelper.position.y = 10;

// directionalLight.position.copy(cubeMesh.position);

// Pane

//color
pane.addBinding(spotLight, "color", {
  color: {
    type: "float",
  },
});
pane.addBinding(spotLight.position, "x", {
  x: {
    min: -10,
    max: 10,
    step: 0.01,
  },
});
pane.addBinding(spotLight.position, "y", {
  y: {
    min: -10,
    max: 10,
    step: 0.01,
  },
});
pane.addBinding(spotLight.position, "z", {
  z: {
    min: -10,
    max: 10,
    step: 0.01,
  },
});

// intensity
pane.addBinding(spotLight, "intensity", {
  intensity: {
    min: 0,
    max: 1,
    step: 0.01,
  },
});

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
  // directionalLight.position.x = Math.sin(currentTime) * 100;
  // directionalLight.position.y = Math.sin(currentTime) * 0.01;

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
