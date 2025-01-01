import{c as A,B,a as D,M,V as I,b as z,C as O,D as V,N as T,d as N}from"./createBaseScene-BkKOSq5h.js";import{c as G}from"./createTextSprite-BXz_AizA.js";const{scene:H,render:U,addHelpNote:$,shouldShowWireframe:j,shouldShowLabels:R,sidebar:W}=A({sceneTitle:"Unit 2: Polygon with 5 vertices",cameraZ:20}),e=new B,n=new Float32Array([0,5,0,4.8,1.5,0,3,-4,0,-3,-4,0,-4.8,1.5,0,0,5,5,4.8,1.5,5,3,-4,5,-3,-4,5,-4.8,1.5,5]),c=[0,1,2,0,2,3,0,3,4,5,6,7,5,7,8,5,8,9,0,5,1,1,6,2,6,7,2,2,7,3,7,8,3,3,8,4,8,9,4,4,9,0,9,5,0,1,5,6,3,4,8,2,3,8,2,8,7];e.setAttribute("position",new D(n,3));e.setIndex(c);e.computeVertexNormals();e.addGroup(0,3,0);e.addGroup(3,3,1);e.addGroup(6,3,2);e.addGroup(9,3,3);e.addGroup(12,3,4);e.addGroup(15,3,0);e.addGroup(18,3,1);e.addGroup(21,3,2);e.addGroup(24,3,3);e.addGroup(27,3,4);e.addGroup(30,3,0);e.addGroup(33,3,1);e.addGroup(36,3,2);e.addGroup(39,3,3);e.addGroup(42,3,4);e.addGroup(45,3,0);const q=()=>{const t=N.randInt(200,255);return new O(`rgb(${t}, 0, 0)`)},P={polygonOffset:!0,polygonOffsetUnits:1,polygonOffsetFactor:1,side:V,flatShading:!1,blending:T,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",wireframeLinewidth:500,color:"rgb(255, 0, 0)"},o=()=>new z({...P,color:q()}),E=[o(),o(),o(),o(),o(),o(),o(),o(),o(),o()],d=new M(e,E);H.add(d);const Z=n.length/3,k=[];for(let t=0;t<Z;t++){const a=n[t*3]||0,i=n[t*3+1]||0,L=n[t*3+2]||0,s=G(`V${t}`);s.position.set(a,i,L),s.visible=!1,d.add(s),k.push(s)}const C=[];for(let t=0;t<e.groups.length;t++){const a=e.groups[t];if(!a)continue;const i=G(`F${t}`),s=[c[a.start],c[a.start+1],c[a.start+2]].reduce((r,l)=>(l===void 0||(r.x+=n[l*3]||0,r.y+=n[l*3+1]||0,r.z+=n[l*3+2]||0),r),{x:0,y:0,z:0}),h=new I(s.x/3,s.y/3,s.z/3);i.position.set(h.x,h.y,h.z),i.visible=!1,d.add(i),C.push(i)}let u=!0,g=.01,w="y",x=1,S=!1;const y=document.createElement("div");y.classList.add("mb-4");y.innerHTML=`
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
    `;W.appendChild(y);const p=document.getElementById("rotate"),f=document.getElementById("rotationSpeed"),b=document.getElementById("rotationAxis"),m=document.getElementById("rotationDirection"),v=document.getElementById("showFacesLabels");p.checked=u;f.value=g.toString();b.value=w;m.value=x.toString();v.checked=S;p.addEventListener("change",()=>{u=p.checked});f.addEventListener("input",()=>{g=parseFloat(f.value)});b.addEventListener("change",()=>{w=b.value});m.addEventListener("change",()=>{x=parseInt(m.value)});v.addEventListener("change",()=>{S=v.checked});const J=()=>{u&&(d.rotation[w]+=g*x)},K=()=>{u=!1,p.checked=!1,d.rotation.set(0,0,0)},Q=document.getElementById("resetRotation");Q.addEventListener("click",K);const F=()=>{E.forEach(t=>{const a=j();t.wireframe=a}),k.forEach(t=>{t.visible=R()}),C.forEach(t=>{t.visible=R()&&S}),J(),requestAnimationFrame(F),U()};F();$({title:"Scene Options",description:"These options are specified for this scene:",points:["Rotate: Start/Stop the rotation of the mesh.","Rotation Speed: Adjust the speed of rotation. Default is 0.01.","Rotation Axis: Change the axis of rotation, the shape will rotate around this axis.","Rotation Direction: Change the direction of rotation. Default is clockwise.","Show Face Labels: Show/Hide labels for each face. The global 'Show Labels' control option should be enabled.","Reset Rotation: Stop the rotation and reset the shape's rotation to the last state before rotation started."]});
//# sourceMappingURL=index-CSeuF5JQ.js.map
