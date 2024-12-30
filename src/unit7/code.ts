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
    camera,
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
    cameraZ: n * 15,
    cameraFov: 90,
    defaultLightColor: "#fff",
    showAxes: true,
    showGrid: true,
    useAmbientLight: true,
    usePointLight: false,
    gridHelperSize: n * 10,
    gridHelperDivisions: n * 10 * 10,
    showWireframe: false,
});

const parseFunction = (fn: string): ((x: number, y: number) => number) => {
    return new Function("x", "y", `return ${fn}`) as any;
};

const minX = worldEdges.x.min;
const maxX = worldEdges.x.max;
const minY = worldEdges.y.min;

const planeGeometry = new THREE.PlaneGeometry(n * 20, n * 20, 10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: false,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
plane.position.y = -n;
scene.add(plane);

const curveGeometry = new THREE.BufferGeometry();
const curveMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    wireframe: shouldShowWireframe(),
});
const curve = new THREE.Mesh(curveGeometry, curveMaterial);
scene.add(curve);

const plotFunction1 = (fnString: string) => {
    const fn = parseFunction(fnString);

    const vertices = [];
    const vectors: THREE.Vector3[] = [];
    const indices: number[] = [];

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
            // indices.push(
            //     vectors.length - 1,
            //     // vectors.length - 1,
            //     // vectors.length - 1,
            // );
        }
    }

    curve.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
    );
    curve.geometry.setIndex(indices);
    curve.geometry.computeVertexNormals();
    // curve.geometry.setFromPoints(vectors);

    // curve.geometry.computeBoundingSphere();
};

const defaultFunctions = [
    {
        name: "Simple Parabola",
        fn: `x ** 2 + y ** 2`, // A paraboloid (bowl shape).
    },
    {
        name: "Parabola",
        fn: `3 * x ** 2 + 3 * y ** 2`, // A scaled paraboloid.
    },
    {
        name: "Hyperbolic Paraboloid",
        fn: `x ** 2 - y ** 2`, // Saddle-shaped hyperbolic paraboloid.
    },
    {
        name: "Cone",
        fn: `Math.sqrt(x ** 2 + y ** 2)`, // A cone with the vertex at (0, 0, 0).
    },
] as const;

let functionChanged = true;
let fnString = defaultFunctions[0].fn as string;

const sceneOptionsDiv = document.createElement("div");
sceneOptionsDiv.classList.add("mb-4");

sceneOptionsDiv.innerHTML = `
   <hr class="border border-b-[#000] mb-2" />
    <h2 class="text-xl font-bold text-center mb-2">Scene Options</h2>
    <div class="flex flex-col space-y-2 text-lg">
        <div>
            <label for="selectFunction" class="font-bold">Select Function: </label>
                ${defaultFunctions
                    .map(
                        (f) =>
                            `<label class="flex flex-col py-1">
                                 <div>
                                    <input type="radio" name="selectFunction" 
                                         class="selectFunction"
                                         value="${f.fn}" 
                                         ${f.fn === fnString ? "checked" : ""} 
                                    />
                                    <span>${f.name}</span> 
                                 </div>
                                 <div class="ml-5">
                                    <code class="block bg-gray-200 text-blue-600 font-mono text-sm p-2 rounded">
                                        ${f.fn}
                                    </code>
                                 </div>
                            </label>`,
                    )
                    .join("")}
        </div>
        <div class="flex flex-col space-y-2 text-lg">
            <label for="function" class="font-bold">Custom Function:</label>
            <div class="text-sm">Please follow Javascript notation (and not Math), similar to the options above.</div>
            <input type="text" id="customFunction" class="p-2 border border-gray-400 rounded" />
            <button id="plotFunction" class="p-2 bg-blue-500 text-white rounded">Plot</button>
        </div>

    </div>
    `;

sidebar.appendChild(sceneOptionsDiv);

const functionRadios = document.querySelectorAll(".selectFunction");
const customFunctionInput = document.querySelector(
    "#customFunction",
) as HTMLInputElement;
const plotFunctionButton = document.querySelector(
    "#plotFunction",
) as HTMLButtonElement;

customFunctionInput.value = fnString;

functionRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const newFnString = target.value;
        fnString = newFnString;
        functionChanged = true;
        customFunctionInput.value = newFnString;
    });
});

plotFunctionButton.addEventListener("click", () => {
    fnString = customFunctionInput.value;
    functionChanged = true;
});

camera.position.set(n * 5, n * 5, n * 5);
camera.lookAt(0, 0, 0);

const animate = () => {
    if (functionChanged) {
        plotFunction1(fnString);
        functionChanged = false;
    }
    requestAnimationFrame(animate);
    render();
};

animate();
