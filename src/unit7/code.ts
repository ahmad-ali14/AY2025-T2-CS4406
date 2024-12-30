import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";

// const n = window.innerHeight * 10;
const n = 1;
const incr = 0.01;
// const n = window.innerHeight / 20;
const worldEdges = {
    x: { min: -n, max: n },
    y: { min: -n, max: n },
    z: { min: -n, max: n },
};

const {
    render,
    scene,
    directionalLight,
    renderer,
    canvas,
    shouldShowWireframe,
    sidebar,
    addHelpNote,
    ambientLight,
} = createBaseScene({
    sceneTitle: "Unit 7: Function Graphing",
    cameraZ: n * 5,
    cameraFov: 90,
    defaultLightColor: "#fff",
    showAxes: true,
    showGrid: true,
    useAmbientLight: true,
    usePointLight: false,
    gridHelperSize: n * 10,
    gridHelperDivisions: n * 10 * 10,
});

const parseFunction = (fn: string): ((x: number, y: number) => number) => {
    return new Function("x", "y", `return ${fn}`) as any;
};

const minX = worldEdges.x.min;
const maxX = worldEdges.x.max;
const minY = worldEdges.y.min;

const plotFunction1 = (fnString: string) => {
    const fn = parseFunction(fnString);

    console.log("plotting function", fnString);
    console.log("worldEdges", worldEdges);
    console.log("fn", fn);

    const vertices = [];
    const vectors: THREE.Vector3[] = [];

    for (let x = minX; x <= maxX; x += incr) {
        for (let y = minY; y <= worldEdges.y.max; y += incr) {
            const z = fn(x, y);
            // // add a point with the z,y,z
            // const geometry1 = new THREE.SphereGeometry(incr * 2, 32, 32);
            // const material1 = new THREE.MeshPhongMaterial({
            //     color: new THREE.Color(`hsl(${z * 10}, 100%, 50%)`),
            //     wireframe: shouldShowWireframe(),
            // });
            // const sphere = new THREE.Mesh(geometry1, material1);
            // sphere.position.set(x, y, z);
            // scene.add(sphere);
            vertices.push(x, y, z);
            vectors.push(new THREE.Vector3(x, y, z));
        }
    }

    const geometry = new THREE.BufferGeometry();

    // geometry.setAttribute(
    //     "position",
    //     new THREE.Float32BufferAttribute(vertices, 3),
    // );
    geometry.setFromPoints(vectors);

    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
};

const planeGeometry = new THREE.PlaneGeometry(n * 10, n * 10, 10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: false,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
plane.position.y = -n;
scene.add(plane);

let functionChanged = true;

const animate = () => {
    requestAnimationFrame(animate);
    if (functionChanged) {
        const fnString = `x**2+y**2`;
        plotFunction1(fnString);
        functionChanged = false;
    }

    render();
};

animate();
