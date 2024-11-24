import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";

const { scene, render } = createBaseScene();

const geometry = new THREE.BufferGeometry();
// prettier-ignore
const vertices = new Float32Array([
    0.0, 5.0, 0.0, // Top
    4.8, 1.5, 0.0, // Top-right
    3.0, -4.0, 0.0, // Bottom-right
    -3.0, -4.0, 0.0, // Bottom-left
    -4.8, 1.5, 0.0, // Top-left
  ]);

// prettier-ignore
const indices = [
    0, 1, 2, // Triangle 1
    0, 2, 3, // Triangle 2
    0, 3, 4, // Triangle 3
  ]; // Define the faces of the pentagon
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geometry.setIndex(indices);
geometry.computeVertexNormals();

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const pentagon = new THREE.Mesh(geometry, material);
scene.add(pentagon);

render();
