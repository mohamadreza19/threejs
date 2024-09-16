import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

const solar = [
  {
    name: "Sun",
    textureUrl: "textures/solar/sun.jpg",
    color: 0xba8604,
    scale: 40,
    x: 0,
    rotationSpeed: 0.001,
    orbitSpeed: 0,

    children: [
      {
        name: "Earth",
        textureUrl: "textures/solar/earth.jpg",
        color: null,
        scale: 1,
        x: 15,
        rotationSpeed: 0.002,
        orbitSpeed: 0.005,
        children: [
          {
            name: "Moon",
            textureUrl: "textures/solar/moon.jpg",
            color: "gray",
            scale: 0.5,
            x: 5,
            rotationSpeed: 0.03,
            orbitSpeed: 0.015,
            children: [],
          },
        ],
      },
    ],
  },
];

// Inital
const pane = new Pane();
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 80, 300);
const aspect = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 4, 100);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sun
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

function solarloader() {
  const solarObject = solar.map((planet) =>
    plantLoader(planet, planet.children)
  );
  return solarObject;
}

function plantLoader(planet, children = []) {
  const texture = new THREE.TextureLoader().load(
    planet.textureUrl,
    undefined,
    (err) => {
      console.error("Texture loading error: ", err);
    }
  );

  const matrial = new THREE.MeshBasicMaterial({
    color: planet.color,
    map: texture,
    // wireframe: true,
  });

  const mesh = new THREE.Mesh(sphereGeometry, matrial);

  // Setup position and rotation
  mesh.name = planet.name;
  mesh.scale.setScalar(planet.scale);
  mesh.position.x = planet.x;
  mesh.rotationSpeed = planet.rotationSpeed;
  mesh.orbitSpeed = planet.orbitSpeed;

  children.forEach((child) => {
    const childMesh = plantLoader(child, child.children);
    // scene.add(childMesh);
    mesh.add(childMesh);
  });

  scene.add(mesh);
  return mesh;
}

// Light
// Create a spot light to simulate sunlight emitting from the Sun

const ambientLight = new THREE.AmbientLight(0x404040, 15); // Dark grey ambient light
scene.add(ambientLight);

// Animation for planets and moons
function animatePlanet(mesh, elapsedTime) {
  if (mesh && mesh.rotationSpeed) {
    // Rotate planet on its axis
    mesh.rotation.y += mesh.rotationSpeed;

    // Orbit around its parent
    // if (mesh.orbitSpeed) {
    //   mesh.position.x =
    //     Math.cos(elapsedTime * mesh.orbitSpeed) * mesh.position.x;
    //   mesh.position.z =
    //     Math.sin(elapsedTime * mesh.orbitSpeed) * mesh.position.x;
    // }

    // Animate child objects (e.g., moons)
    mesh.children.forEach((child) => {
      animatePlanet(child, elapsedTime);
    });
  }
}

const clock = new THREE.Clock();
const rootobject = solarloader();

// Render loop
const renderLoop = () => {
  const elapsedTime = clock.getElapsedTime();

  rootobject.forEach((mesh) => animatePlanet(mesh, elapsedTime));

  // Animation: rotating the group of objects
  // sun.rotation.y += 0.001;
  // earth.rotation.y += 0.01;
  // camera.lookAt(scene.getObjectByName("Earth").position);

  // Get the Earth mesh by its name

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
