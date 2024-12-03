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
} = createBaseScene({
    sceneTitle: "Unit 2: Polygon with 5 vertices",
    cameraZ: 500,
});

const torusKnotConfig = {
    radius: 25,
    tube: 1,
    tubularSegments: 1000,
    radialSegments: 1000,
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

const animate = () => {
    const mostRightX = canvas.clientWidth / 2;
    const mostTopY = canvas.clientHeight / 2;
    const torusKnotEdgeX = torusKnot.position.x;
    const torusKnotEdgeY = torusKnot.position.y;

    if (torusKnotEdgeX >= mostRightX) {
        xDirection = -1;
    }

    if (torusKnotEdgeX <= -mostRightX) {
        xDirection = 1;
    }

    if (torusKnotEdgeY >= mostTopY) {
        yDirection = -1;
    }

    if (torusKnotEdgeY <= -mostTopY) {
        yDirection = 1;
    }

    torusKnot.rotation.x += xSpeed * xDirection;
    torusKnot.rotation.y += ySpeed * yDirection;
    torusKnot.rotation.z += zSpeed * zDirection;

    torusKnot.position.x += xSpeed * xDirection;
    torusKnot.position.y += ySpeed * yDirection;
    torusKnot.position.z += zSpeed * zDirection;

    render();
    requestAnimationFrame(animate);
};

animate();
