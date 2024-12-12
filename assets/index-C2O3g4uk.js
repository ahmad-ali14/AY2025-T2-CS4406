import{C as B,S as D,a as F,c as M,B as I,b as z,M as T,V as O,d as V,e as N,D as H,N as U,f as $}from"./createBaseScene-BcW4Y2G7.js";const R=t=>{const o=document.createElement("canvas"),a=256;o.width=a,o.height=a;const i=o.getContext("2d");if(!i)throw new Error("2D context not supported");i.font="Bold 48px Arial",i.fillStyle="rgba(255, 255, 255, 1.0)",i.textAlign="center",i.textBaseline="middle",i.fillText(t.toString(),a/2,a/2);const n=new B(o),d=new D({map:n,depthTest:!1}),r=new F(d);return r.scale.set(2,2,1),r},{scene:j,render:W,addHelpNote:q,shouldShowWireframe:P,shouldShowLabels:E,sidebar:Z}=M({sceneTitle:"Unit 2: Polygon with 5 vertices",cameraZ:20}),e=new I,l=new Float32Array([0,5,0,4.8,1.5,0,3,-4,0,-3,-4,0,-4.8,1.5,0,0,5,5,4.8,1.5,5,3,-4,5,-3,-4,5,-4.8,1.5,5]),u=[0,1,2,0,2,3,0,3,4,5,6,7,5,7,8,5,8,9,0,5,1,1,6,2,6,7,2,2,7,3,7,8,3,3,8,4,8,9,4,4,9,0,9,5,0,1,5,6,3,4,8,2,3,8,2,8,7];e.setAttribute("position",new z(l,3));e.setIndex(u);e.computeVertexNormals();e.addGroup(0,3,0);e.addGroup(3,3,1);e.addGroup(6,3,2);e.addGroup(9,3,3);e.addGroup(12,3,4);e.addGroup(15,3,0);e.addGroup(18,3,1);e.addGroup(21,3,2);e.addGroup(24,3,3);e.addGroup(27,3,4);e.addGroup(30,3,0);e.addGroup(33,3,1);e.addGroup(36,3,2);e.addGroup(39,3,3);e.addGroup(42,3,4);e.addGroup(45,3,0);const J=()=>{const t=$.randInt(200,255);return new N(`rgb(${t}, 0, 0)`)},K={polygonOffset:!0,polygonOffsetUnits:1,polygonOffsetFactor:1,side:H,flatShading:!1,blending:U,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",wireframeLinewidth:500,color:"rgb(255, 0, 0)"},s=()=>new V({...K,color:J()}),G=[s(),s(),s(),s(),s(),s(),s(),s(),s(),s()],c=new T(e,G);j.add(c);const Q=l.length/3,C=[];for(let t=0;t<Q;t++){const o=l[t*3]||0,a=l[t*3+1]||0,i=l[t*3+2]||0,n=R(`V${t}`);n.position.set(o,a,i),n.visible=!1,c.add(n),C.push(n)}const k=[];for(let t=0;t<e.groups.length;t++){const o=e.groups[t];if(!o)continue;const a=R(`F${t}`),n=[u[o.start],u[o.start+1],u[o.start+2]].reduce((r,p)=>(p===void 0||(r.x+=l[p*3]||0,r.y+=l[p*3+1]||0,r.z+=l[p*3+2]||0),r),{x:0,y:0,z:0}),d=new O(n.x/3,n.y/3,n.z/3);a.position.set(d.x,d.y,d.z),a.visible=!1,c.add(a),k.push(a)}let f=!0,w=.01,x="y",S=1,y=!1;const L=document.createElement("div");L.classList.add("mb-4");L.innerHTML=`
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
            <input type="checkbox" id="showFacesLabels">
            <label for="showFacesLabels" class="font-bold">Show Face Labels</label>
        </div>
        <div>
            <button id="resetRotation" class="bg-blue-500 text-white p-2 rounded-md text-sm">Reset Rotation</button>
        </div>
    </div>
    `;Z.appendChild(L);const h=document.getElementById("rotate"),b=document.getElementById("rotationSpeed"),m=document.getElementById("rotationAxis"),v=document.getElementById("rotationDirection"),g=document.getElementById("showFacesLabels");h.checked=f;b.value=w.toString();m.value=x;v.value=S.toString();g.checked=y;h.addEventListener("change",()=>{f=h.checked});b.addEventListener("input",()=>{w=parseFloat(b.value)});m.addEventListener("change",()=>{x=m.value});v.addEventListener("change",()=>{S=parseInt(v.value)});g.addEventListener("change",()=>{y=g.checked});const X=()=>{f&&(c.rotation[x]+=w*S)},Y=()=>{f=!1,h.checked=!1,c.rotation.set(0,0,0)},_=document.getElementById("resetRotation");_.addEventListener("click",Y);const A=()=>{G.forEach(t=>{const o=P();t.wireframe=o}),C.forEach(t=>{t.visible=E()}),k.forEach(t=>{t.visible=E()&&y}),X(),requestAnimationFrame(A),W()};A();q({title:"Scene Options",description:"These options are specified for this scene:",points:["Rotate: Start/Stop the rotation of the mesh.","Rotation Speed: Adjust the speed of rotation. Default is 0.01.","Rotation Axis: Change the axis of rotation, the shape will rotate around this axis.","Rotation Direction: Change the direction of rotation. Default is clockwise.","Show Face Labels: Show/Hide labels for each face. The global 'Show Labels' control option should be enabled.","Reset Rotation: Stop the rotation and reset the shape's rotation to the last state before rotation started."]});
//# sourceMappingURL=index-C2O3g4uk.js.map
