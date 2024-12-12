import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";

const { render, scene } = createBaseScene({
    sceneTitle: "Unit 4: Textured Cube",
    cameraZ: window.innerHeight,
    defaultLightColor: "#ffffff",
    showAxes: false,
    showGrid: false,
});

const w = window.innerHeight / 2;
const cubeGeometry = new THREE.BoxGeometry(w, w, w);

// put an image on each face of the cube
const cubeMaterials = [
    // right side
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./images/1.jpg"),
    }),
    // left side
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./images/2.jpg"),
    }),
    // top side
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    // bottom side
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    // front side
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./images/3.jpeg"),
    }),
    // back side
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./images/4.jpg"),
    }),
];

const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
scene.add(cube);

let ySpeed = 0.01;
let yDirection = 1;

const animate = () => {
    requestAnimationFrame(animate); // prepare for the next frame

    cube.rotation.y += ySpeed * yDirection; // rotate the cube on the y-axis

    render(); // re-render the scene
};

animate();
