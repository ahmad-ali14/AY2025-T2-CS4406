import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";

const yellowHex = "#ffffaa";

const {
    scene,
    render,
    addHelpNote,
    shouldShowWireframe,
    shouldShowLabels,
    sidebar,
    canvas,
    renderer,
    camera,
    ambientLight,
    viewpointLight,
    directionalLight,
} = createBaseScene({
    sceneTitle: "Unit 2: Polygon with 5 vertices",
    cameraZ: 1000,
    showAxes: false,
    showGrid: false,
    showLabels: false,
    showWireframe: false,
    useOrbitControls: false,
    useAmbientLight: false,
    useDirectionalLight: true,
    usePointLight: false,
    defaultLightColor: yellowHex,
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.color = new THREE.Color(yellowHex);
directionalLight.position.set(0, 0, 1);
directionalLight.visible = true;
directionalLight.intensity = 2;
directionalLight.castShadow = true;

const torusKnotConfig = {
    radius: 25,
    tube: 5,
    tubularSegments: 300,
    radialSegments: 300,
    p: 2,
    q: 3,
};

const torusKnotGeometry = new THREE.TorusKnotGeometry(
    torusKnotConfig.radius,
    torusKnotConfig.tube,
    torusKnotConfig.tubularSegments,
    torusKnotConfig.radialSegments,
    torusKnotConfig.p,
    torusKnotConfig.q,
);

const torusKnotMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: shouldShowWireframe(),
});

const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnot.position.x = 0;
torusKnot.position.y = 0;
torusKnot.castShadow = true;
torusKnot.receiveShadow = false;
scene.add(torusKnot);

let xDirection = 1;
let yDirection = 1;
let zDirection = 1;
let xSpeed = 5;
let ySpeed = 5;
let zSpeed = 0;

let rotationSpeed = 0.01;
let rotationDirection = 1;

const generateRandomColor = () => {
    return Math.floor(Math.random() * 16777215);
};

const planeGeometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight,
    32,
    32,
);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);

const animate = () => {
    const mostRightX =
        (window.innerWidth * 0.8) / 2 -
        (torusKnotConfig.radius + torusKnotConfig.tube);
    const mostTopY =
        window.innerHeight / 2 -
        (torusKnotConfig.radius + torusKnotConfig.tube);

    const torusKnotEdgeX = torusKnot.position.x;
    const torusKnotEdgeY = torusKnot.position.y;

    if (torusKnotEdgeX >= mostRightX) {
        xDirection = -1;
        torusKnotMaterial.color.setHex(generateRandomColor());
    }

    if (torusKnotEdgeX <= -mostRightX) {
        xDirection = 1;
        torusKnotMaterial.color.setHex(generateRandomColor());
    }

    if (torusKnotEdgeY >= mostTopY) {
        yDirection = -1;
        torusKnotMaterial.color.setHex(generateRandomColor());
    }

    if (torusKnotEdgeY <= -mostTopY) {
        yDirection = 1;
        torusKnotMaterial.color.setHex(generateRandomColor());
    }

    torusKnot.rotation.x += rotationSpeed * rotationDirection;
    torusKnot.rotation.y += rotationSpeed * rotationDirection;
    torusKnot.rotation.z += rotationSpeed * rotationDirection;

    torusKnot.position.x += xSpeed * xDirection;
    torusKnot.position.y += ySpeed * yDirection;
    torusKnot.position.z += zSpeed * zDirection;

    render();
    requestAnimationFrame(animate);
};

animate();
