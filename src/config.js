export const SCENE = {
  camera: {
    desktop: { position: [0, 2.55, 12.8], target: [1.35, -0.48, 0] },
    mobile: { position: [0, 2.9, 22.5], target: [1.55, -0.62, 0] },
  },
  colors: {
    body: 0xf3dfc7,
    bodyShadow: 0xd8bfa7,
    ear: 0xf2dcc2,
    innerEar: 0xd8b18e,
    tail: 0xe9cdae,
    eye: 0x3d352f,
    nose: 0x5f5148,
    floor: 0xf4f0e5,
    shadow: 0xb7aa96,
  },
};

export const MUU = {
  scale: 1,
  idleBreath: 0.035,
  hop: {
    interval: 3.1,
    duration: 0.78,
    height: 0.34,
    distance: 0.22,
  },
  states: {
    idle: { seconds: 7, energy: 0.55 },
    curious: { seconds: 4, energy: 0.82 },
    sleep: { seconds: 6, energy: 0.22 },
  },
};
