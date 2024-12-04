import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type HelpNote = {
    title: string;
    description: string;
    points: string[];
};
const defaultControlOptionsHelpNote: HelpNote = {
    title: "Controls Options",
    description:
        "This section adds extra functionality to control the scene including grid, axes, mouse controls, and zoom.",
    points: [
        "Show Grid: Show/Hide the XY grid helper in the scene.",
        "Show Axes: Show/Hide the XYZ axes helper in the scene.",
        "Use Orbit Controls: Enable/Disable the mouse orbit controls. If enabled, use the mouse to rotate, zoom, and pan the scene.",
        "Show Wireframe: Show/Hide the wireframe of the objects in the scene. Useful for debugging.",
        "Show Labels: Show/Hide the labels of the objects in the scene. If this is disabled, all labels across the scene will be hidden.",
    ],
};

const defaultLightsOptionsHelpNote: HelpNote = {
    title: "Lights Options",
    description:
        "This section adds extra functionality to control the scene lights including ambient and directional lights.",
    points: [
        "Use Ambient Light: Toggles the ambient light in the scene.",
        "Ambient Light Color: Changes the color of the ambient light.",
        "Ambient Light Intensity: Changes the intensity of the ambient light.",
        "Use Directional Light: Toggles the directional light in the scene.",
        "Directional Light Color: Changes the color of the directional light.",
        "Directional Light Intensity: Changes the intensity of the directional light.",
        "Note: the position of the directional light is not configurable, yet.",
    ],
};

type CreateBaseSceneParams = {
    canvasId?: string;
    sceneTitle: string;
    cameraZ?: number;
    showGrid?: boolean;
    showAxes?: boolean;
    useOrbitControls?: boolean;
    showWireframe?: boolean;
    showLabels?: boolean;
    useAmbientLight?: boolean;
    useDirectionalLight?: boolean;
    usePointLight?: boolean;
    defaultLightColor?: string;
};

const defaultParams: Required<CreateBaseSceneParams> = {
    canvasId: "glcanvas",
    sceneTitle: "Base Scene",
    cameraZ: 200,
    showGrid: true,
    showAxes: true,
    useOrbitControls: true,
    showWireframe: false,
    showLabels: true,
    useAmbientLight: true,
    useDirectionalLight: true,
    usePointLight: true,
    defaultLightColor: "#ffffff",
};

export const createBaseScene = (
    params: CreateBaseSceneParams = defaultParams,
) => {
    const { canvasId, cameraZ, sceneTitle, defaultLightColor } =
        params as Required<CreateBaseSceneParams>;
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("flex", "h-full", "w-full");
    document.body.appendChild(mainDiv);
    const canvas = document.createElement("canvas");
    canvas.id = canvasId;
    canvas.classList.add("glcanvas", "md:w-[80%]");
    mainDiv.appendChild(canvas);

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Canvas not found");
    }

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const h = windowHeight;
    const w = windowWidth * 0.8;
    canvas.width = w;
    canvas.height = h;
    const canvasAspect = canvas.width / canvas.height;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, canvasAspect, 0.1, 1000);
    camera.position.z = cameraZ;

    const ambientLight = new THREE.AmbientLight(defaultLightColor, 1);
    ambientLight.visible = params.useAmbientLight ?? true;
    scene.add(ambientLight); // dim light shining from above

    var viewpointLight = new THREE.PointLight(defaultLightColor, 1); // a light to shine in the direction the camera faces
    viewpointLight.position.set(0, 0, 1); // shines down the z-axis
    viewpointLight.visible = params.usePointLight ?? true;
    scene.add(viewpointLight);

    const directionalLight = new THREE.DirectionalLight(defaultLightColor, 1);
    directionalLight.position.set(1, 1, 1);
    directionalLight.visible = params.useDirectionalLight ?? true;
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);

    // right sidebar, for config and info
    const shouldShowSidebar = true;

    const sidebar = document.createElement("div");
    sidebar.classList.add(
        "w-[20%]",
        "h-window",
        "bg-gray-200",
        "overflow-auto",
        "p-4",
    );
    sidebar.style.height = `calc(100vh - 50px)`;
    mainDiv.appendChild(sidebar);

    const title = document.createElement("h1");
    title.innerText = sceneTitle;

    title.classList.add("text-2xl", "font-bold", "mb-4", "text-center");

    shouldShowSidebar && sidebar.appendChild(title);

    const shouldShowAxis = params.showAxes ?? true;
    const shouldShowGrid = params.showGrid ?? true;
    const shouldUseOrbitControls = params.useOrbitControls ?? true;
    let shouldShowWireframe = params.showWireframe ?? false;
    let shouldShowLabels = params.showLabels ?? true;

    // Add a grid to the scene
    const gridHelper = new THREE.GridHelper(1000, 1000);
    gridHelper.position.set(0, 0, 0);
    gridHelper.material.opacity = 0.25;
    gridHelper.visible = shouldShowGrid;
    scene.add(gridHelper);

    // Add an axis to the scene
    const axesHelper = new THREE.AxesHelper(1000);
    axesHelper.position.set(0, 0, 0);
    axesHelper.visible = shouldShowAxis;
    axesHelper.setColors(0x0000ff, 0x00ff00, 0xff0000);
    scene.add(axesHelper);

    // add camera controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.autoRotate = false;
    controls.enabled = shouldUseOrbitControls;

    const controlOptionsDiv = document.createElement("div");
    controlOptionsDiv.classList.add("mb-4");

    controlOptionsDiv.innerHTML = `
    <hr class="border border-b-[#000] mb-2" />
    <h2 class="text-xl font-bold text-center mb-2">Controls Options</h2>
    <div class="flex flex-col space-y-2 text-lg">
      <div>
        <input type="checkbox" id="showGrid" checked>
      <label for="showGrid" class="font-bold">Show Grid</label>
      </div>
      <div>
        <input type="checkbox" id="showAxes" checked>
        <label for="showAxes" class="font-bold">Show Axes</label>
      </div>
      <div>
        <input type="checkbox" id="useOrbitControls" checked>
        <label for="useOrbitControls" class="font-bold">Use Orbit Controls</label>
      </div>
      <div>
       <input type="checkbox" id="showWireframe">
         <label for="showWireframe" class="font-bold">Show Wireframe</label>
     </div>
     <div>
         <input type="checkbox" id="showLabels">
         <label for="showLabels" class="font-bold">Show Labels</label>
        </div>
    </div>  
    `;
    sidebar.appendChild(controlOptionsDiv);

    const showGrid = document.getElementById("showGrid") as HTMLInputElement;
    const showAxes = document.getElementById("showAxes") as HTMLInputElement;
    const useOrbitControls = document.getElementById(
        "useOrbitControls",
    ) as HTMLInputElement;
    const showWireframe = document.getElementById(
        "showWireframe",
    ) as HTMLInputElement;
    const showLabels = document.getElementById(
        "showLabels",
    ) as HTMLInputElement;

    showGrid.checked = shouldShowGrid;
    showAxes.checked = shouldShowAxis;
    useOrbitControls.checked = shouldUseOrbitControls;
    showWireframe.checked = shouldShowWireframe;
    showLabels.checked = shouldShowLabels;

    showGrid.addEventListener("change", () => {
        gridHelper.visible = showGrid.checked;
    });

    showAxes.addEventListener("change", () => {
        axesHelper.visible = showAxes.checked;
    });

    useOrbitControls.addEventListener("change", () => {
        controls.enabled = useOrbitControls.checked;
    });

    showWireframe.addEventListener("change", () => {
        shouldShowWireframe = showWireframe.checked;
    });

    showLabels.addEventListener("change", () => {
        shouldShowLabels = showLabels.checked;
    });

    // help modal
    const helpNotes: HelpNote[] = [
        defaultControlOptionsHelpNote,
        defaultLightsOptionsHelpNote,
    ];
    const helpModal = document.createElement("div");
    helpModal.id = "helpModal";
    helpModal.classList.add(
        "fixed",
        "top-0",
        "left-0",
        "w-full",
        "h-full",
        "bg-black",
        "bg-opacity-50",
        "flex",
        "items-center",
        "justify-center",
        "hidden", // Initially hidden
    );

    const modalContentWrapper = document.createElement("div");
    modalContentWrapper.classList.add(
        "bg-white",
        "p-6",
        "rounded-lg",
        "shadow-lg",
        "text-center",
        "max-w-5xl",
        "w-full",
    );
    modalContentWrapper.innerHTML = `
      <div id="helpModalContent" class="w-full"></div>
      <button id="closeHelp" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
    `;

    helpModal.appendChild(modalContentWrapper);
    document.body.appendChild(helpModal);

    // Close modal event listener
    const closeModalButton = modalContentWrapper.querySelector("#closeHelp");
    closeModalButton?.addEventListener("click", () => {
        helpModal.classList.add("hidden");
    });

    // help button
    const helpDiv = document.createElement("div");
    helpDiv.innerHTML = `<div class="flex fixed bottom-1 w-full max-w-[18%]">
    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full">
       ? Help
    </button>
    </div>`;
    sidebar.appendChild(helpDiv);
    helpDiv.addEventListener("click", () => {
        const modalContent =
            modalContentWrapper.querySelector("#helpModalContent");
        if (!modalContent) {
            throw new Error("Modal content not found");
        }
        modalContent.innerHTML = helpNotes
            .map((hp) => {
                const { title, points, description } = hp;
                return `
                <div class="mb-5">
                    <h2 class="text-2xl font-bold mb-4 border-b pb-1">${title}</h2>
                    ${
                        description
                            ? `<p class="mb-2 text-left">${description}</p>`
                            : ""
                    }
                    <ul class="text-left mb-4 list-disc pl-6">
                    ${points.map((point) => `<li>${point}</li>`).join("")}
                    </ul>
                </div>
            `;
            })
            .join(" ");
        helpModal.classList.remove("hidden"); // Show the modal
    });

    const addHelpNote = (helpNote: HelpNote) => {
        helpNotes.push(helpNote);
    };

    const lightsOptionsDiv = document.createElement("div");
    lightsOptionsDiv.classList.add("mb-4");

    lightsOptionsDiv.innerHTML = `
    <hr class="border border-b-[#000] mb-2" />
    <h2 class="text-xl font-bold text-center mb-2">Lights Options</h2>
    <div class="flex flex-col space-y-2 text-lg">
      <div>
        <input type="checkbox" id="useAmbientLight" checked>
        <label for="useAmbientLight" class="font-bold">Use Ambient Light</label>
     </div>
      <div>
        <label for="ambientLightColor" class="font-bold">Ambient Light Color</label>
        <input type="color" id="ambientLightColor" value="${defaultLightColor}">
      </div>
      <div>
        <label for="ambientLightIntensity" class="font-bold">Ambient Light Intensity</label>
        <input type="range" id="ambientLightIntensity" min="0" max="10" step="0.1" value="1.0">
      </div>
      <div class="border-b"></div>
      <div>
        <input type="checkbox" id="useDirectionalLight" checked>
        <label for="useDirectionalLight" class="font-bold">Use Directional Light</label>
       </div>
       <div>
            <label for="directionalLightColor" class="font-bold">Directional Light Color</label>
            <input type="color" id="directionalLightColor" value="${defaultLightColor}">
       </div>
      <div>
        <label for="directionalLightIntensity" class="font-bold">Directional Light Intensity</label>
        <input type="range" id="directionalLightIntensity" min="0" max="10" step="0.1" value="1.0">
      </div>
      <div class="border-b"></div>
      <div>
        <input type="checkbox" id="usePointLight" checked>
        <label for="usePointLight" class="font-bold">Use Point Light</label>
       </div>
       <div>
            <label for="pointLightColor" class="font-bold">Point Light Color</label>
            <input type="color" id="pointLightColor" value="${defaultLightColor}">
       </div>
      <div>
        <label for="pointLightIntensity" class="font-bold">Point Light Intensity</label>
        <input type="range" id="pointLightIntensity" min="0" max="10" step="0.1" value="1.0">
      </div>
      
    </div>
    `;

    sidebar.appendChild(lightsOptionsDiv);

    const useAmbientLight = document.getElementById(
        "useAmbientLight",
    ) as HTMLInputElement;

    const useDirectionalLight = document.getElementById(
        "useDirectionalLight",
    ) as HTMLInputElement;

    const usePointLight = document.getElementById(
        "usePointLight",
    ) as HTMLInputElement;

    const ambientLightColorInput = document.getElementById(
        "ambientLightColor",
    ) as HTMLInputElement;

    const directionalLightColorInput = document.getElementById(
        "directionalLightColor",
    ) as HTMLInputElement;

    const ambientLightIntensityInput = document.getElementById(
        "ambientLightIntensity",
    ) as HTMLInputElement;

    const directionalLightIntensityInput = document.getElementById(
        "directionalLightIntensity",
    ) as HTMLInputElement;

    const pointLightColorInput = document.getElementById(
        "pointLightColor",
    ) as HTMLInputElement;

    const pointLightIntensityInput = document.getElementById(
        "pointLightIntensity",
    ) as HTMLInputElement;

    useAmbientLight.checked = params.useAmbientLight ?? true;
    useDirectionalLight.checked = params.useDirectionalLight ?? true;
    usePointLight.checked = params.usePointLight ?? true;
    useAmbientLight.value = defaultLightColor as string;
    useDirectionalLight.value = defaultLightColor as string;
    usePointLight.value = defaultLightColor as string;

    ambientLightIntensityInput.addEventListener("input", () => {
        scene.traverse((child) => {
            if (child instanceof THREE.AmbientLight) {
                child.intensity = parseFloat(ambientLightIntensityInput.value);
            }
        });
    });

    useAmbientLight.addEventListener("change", () => {
        scene.traverse((child) => {
            if (child instanceof THREE.AmbientLight) {
                child.visible = useAmbientLight.checked;
            }
        });
    });

    useDirectionalLight.addEventListener("change", () => {
        scene.traverse((child) => {
            if (child instanceof THREE.DirectionalLight) {
                child.visible = useDirectionalLight.checked;
            }
        });
    });

    ambientLightColorInput.addEventListener("input", () => {
        scene.traverse((child) => {
            if (child instanceof THREE.AmbientLight) {
                child.color = new THREE.Color(ambientLightColorInput.value);
            }
        });
    });

    directionalLightColorInput.addEventListener("input", () => {
        scene.traverse((child) => {
            if (child instanceof THREE.DirectionalLight) {
                child.color = new THREE.Color(directionalLightColorInput.value);
            }
        });
    });

    directionalLightIntensityInput.addEventListener("input", () => {
        scene.traverse((child) => {
            if (child instanceof THREE.DirectionalLight) {
                child.intensity = parseFloat(
                    directionalLightIntensityInput.value,
                );
            }
        });
    });

    usePointLight.addEventListener("change", () => {
        scene.traverse((child) => {
            if (child instanceof THREE.PointLight) {
                child.visible = usePointLight.checked;
            }
        });
    });

    pointLightColorInput.addEventListener("input", () => {
        scene.traverse((child) => {
            if (child instanceof THREE.PointLight) {
                child.color = new THREE.Color(pointLightColorInput.value);
            }
        });
    });

    pointLightIntensityInput.addEventListener("input", () => {
        scene.traverse((child) => {
            if (child instanceof THREE.PointLight) {
                child.intensity = parseFloat(pointLightIntensityInput.value);
            }
        });
    });

    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);
    cameraHelper.visible = false;

    window.addEventListener("resize", () => {
        // Update renderer
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Update camera
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    return {
        canvas,
        scene,
        camera,
        renderer,
        render: () => {
            renderer.render(scene, camera);
        },
        addHelpNote,
        shouldShowWireframe: () => shouldShowWireframe,
        shouldShowLabels: () => shouldShowLabels,
        sidebar,
        ambientLight,
        viewpointLight,
        directionalLight,
    };
};
