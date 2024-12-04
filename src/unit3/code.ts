import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";

const yellowHex = "#ffffaa";

const {
    scene,
    render,
    shouldShowWireframe,
    canvas,
    renderer,
    directionalLight,
    camera,
} = createBaseScene({
    sceneTitle: "Unit 3: Bouncing Torus Knot",
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

/**
 * Prepare the scene to have shadows.
 * For details see: https://threejs.org/docs/#api/en/renderers/WebGLRenderer.shadowMap
 */
renderer.shadowMap.enabled = true; // enable shadow mapping
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // set the type of shadow mapping

/**
 * Prepares the light simulating daylight.
 * see: https://threejs.org/docs/#api/en/lights/DirectionalLight
 */
directionalLight.color = new THREE.Color(yellowHex); // set a yellow color
const top = canvas.height / 2;
const left = -canvas.width / 2;
directionalLight.position.set(left, top, 1); // set the position of the light to the top left corner
directionalLight.visible = true; // ensure the light is visible
directionalLight.intensity = camera.position.z * 1.5; // enough intensity to be seen from the camera
directionalLight.castShadow = true; // enable shadow casting from this light
directionalLight.lookAt(0, 0, 0); // make the light look at the origin

/**
 * Now, let's create a torus knot.
 * We need to assemble the geometry and material first into a mesh.
 */

// Configuration for the torus knot
// see: https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry
const torusKnotConfig = {
    radius: 35, // radius of the torus knot
    tube: 10, // thickness of tube
    tubularSegments: 100, // number of segments along the tube
    radialSegments: 16, // number of segments around the tube
    p: 2, // number of windings around the torus
    q: 3, // number of windings around the axis of the torus
};

// setup the geometry of the torus knot based on the configuration
const torusKnotGeometry = new THREE.TorusKnotGeometry(
    torusKnotConfig.radius,
    torusKnotConfig.tube,
    torusKnotConfig.tubularSegments,
    torusKnotConfig.radialSegments,
    torusKnotConfig.p,
    torusKnotConfig.q,
);

// setup the material of the torus knot
const torusKnotMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00ff, // start from a fixed color
    wireframe: shouldShowWireframe(), // show wireframe if option is enabled
    // clipShadows: true,
});

// create the mesh of the torus knot
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnot.position.set(0, 0, 0); // start from the origin
torusKnot.castShadow = true; // enable shadow casting
torusKnot.receiveShadow = false; // disable shadow receiving
scene.add(torusKnot); // add the torus knot to the scene

let xDirection = 1; // horizontal direction of the torus knot movement: 1 for right, -1 for left
let yDirection = 1; // vertical direction of the torus knot movement: 1 for up, -1 for down
let xSpeed = 5; // horizontal speed of the torus knot
let ySpeed = 5; // vertical speed of the torus knot

let rotationSpeed = 0.01; // speed of the rotation of the torus knot
let rotationDirection = 1; // direction of the rotation of the torus knot: 1 for clockwise, -1 for counter-clockwise

/**
 * Generates a random color of type THREE.Color.
 */
const generateRandomColor = () => {
    const r = THREE.MathUtils.randInt(0, 255);
    const g = THREE.MathUtils.randInt(0, 255);
    const b = THREE.MathUtils.randInt(0, 255);
    return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
};

/**
 * We will add a plane to the scene to simulate the ground.
 * This just makes the lights and shadows more visible.
 */
const planeGeometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight,
    32,
    32,
);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true; // enable shadow receiving
plane.castShadow = false; // disable shadow casting
plane.position.set(0, 0, 1); // place the plane just above the origin
scene.add(plane); // add the plane to the scene

const animate = () => {
    /**
     * Let's determine the coordinates of the edges of view first,
     * then we can compare with the current position of the torus knot
     */
    const torusKnotLength = 2 * (torusKnotConfig.radius + torusKnotConfig.tube); // approximation  of the length of the torus knot
    const viewEdges = {
        top: -(canvas.height / 2 - torusKnotLength), // screen top x coordinate
        bottom: canvas.height / 2 - torusKnotLength, // screen bottom x coordinate
        left: -(canvas.width / 2 - torusKnotLength), // screen left y coordinate
        right: canvas.width / 2 - torusKnotLength, // screen right y coordinate
    };

    // find the coordinate of the current position of the torus knot
    const torusKnotEdgeX = torusKnot.position.x; // x coordinate of the torus knot
    const torusKnotEdgeY = torusKnot.position.y; // y coordinate of the torus knot

    /**
     * The edges of the view are the boundaries of x,y coordinates that the torus knot can move.
     * After hitting an edge, the torus knot will change its direction and color.
     * E.g. When the x of the torus knot is greater than the right edge of the view, the torus should go left.
     */

    // check the right edge of the view
    if (torusKnotEdgeX >= viewEdges.right) {
        xDirection = -1; // change the direction to left
        torusKnotMaterial.color = generateRandomColor();
    }

    // check the left edge of the view
    if (torusKnotEdgeX <= viewEdges.left) {
        xDirection = 1; // change the direction to right
        torusKnotMaterial.color = generateRandomColor();
    }

    // check the bottom edge of the view
    if (torusKnotEdgeY >= viewEdges.bottom) {
        yDirection = -1; // change the direction to up
        torusKnotMaterial.color = generateRandomColor();
    }

    // check the top edge of the view
    if (torusKnotEdgeY <= viewEdges.top) {
        yDirection = 1; // change the direction to down
        torusKnotMaterial.color = generateRandomColor();
    }

    /**
     * Update the position and rotation of the torus knot.
     * This is not required it makes things more interesting.
     */
    torusKnot.rotation.x += rotationSpeed * rotationDirection;
    torusKnot.rotation.y += rotationSpeed * rotationDirection;
    torusKnot.rotation.z += rotationSpeed * rotationDirection;

    /**
     * Update the position of the torus knot based on the speed and direction.
     */
    torusKnot.position.x += xSpeed * xDirection;
    torusKnot.position.y += ySpeed * yDirection;

    render(); // re-render the scene
    requestAnimationFrame(animate); // prepare for the next frame
};

animate();
