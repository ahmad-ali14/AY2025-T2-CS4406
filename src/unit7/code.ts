import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";
import { createTextSprite } from "../utils/createTextSprite";

let n = 1;
let incr = 0.01;

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
    shouldShowLabels,
} = createBaseScene({
    sceneTitle: "Unit 7: Function Graphing",
    cameraZ: n * 15,
    cameraFov: 90,
    defaultLightColor: "#fff",
    showAxes: true,
    showGrid: false,
    useAmbientLight: true,
    usePointLight: false,
    gridHelperSize: n * 10,
    gridHelperDivisions: n * 10 * 10,
    showWireframe: true,
});

const parseFunction = (fn: string): ((x: number, y: number) => number) => {
    return new Function("x", "y", `return ${fn}`) as any;
};

const planeSize = (n: number) => n * 100;

const planeGeometry = new THREE.PlaneGeometry(
    planeSize(n),
    planeSize(n),
    10,
    10,
);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: "#84bbfa",
    side: THREE.DoubleSide,
    wireframe: false,
    opacity: 0.5,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
plane.position.y = -n *2;
scene.add(plane);

const curveGeometry = new THREE.BufferGeometry();
const curveMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    wireframe: shouldShowWireframe(),
});
const curve = new THREE.Mesh(curveGeometry, curveMaterial);
scene.add(curve);

const plotFunction = (fnString: string) => {
    const fn = parseFunction(fnString);

    if (!n || !incr) {
        alert("Please set N and Increment values.");
        return;
    }

    // clean up the previous vectors
    // curve.geometry.dispose();
    curve.geometry = new THREE.BufferGeometry();

    const vectors: THREE.Vector3[] = [];

    const minX = -n;
    const maxX = n;
    const minY = -n;
    const maxY = n;

    for (let x = minX; x <= maxX; x += incr) {
        for (let y = minY; y <= maxY; y += incr) {
            const z = fn(x, y);
            vectors.push(new THREE.Vector3(x, y, z));
        }
    }

    console.log(vectors.length);
    console.log("vectors", vectors);

    curve.geometry.setFromPoints(vectors);
    plane.geometry = new THREE.PlaneGeometry(
        planeSize(n),
        planeSize(n),
        10,
        10,
    );
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
                                       z = ${f.fn}
                                    </code>
                                 </div>
                            </label>`,
                    )
                    .join("")}
        </div>
        <div class="flex flex-col space-y-2 text-lg">
            <label for="function" class="font-bold">Custom Function:</label>
            <div class="text-sm">Please follow Javascript notation (and not Math), similar to the options above.</div>
            <div class="flex gap-1 items-center">
                <div>z = </div>
                <input type="text" id="customFunction" class="p-2 border border-gray-400 rounded" />
            </div>
            <button id="plotFunction" class="p-2 bg-blue-500 text-white rounded">Plot</button>
        </div>
        <div class="flex items-center space-x-2">
            <span class="font-bold">N:</span>
            <input type="range" id="nInput" min="${0.1}" max="${3}" step="0.1" value="${n}" />
        </div>
        <div class="flex items-center space-x-2">
            <span class="font-bold">Incr:</span>
            <input type="range" id="incrInput" min="${0.01}" max="${1}" step="0.01" value="${incr}" />
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
const nInput = document.querySelector("#nInput") as HTMLInputElement;
const incrInput = document.querySelector("#incrInput") as HTMLInputElement;

customFunctionInput.value = fnString;
incrInput.value = incr.toString();
nInput.value = n.toString();

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

nInput.addEventListener("input", (e) => {
    setTimeout(() => {
        n = parseFloat((e.target as HTMLInputElement).value);
        functionChanged = true;
    }, 1500);
});

incrInput.addEventListener("input", (e) => {
    incr = parseFloat((e.target as HTMLInputElement).value);
    functionChanged = true;
});

camera.position.set(n * 5, n * 5, n * 5);
camera.lookAt(0, 0, 0);

const edge = 4;

const createAxisLabels = (
    axis: "x" | "y" | "z",
): THREE.Sprite<THREE.Object3DEventMap>[] => {
    const labels: THREE.Sprite<THREE.Object3DEventMap>[] = [];
    const axisName = createTextSprite(axis.toUpperCase());
    axisName.position.set(0, 0, 0);
    axisName.position[axis] = edge + 1;
    labels.push(axisName);

    for (let i = 0; i <= edge; i++) {
        const label = createTextSprite(i.toString());
        label.position.set(0, 0, 0);
        label.position[axis] = i;
        labels.push(label);
    }
    return labels;
};

const labels = [
    ...createAxisLabels("x"),
    ...createAxisLabels("y"),
    ...createAxisLabels("z"),
];

labels.forEach((l) => scene.add(l));

const animate = () => {
    if (functionChanged) {
        plotFunction(fnString);
        functionChanged = false;
    }
    const materials = [
        // plane.material,
        curve.material,
    ];
    materials.forEach((m) => {
        m.wireframe = shouldShowWireframe();
    });

    labels.forEach((l) => {
        l.visible = shouldShowLabels();
    });

    requestAnimationFrame(animate);
    render();
};

animate();
