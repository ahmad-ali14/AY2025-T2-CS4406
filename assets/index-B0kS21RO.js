import{c as f,j as g,g as t,k as o,M as v}from"./createBaseScene-BcW4Y2G7.js";const x=""+new URL("1-Bdai6EQG.jpg",import.meta.url).href,w=""+new URL("2-DScUrCzm.jpg",import.meta.url).href,S=""+new URL("3-D4R_keuG.jpeg",import.meta.url).href,L=""+new URL("4-CH830PxK.jpg",import.meta.url).href,{render:R,scene:C,sidebar:y,addHelpNote:E}=f({sceneTitle:"Unit 4: Textured Cube",cameraZ:window.innerHeight,defaultLightColor:"#ffffff",showAxes:!1,showGrid:!1}),e=500,D=new g(e,e,e),k=[new t({map:new o().load(x)}),new t({map:new o().load(w)}),new t({color:65280}),new t({color:16711680}),new t({map:new o().load(S)}),new t({map:new o().load(L)})],i=new v(D,k);C.add(i);let a=!0,c=.01,u="y",p=1;const h=document.createElement("div");h.classList.add("mb-4");h.innerHTML=`
    <hr class="border border-b-[#000] mb-2" />
    <h2 class="text-xl font-bold text-center mb-2">Scene Options</h2>
    <div class="flex flex-col space-y-2 text-lg">
        <div>
            <input type="checkbox" id="rotate" checked>
            <label for="rotate" class="font-bold">Rotate</label>
        </div>
        <div>
            <label for="rotationSpeed" class="font-bold">Rotation Speed</label>
            <input type="range" id="rotationSpeed" min="0" max="0.1" step="0.01" value="0.01">
        </div>
        <div>
            <label for="cubeSideLength" class="font-bold">Cube Side Length</label>
            <input type="range" id="cubeSideLength" min="50" max="500" step="1" value="${e}">
        </div>
        <div>
            <label for="rotationAxis" class="font-bold">Rotation Axis</label>
            <select id="rotationAxis" class="min-w-20 ml-2">
                <option value="x">x</option>
                <option value="y" selected>y</option>
                <option value="z">z</option>
            </select>
        </div>
        <div class="">
            <label for="rotationDirection" class="font-bold">Rotation Direction</label>
            <select id="rotationDirection">
                <option value="1">Clockwise</option>
                <option value="-1">Counter Clockwise</option>
            </select>
        </div>
        <div>
            <button id="resetRotation" class="bg-blue-500 text-white p-2 rounded-md text-sm">Reset Rotation</button>
        </div>
    </div>
    `;y.appendChild(h);const n=document.getElementById("rotate"),l=document.getElementById("rotationSpeed"),r=document.getElementById("rotationAxis"),d=document.getElementById("rotationDirection"),m=document.getElementById("cubeSideLength");n.checked=a;l.value=c.toString();r.value=u;d.value=p.toString();n.addEventListener("change",()=>{a=n.checked});l.addEventListener("input",()=>{c=parseFloat(l.value)});r.addEventListener("change",()=>{u=r.value});d.addEventListener("change",()=>{p=parseInt(d.value)});m.addEventListener("input",()=>{const s=parseFloat(m.value);i.scale.set(s/e,s/e,s/e)});const A=()=>{a&&(i.rotation[u]+=c*p)},B=()=>{a=!1,n.checked=!1,i.rotation.set(0,0,0)},I=document.getElementById("resetRotation");I.addEventListener("click",B);const b=()=>{requestAnimationFrame(b),A(),R()};b();E({title:"Scene Options",description:"These options are specified for this scene:",points:["Rotate: Start/Stop the rotation of the mesh.","Rotation Speed: Adjust the speed of rotation. Default is 0.01.","Cube Side Length: Adjust the side length of the cube. Default is 500.","Rotation Axis: Change the axis of rotation, the shape will rotate around this axis.","Rotation Direction: Change the direction of rotation. Default is clockwise.","Reset Rotation: Stop the rotation and reset the shape's rotation to the last state before rotation started."]});
//# sourceMappingURL=index-B0kS21RO.js.map
