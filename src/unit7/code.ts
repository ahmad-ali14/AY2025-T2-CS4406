import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";
import { createTextSprite } from "../utils/createTextSprite";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";

/**
 * // n is used to control maxX, minX, maxY, minY values for the loop
 * Higher values makes the curve larger.
 * Good range is [1, 3]
 */
let n = 1;
/**
 *  // increment value for the loop (within plotFunction).
 * Higher values makes the curve more coarse.
 * Smaller values makes the curve more fine.
 * Good range is [0.01, 1]
 */
let incr = 0.01;

const {
    camera,
    render,
    scene,
    shouldShowWireframe,
    sidebar,
    shouldShowLabels,
    renderer,
    directionalLight,
    canvas,
    addHelpNote,
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
    showWireframe: false,
});

// for easy access to the edges of the scene
const sceneEdges = {
    top: canvas.height / 2,
    bottom: -canvas.height / 2,
    left: -canvas.width / 2,
    right: canvas.width / 2,
};

// this is the signature of the function which will be used to compute the z value
type ParsedFn = (x: number, y: number) => number;

/**
 * Takes a string representing the math operation to compute z value
 * and returns a function that can be used to compute the z value.
 * The function string comes from the user input, and will be parsed to a function definition.
 * see `defaultFunctions` for examples of a few predefined functions.
 */
const parseFunction = (fn: string): ParsedFn => {
    return new Function("x", "y", `return ${fn}`) as any;
};

/**
 * Generates a parametric function based on the parsed function.
 * This function will be used to generate the geometry of the curve.
 */
const generateParametricFunction = (fn: ParsedFn) => {
    const parametricFunction = (
        u: number,
        v: number,
        target: THREE.Vector3,
    ) => {
        const x = (u - 0.5) * 2 * n; // Map u from [0, 1] to [-n, n]
        const y = (v - 0.5) * 2 * n; // Map v from [0, 1] to [-n, n]
        const z = fn(x, y);
        target.set(x, y, z);
    };
    return parametricFunction;
};

//computes the size of the ground plane, to stay scaled with the curve
const groundSize = (n: number) => n * 100;

//computes the number of segments for the curve
const getCurveSegments = (n: number, incr: number) =>
    Math.max(10, Math.floor((2 * n) / incr));

/**
 * Configure the ground plane.
 * - Assemble the geometry and material.
 * - Add the ground to the scene.
 * - Set the position and rotation to be prendicular to the curve.
 */
const groundGeometry = new THREE.PlaneGeometry(
    groundSize(n),
    groundSize(n),
    10,
    10,
);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: "#84bbfa",
    side: THREE.DoubleSide,
    wireframe: false,
    opacity: 0.5,
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2;
ground.position.y = -n * 5;
scene.add(ground);

/**
 * Setup the curve.
 * - Assemble the geometry and material.
 * - Add the curve to the scene.
 */
const curveGeometry = new THREE.BufferGeometry();
const curveMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    flatShading: false, // Smooth surface appearance
    wireframe: shouldShowWireframe(),
    vertexColors: true, // Enable vertex colors,
});
const curve = new THREE.Mesh(curveGeometry, curveMaterial);
scene.add(curve);

/**
 * This where the actual curve is drawn. It edits the geometry of the curve.
 * It accepts a string representing the function to plot, parse it, and use it to compute z values.
 */
const plotFunction = (fnString: string) => {
    const fn = parseFunction(fnString);

    // guard against 0 values as they cause infinite loops
    if (!n || !incr) {
        alert("Please set N and Increment values.");
        return;
    }

    // setup a new parametric geometry
    const parametricGeometry = new ParametricGeometry(
        generateParametricFunction(fn), // Parametric function is generated based on the parsed function
        getCurveSegments(n, incr),
        getCurveSegments(n, incr),
    );

    // Generate vertex colors based on position
    const positions = parametricGeometry.getAttribute("position").array;
    const colors: number[] = [];

    /**
     * For each vertex,
     * - Push three values into `positions` array representing (x, y, z) coordinates.
     * - Push three values into `colors` array representing (r, g, b) values based on the (x, y, z) coordinates.
     */
    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]!;
        const y = positions[i + 1]!;
        const z = positions[i + 2]!;

        // Normalize coordinates to [0, 1] for RGB mapping
        const r = (x + n) / (2 * n);
        const g = (y + n) / (2 * n);
        const b = (z + n) / (2 * n);

        colors.push(r, g, b);
    }

    // Assign the color attribute to the geometry
    parametricGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3), // RGB colors
    );

    curve.geometry.dispose(); // free up memory of the previous geometry
    curve.geometry = parametricGeometry; // assign the edited geometry to the curve

    // ensure that the ground plane is scaled with the curve
    ground.geometry = new THREE.PlaneGeometry(
        groundSize(n),
        groundSize(n),
        10,
        10,
    );
};

/**
 * Handling shadows:
 * - configure necessary objects to cast and receive shadows.
 * - configure the directional light position and other properties.
 * - set the light source at the top right corner of the canvas.
 * - configure the shadow camera properties.
 */
directionalLight.position.set(sceneEdges.right, sceneEdges.top, 0);
directionalLight.intensity = 2;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

curve.castShadow = true;
curve.receiveShadow = false;

ground.castShadow = false;
ground.receiveShadow = true;

// shadow camera properties
const dlCameraFactor = 2000;
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = dlCameraFactor * 0;
directionalLight.shadow.camera.far = dlCameraFactor;
directionalLight.shadow.camera.left = -dlCameraFactor;
directionalLight.shadow.camera.right = dlCameraFactor;
directionalLight.shadow.camera.top = dlCameraFactor;
directionalLight.shadow.camera.bottom = -dlCameraFactor;

/**
 * These are the default functions that the user can choose from.
 * They will be used to power the user input.
 */
const defaultFunctions = [
    {
        name: "Hyperbolic Paraboloid",
        fn: `x ** 2 - y ** 2`, // Saddle-shaped hyperbolic paraboloid.
    },
    {
        name: "Parabola",
        fn: `x ** 2 + y ** 2`, // A paraboloid (bowl shape).
    },
    {
        name: "Deep Parabola",
        fn: `3 * x ** 2 + 3 * y ** 2`, // A scaled paraboloid.
    },

    {
        name: "Cone",
        fn: `Math.sqrt(x ** 2 + y ** 2)`, // A cone with the vertex at (0, 0, 0).
    },
] as const;

/**
 * A variable that is used to track if the function has changed.
 * If it is set to true the `plotFunction` is called in the next frame.
 * It is set to true when the user changes the function,
 *    and then set to false after the function is plotted.
 */
let functionChanged = true;
let fnString = defaultFunctions[0].fn as string;

/**
 * Scene options and necessary listeners and UI elements.
 * - Select Function: Choose from the predefined functions to plot.
 * - Custom Function: Enter a custom function to plot. Use Javascript notation.
 * - N: Set minX, maxX, minY, maxY values for the function.
 * - Incr: Set the increment value for the loop.
 * - Ground Color: Set the color of the ground plane.
 * - Ground Y: Set the Y position of the ground plane.
 */
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
        <div class="flex flex items-center space-x-2">
           <label for="groundColor" class="font-bold">Ground Color:</label>
            <input type="color" id="groundColor" value="#84bbfa" />
        </div>
        <div class="flex items-center space-x-2">
            <label for="groundY" class="font-bold">Ground Y:</label>
            <input type="range" id="groundY" min="-30" max="0" step="0.1" value="0" />
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
const groundColorInput = document.querySelector(
    "#groundColor",
) as HTMLInputElement;
const groundYInput = document.querySelector("#groundY") as HTMLInputElement;

customFunctionInput.value = fnString;
incrInput.value = incr.toString();
nInput.value = n.toString();
groundColorInput.value = "#" + groundMaterial.color.getHexString().toString();
groundYInput.value = ground.position.y.toString();

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
    // unchecked all radio buttons
    functionRadios.forEach((r) => {
        const v = r.getAttribute("value");
        (r as HTMLInputElement).checked = v === fnString;
    });
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

groundColorInput.addEventListener("input", (e) => {
    const color = (e.target as HTMLInputElement).value;
    groundMaterial.color.set(color);
});

groundYInput.addEventListener("input", (e) => {
    const y = parseFloat((e.target as HTMLInputElement).value);
    ground.position.y = y;
});

camera.position.set(n * 4, n * 4, n * 4);
camera.lookAt(0, 0, 0);

const edge = 3;

/**
 * Add some directional labels to the scene
 * - X, Y, Z labels at the edges of the scene.
 * - Labels for the first few integers on each axis.
 */

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

/**
 * Animation loop
 * - Animate the scene.
 * - Update the materials and labels based on the user's choice.
 * - If the function has changed, plot the new function, and set the flag to false.
 */

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

// help note: accessed  from the UI through the `Help` button.
addHelpNote({
    title: "Scene Options",
    description: "These options are specified for this scene:",
    points: [
        "Select Function: Choose from the predefined functions to plot.",
        "Custom Function: Enter a custom function to plot. Use Javascript notation.",
        `N: Set minX, maxX, minY, maxY values for the function. Default is ${n}.`,
        `Incr: Set the increment value for the loop. Default is ${incr}.`,
        `Ground Color: Set the color of the ground plane. Default is ${groundColorInput.value}.`,
        `Ground Y: Set the Y position of the ground plane. Default is ${ground.position.y}.`,
    ],
});
