import * as THREE from "three";
import { SCENE } from "./config.js";

const mat = (color, roughness = 0.82) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 });

function createDomeBody() {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1.18, 0),
    new THREE.Vector2(1.18, 0.18),
    new THREE.Vector2(1.08, 0.55),
    new THREE.Vector2(0.86, 0.98),
    new THREE.Vector2(0.55, 1.35),
    new THREE.Vector2(0.2, 1.55),
    new THREE.Vector2(0, 1.6),
  ];
  const geometry = new THREE.LatheGeometry(points, 72);
  geometry.computeVertexNormals();
  geometry.rotateY(Math.PI);

  const body = new THREE.Mesh(geometry, mat(SCENE.colors.body));
  body.castShadow = true;
  body.receiveShadow = true;
  body.scale.set(1.05, 1, 0.92);
  body.position.y = 0.02;
  return body;
}

function createEarBridge() {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.78, 1.34, -0.08),
    new THREE.Vector3(-0.66, 1.62, -0.08),
    new THREE.Vector3(-0.42, 1.78, -0.08),
    new THREE.Vector3(-0.13, 1.64, -0.08),
    new THREE.Vector3(0, 1.54, -0.08),
    new THREE.Vector3(0.13, 1.64, -0.08),
    new THREE.Vector3(0.42, 1.78, -0.08),
    new THREE.Vector3(0.66, 1.62, -0.08),
    new THREE.Vector3(0.78, 1.34, -0.08),
  ]);
  const ear = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 64, 0.088, 18, false),
    mat(SCENE.colors.ear),
  );
  ear.name = "earBridge";
  ear.castShadow = true;
  return ear;
}

function createInnerEarLine() {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.48, 1.36, -0.015),
    new THREE.Vector3(-0.34, 1.54, -0.02),
    new THREE.Vector3(-0.14, 1.45, -0.02),
    new THREE.Vector3(0, 1.39, -0.02),
    new THREE.Vector3(0.14, 1.45, -0.02),
    new THREE.Vector3(0.34, 1.54, -0.02),
    new THREE.Vector3(0.48, 1.36, -0.015),
  ]);
  const geometry = new THREE.TubeGeometry(curve, 42, 0.026, 12, false);
  const inner = new THREE.Mesh(geometry, mat(SCENE.colors.innerEar, 0.9));
  inner.castShadow = true;
  return inner;
}

function createEarRoots() {
  const roots = new THREE.Group();
  const material = mat(SCENE.colors.body, 0.86);
  [-0.58, 0.58].forEach((x) => {
    const root = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 16), material);
    root.position.set(x, 1.29, -0.08);
    root.scale.set(1.28, 0.62, 0.74);
    root.castShadow = true;
    roots.add(root);
  });
  return roots;
}

function createFace() {
  const face = new THREE.Group();
  const eyeMaterial = mat(SCENE.colors.eye, 0.7);
  const eyeGeometry = new THREE.SphereGeometry(0.038, 18, 14);

  [-0.21, 0.21].forEach((x) => {
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(x, 0.83, 0.91);
    eye.scale.set(1, 1.08, 0.42);
    face.add(eye);
  });

  const nose = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 16, 12),
    mat(SCENE.colors.nose, 0.74),
  );
  nose.position.set(0, 0.72, 0.95);
  nose.scale.set(1.12, 0.82, 0.42);
  face.add(nose);

  return face;
}

function createTail() {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.98, 0.43, -0.08),
    new THREE.Vector3(1.18, 0.5, -0.06),
    new THREE.Vector3(1.31, 0.58, -0.08),
    new THREE.Vector3(1.27, 0.66, -0.12),
  ]);
  const tail = new THREE.Group();
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 28, 0.068, 16, false),
    mat(SCENE.colors.tail),
  );
  const tip = new THREE.Mesh(
    new THREE.SphereGeometry(0.062, 18, 14),
    mat(SCENE.colors.tail),
  );
  tip.position.copy(curve.getPoint(1));
  tip.scale.set(1.05, 0.88, 0.95);
  tail.add(tube, tip);
  tail.name = "tail";
  tail.castShadow = true;
  return tail;
}

function createGroundShadow() {
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.08, 48),
    new THREE.MeshBasicMaterial({
      color: SCENE.colors.shadow,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.006;
  shadow.name = "softShadow";
  return shadow;
}

export function createMuu() {
  const root = new THREE.Group();
  const bodyRig = new THREE.Group();
  const body = createDomeBody();
  const ears = new THREE.Group();

  ears.add(createEarRoots());
  ears.add(createEarBridge());
  ears.add(createInnerEarLine());

  bodyRig.add(body, ears, createFace(), createTail());
  root.add(createGroundShadow(), bodyRig);

  root.userData.parts = {
    bodyRig,
    body,
    ears,
    tail: bodyRig.getObjectByName("tail"),
    shadow: root.getObjectByName("softShadow"),
  };

  return root;
}
