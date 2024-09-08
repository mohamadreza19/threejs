import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial({ color: "red" });

// const points = [];
// points.push(new THREE.Vector3(-10, 0, 0));
// points.push(new THREE.Vector3(0, 7, 0));
// // points.push(new THREE.Vector3(10, 0, 0));

// const geometry = new THREE.BufferGeometry().setFromPoints(points);
const geometry = new THREE.BufferGeometry();

const line = new THREE.Line(geometry, material);

scene.add(line);
let line1 = 0; // مقدار اولیه برای خط اول
let line2 = 0; // مقدار اولیه برای خط دوم
let line3 = 0; // مقدار اولیه برای خط دوم
let speed1 = 0.05; // سرعت تغییر مقدار line1
let speed2 = 0.03; // سرعت تغییر مقدار line2

function animate() {
  // تغییر مقدار line1 و line2 به آرامی با سرعت مشخص
  line1 += speed1;
  line2 += speed2;

  // اطمینان از اینکه مقدارها در محدوده‌ی مشخص باقی بمانند
  if (line1 > 10 || line1 < -10) {
    speed1 = -speed1; // اگر خط به انتهای محدوده رسید، جهت حرکت را معکوس کن
  }
  if (line2 > 10 || line2 < -10) {
    speed2 = -speed2; // اگر خط به انتهای محدوده رسید، جهت حرکت را معکوس کن
  }

  const points = [];
  points.push(new THREE.Vector3(line1, 0, 0)); // نقطه اول
  points.push(new THREE.Vector3(0, line2, 0)); // نقطه دوم
  points.push(new THREE.Vector3(0, line2, line3)); // نقطه دوم

  geometry.setFromPoints(points); // به‌روزرسانی هندسه با نقاط جدید

  renderer.render(scene, camera); // رندر کردن صحنه
}

renderer.setAnimationLoop(animate); // شروع حلقه انیمیشن

renderer.setAnimationLoop(animate);
// renderer.render(scene, camera);
