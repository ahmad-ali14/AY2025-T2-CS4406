import{c as x,S as w,i as f,g,M as b,P as E}from"./createBaseScene-BkKOSq5h.js";const _=["https://upload.wikimedia.org/wikipedia/commons/c/cf/WorldMap-A_non-Frame.png","https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/300px-The_Earth_seen_from_Apollo_17.jpg"],L=["https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png","https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/280px-FullMoon2010.jpg"],{render:D,scene:C,directionalLight:t,renderer:S,canvas:r,shouldShowWireframe:l,sidebar:F,addHelpNote:A,ambientLight:R}=x({sceneTitle:"Unit 6: Earth and Moon",cameraZ:window.innerHeight/3,cameraFov:90,defaultLightColor:"#fdfbd3",showAxes:!1,showGrid:!1,useAmbientLight:!0,usePointLight:!1}),e=100,I={top:r.height/2,bottom:-r.height/2,left:-r.width/2,right:r.width/2},T=new w(e,32,32),j=new f().load(_[0]),v=new g({wireframe:l(),map:j}),a=new b(T,v),B=new w(e/3,32,32),G=new f().load(L[0]),M=new g({wireframe:l(),map:G}),o=new b(B,M);o.position.x=e*2;C.add(a,o);const H=()=>{a.rotation.y+=e/1e4},O=()=>{o.rotation.y+=e/1e4},P=(i=1)=>{o.position.x=e*2*Math.cos(a.rotation.y*i),o.position.z=e*2*Math.sin(a.rotation.y*i)};t.position.set(I.right,0,0);t.intensity=2;R.intensity=e/9500;S.shadowMap.enabled=!0;S.shadowMap.type=E;a.castShadow=!0;a.receiveShadow=!0;o.castShadow=!0;o.receiveShadow=!0;const n=20;t.castShadow=!0;t.shadow.camera.near=e*n*0;t.shadow.camera.far=e*n;t.shadow.camera.left=-e*n;t.shadow.camera.right=e*n;t.shadow.camera.top=e*n;t.shadow.camera.bottom=-e*n;const U=[v,M],h=document.createElement("div");h.classList.add("mb-4");h.innerHTML=`
    <hr class="border border-b-[#000] mb-2" />
    <h2 class="text-xl font-bold text-center mb-2">Scene Options</h2>
    <div class="flex flex-col space-y-2 text-lg">
        <div>
            <input type="checkbox" id="rotate" checked>
            <label for="rotate" class="font-bold">Rotate</label>
        </div>
        <div>
            <label for="rotationSpeed" class="font-bold">Rotation Speed</label>
            <input type="range" id="rotationSpeed" min="0" max="3" step="0.01" value="0.01">
        </div>
        <div class="">
            <label for="rotationDirection" class="font-bold">Rotation Direction</label>
            <select id="rotationDirection">
                <option value="1">Clockwise</option>
                <option value="-1">Counter Clockwise</option>
            </select>
        </div>
       
    </div>
    `;F.appendChild(h);let p=!0,m=1,u=-1;const s=document.getElementById("rotate"),d=document.getElementById("rotationSpeed"),c=document.getElementById("rotationDirection");s.checked=p;d.value=m.toString();c.value=u.toString();s.addEventListener("change",()=>{p=s.checked});d.addEventListener("input",()=>{m=parseFloat(d.value)});c.addEventListener("change",()=>{u=parseFloat(c.value)});const k=()=>{requestAnimationFrame(k),H(),O();const i=u*m;p&&P(i),D(),U.forEach(y=>{y.wireframe=l()})};k();A({title:"Scene Options",description:"These options are specified for this scene:",points:["Rotate: Start/Stop the moon rotating around the earth.","Rotation Speed: Adjust the speed of rotation. Default is 1.","Rotation Direction: Change the direction of rotation. Default is counter clockwise."]});
//# sourceMappingURL=index-C88ymzvR.js.map
