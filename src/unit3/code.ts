import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";

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
    useDirectionalLight: false,
    usePointLight: true,
});

renderer.shadowMap.enabled = true;

scene.background = new THREE.Color("0xffffff");

const yellowHex = 0xffffaa;
// ambientLight.visible = false;
// directionalLight.visible = false;

viewpointLight.color = new THREE.Color(yellowHex);
// viewpointLight.position.set(canvas.width / 2, -canvas.height / 2, 0);
// viewpointLight.visible = true;
// viewpointLight.intensity = 5;
viewpointLight.castShadow = true;

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
torusKnot.receiveShadow = true;
scene.add(torusKnot);

let xDirection = 1;
let yDirection = 1;
let zDirection = 1;
let xSpeed = 2;
let ySpeed = 2;
let zSpeed = 0;

let rotationSpeed = 0.01;
let rotationDirection = 1;

const generateRandomColor = () => {
    return Math.floor(Math.random() * 16777215);
};


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
