import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";

// const n = window.innerHeight * 10;
const n = 10;
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
    cameraZ: n * 10,
    cameraFov: 90,
    defaultLightColor: "#fff",
    showAxes: true,
    showGrid: true,
    useAmbientLight: true,
    usePointLight: false,
    gridHelperSize: n,
});

const parseFunction = (fn: string): ((x: number, y: number) => number) => {
    return new Function("x", "y", `return ${fn}`) as any;
};

const minX = worldEdges.x.min;
const maxX = worldEdges.x.max;
const minY = worldEdges.y.min;

const plotFunction = (fnString: string) => {
    const fn = parseFunction(fnString);

    for (let x = minX; x <= maxX; x += 1) {
        for (let y = minY; y <= worldEdges.y.max; y += 1) {
            const z = fn(x, y);
            const v = new THREE.Vector3(x, y, z);

            // add a line to the point
            const lineMaterial = new THREE.LineBasicMaterial({
                color: new THREE.Color(`hsl(${z * 10}, 100%, 50%)`),
            });
            const points = [];
            points.push(new THREE.Vector3(x, y, 0));
            points.push(v);
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(
                points,
            );
            const line = new THREE.Line(lineGeometry, lineMaterial);

            scene.add(line);

            //    // add a point with the z,y,z
            //     const geometry = new THREE.SphereGeometry(1, 32, 32);
            //     const material = new THREE.MeshPhongMaterial({
            //         color: new THREE.Color(`hsl(${z * 10}, 100%, 50%)`),
            //         wireframe: shouldShowWireframe(),
            //     });
            //     const sphere = new THREE.Mesh(geometry, material);
            //     sphere.position.set(x, y, z);
            //     scene.add(sphere);

            // const geometry = new THREE.BoxGeometry(1, 1, z);
            // const material = new THREE.MeshPhongMaterial({
            //     color: new THREE.Color(`hsl(${z * 10}, 100%, 50%)`),
            //     wireframe: shouldShowWireframe(),
            // });
            // const cube = new THREE.Mesh(geometry, material);
            // cube.position.set(x, y, z / 2);
            // scene.add(cube);
        }
    }

    // let's interpolate the space between the points and fil it with colors
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [] as THREE.Color[];
    for (let x = minX; x < maxX; x += 1) {
        for (let y = minY; y < worldEdges.y.max; y += 1) {
            const z = fn(x, y);
            vertices.push(x, y, z);
            colors.push(new THREE.Color(`hsl(${z * 10}, 100%, 50%)`));
        }
    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
    );
    geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors as any[], 3),
    );

    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
};

let functionChanged = true;

const animate = () => {
    requestAnimationFrame(animate);
    if (functionChanged) {
        const fnString = `z=x^2+y^2`;
        plotFunction(fnString);
        functionChanged = false;
    }

    render();
};

animate();
