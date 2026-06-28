import * as THREE from "three";
import { MUU } from "./config.js";

const stateNames = Object.keys(MUU.states);

export class MuuMovement {
  constructor(muu) {
    this.muu = muu;
    this.parts = muu.userData.parts;
    this.clock = 0;
    this.state = "idle";
    this.stateAge = 0;
    this.hopAge = 0;
    this.hopFrom = new THREE.Vector3();
    this.hopTo = new THREE.Vector3();
    this.nextHopAt = 2.2;
    this.direction = 1;
    this.isHopping = false;
  }

  setState(state) {
    if (!MUU.states[state]) return;
    this.state = state;
    this.stateAge = 0;
  }

  update(delta) {
    this.clock += delta;
    this.stateAge += delta;

    const state = MUU.states[this.state];
    if (this.stateAge > state.seconds) {
      const index = stateNames.indexOf(this.state);
      this.setState(stateNames[(index + 1) % stateNames.length]);
    }

    this.updateHop(delta, state.energy);
    this.updateBody(state.energy);
    this.updateTail(state.energy);
  }

  updateHop(delta, energy) {
    this.hopAge += delta;

    if (!this.isHopping && this.hopAge >= this.nextHopAt) {
      this.isHopping = true;
      this.hopAge = 0;
      this.hopFrom.copy(this.muu.position);
      this.direction *= Math.random() > 0.42 ? 1 : -1;
      const drift = MUU.hop.distance * energy * this.direction;
      const zDrift = (Math.random() - 0.5) * 0.18;
      this.hopTo.set(
        THREE.MathUtils.clamp(this.hopFrom.x + drift, -0.34, 0.34),
        0,
        THREE.MathUtils.clamp(this.hopFrom.z + zDrift, -0.16, 0.16),
      );
      this.nextHopAt = MUU.hop.interval + Math.random() * 1.2 - energy * 0.5;
    }

    if (!this.isHopping) return;

    const progress = THREE.MathUtils.clamp(this.hopAge / MUU.hop.duration, 0, 1);
    if (progress < 1) {
      const eased = 1 - Math.pow(1 - progress, 3);
      this.muu.position.lerpVectors(this.hopFrom, this.hopTo, eased);
      this.muu.position.y = Math.sin(progress * Math.PI) * MUU.hop.height * energy;
      this.parts.bodyRig.scale.y = 1 - Math.sin(progress * Math.PI) * 0.07;
      this.parts.bodyRig.scale.x = 1 + Math.sin(progress * Math.PI) * 0.035;
      this.parts.bodyRig.rotation.z = -this.direction * Math.sin(progress * Math.PI) * 0.06;
    } else {
      this.muu.position.y = 0;
      this.hopAge = 0;
      this.isHopping = false;
    }
  }

  updateBody(energy) {
    const breath = Math.sin(this.clock * (1.2 + energy)) * MUU.idleBreath;
    this.parts.bodyRig.position.y = breath;
    this.parts.ears.rotation.z = Math.sin(this.clock * 1.6) * 0.018;

    if (this.state === "sleep") {
      this.parts.bodyRig.scale.y = THREE.MathUtils.lerp(this.parts.bodyRig.scale.y, 0.86, 0.045);
      this.parts.bodyRig.rotation.x = THREE.MathUtils.lerp(this.parts.bodyRig.rotation.x, 0.08, 0.035);
    } else {
      this.parts.bodyRig.rotation.x = THREE.MathUtils.lerp(this.parts.bodyRig.rotation.x, 0, 0.05);
    }
  }

  updateTail(energy) {
    const tail = this.parts.tail;
    tail.rotation.y = Math.sin(this.clock * (2.2 + energy * 2.2)) * 0.16 * energy;
    tail.rotation.z = 0.08 + Math.sin(this.clock * 1.4) * 0.06;
    this.parts.shadow.scale.setScalar(1 - this.muu.position.y * 0.22);
    this.parts.shadow.material.opacity = 0.2 - this.muu.position.y * 0.08;
  }
}
