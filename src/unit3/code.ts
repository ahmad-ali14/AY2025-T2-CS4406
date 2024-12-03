import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";
import { createTextSprite } from "../utils/createTextSprite";

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
} = createBaseScene({
    sceneTitle: "Unit 2: Polygon with 5 vertices",
    cameraZ: 1000,
});

const torusKnotConfig = {
    radius: 25,
    tube: 3,
    tubularSegments: 135,
    radialSegments: 135,
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
    wireframe: false,
});

const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnot.position.x = 0;
torusKnot.position.y = 0;
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
    // https://stackoverflow.com/questions/13350875/three-js-width-of-view/13351534#13351534
    const vofRadians = THREE.MathUtils.degToRad(camera.fov);
    const frustumHeight = 2 * Math.tan(vofRadians) * camera.position.z;
    const frustumWidth = frustumHeight * camera.aspect;
    const mostRightX = frustumWidth / 2 - 0.8 * camera.position.z;
    const mostTopY = frustumHeight / 2 - 0.6 * camera.position.z;

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
