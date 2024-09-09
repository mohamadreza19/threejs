import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// تنظیم صحنه
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // اضافه کردن رندرر به DOM

const controls = new OrbitControls(camera, renderer.domElement); // فعال کردن کنترل‌های مداری

const MAX_POINTS = 500;

// geometry
const geometry = new THREE.BufferGeometry();

// attributes
const positions = new Float32Array(MAX_POINTS * 3); // 3 مختصات به ازای هر نقطه
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// draw range
const drawCount = MAX_POINTS; // رسم تمامی نقاط
geometry.setDrawRange(0, drawCount);

// material
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

// line
const line = new THREE.Line(geometry, material);
scene.add(line);

const positionAttribute = line.geometry.getAttribute("position");

let x = 0,
  y = 0,
  z = 0;

for (let i = 0; i < positionAttribute.count; i++) {
  positionAttribute.setXYZ(i, x, y, z);

  x += (Math.random() - 0.5) * 30;
  y += (Math.random() - 0.5) * 30;
  z += (Math.random() - 0.5) * 30;
}

positionAttribute.needsUpdate = true; // به‌روزرسانی attribute

// حلقه انیمیشن
function animate() {
  requestAnimationFrame(animate);

  controls.update(); // به‌روزرسانی کنترل‌ها
  renderer.render(scene, camera);
}

animate(); // اجرای انیمیشن
