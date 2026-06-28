import * as THREE from "three";
import { createMuu } from "./character.js";
import { SCENE } from "./config.js";
import { createDiarySystem } from "./diary.js";
import { createFoodSystem } from "./food.js";
import { createI18n } from "./i18n.js";
import { createMemory } from "./memory.js";
import { MuuMovement } from "./movement.js";

const app = document.querySelector("#app");
const scene = new THREE.Scene();
scene.background = null;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
app.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
const cameraTarget = new THREE.Vector3();

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(9.5, 128),
  new THREE.MeshStandardMaterial({
    color: SCENE.colors.floor,
    roughness: 0.9,
    transparent: true,
    opacity: 0.42,
  }),
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const hemi = new THREE.HemisphereLight(0xfffbef, 0x9fb0a5, 2.3);
scene.add(hemi);

const key = new THREE.DirectionalLight(0xfff4dc, 2.8);
key.position.set(3.2, 5.2, 4.8);
key.castShadow = true;
key.shadow.mapSize.set(1024, 1024);
key.shadow.camera.near = 0.5;
key.shadow.camera.far = 14;
key.shadow.camera.left = -5;
key.shadow.camera.right = 5;
key.shadow.camera.top = 5;
key.shadow.camera.bottom = -5;
scene.add(key);

const muu = createMuu();
muu.position.set(0, 0, 0);
scene.add(muu);

const movement = new MuuMovement(muu);
const memory = createMemory();
const i18n = createI18n();
const food = createFoodSystem({ scene, muu, memory, i18n });
const diary = createDiarySystem({ memory, i18n });
const clock = new THREE.Clock();

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const mobile = width < 680;
  const setup = mobile ? SCENE.camera.mobile : SCENE.camera.desktop;

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.position.fromArray(setup.position);
  cameraTarget.fromArray(setup.target);
  camera.lookAt(cameraTarget);
  camera.updateProjectionMatrix();
}

function animate() {
  const delta = Math.min(clock.getDelta(), 0.033);
  movement.update(delta);
  food.update(delta);
  diary.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
window.addEventListener("pointerdown", () => movement.setState("curious"));

resize();
document.body.classList.add("is-ready");
animate();
