import * as THREE from "three";
const canvas = document.getElementById("glcanvas");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Canvas not found");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const canvasAspect = canvas.width / canvas.height;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, canvasAspect, 0.1, 1000);
camera.position.z = 200;

scene.add(new THREE.DirectionalLight(0xffffff, 0.5)); // dim light shining from above
var viewpointLight = new THREE.DirectionalLight(0xffffff, 1); // a light to shine in the direction the camera faces
viewpointLight.position.set(0, 0, 1); // shines down the z-axis
scene.add(viewpointLight);

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0.0, 5.0, 0.0, // Top
    4.8, 1.5, 0.0, // Top-right
    3.0, -4.0, 0.0, // Bottom-right
    -3.0, -4.0, 0.0, // Bottom-left
    -4.8, 1.5, 0.0, // Top-left
  ]);
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

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

