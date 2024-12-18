import{c as se,S as Z,g as y,C as s,M as o,j as ie,f as re,D as ce,G as de,P as le,V as W}from"./createBaseScene-D_eU-rKm.js";import{c as r}from"./createTextSprite-CHsQQFA1.js";const{render:he,scene:pe,directionalLight:t,renderer:J,canvas:K,camera:Q,shouldShowLabels:be,shouldShowWireframe:we,sidebar:ue,addHelpNote:me}=se({sceneTitle:"Unit 5: Methane Molecule",cameraZ:window.innerHeight*20,cameraFov:90,defaultLightColor:"#ffffff",showAxes:!1,showGrid:!1}),c=200,D=c/2,X=c/6,fe=new Z(D,32,32),Y=new y({color:s.NAMES.red}),a=new o(fe,Y),A=new Z(X,32,32),d=new y({color:s.NAMES.blue}),l=new o(A,d),h=new o(A,d),p=new o(A,d),b=new o(A,d),x=new ie(10,10,c,32),w=new y({color:s.NAMES.white}),u=new o(x,w),m=new o(x,w),f=new o(x,w),S=new o(x,w),M=[100,100,1],I=r("C",{scale:[200,200,1]}),P=r("H1",{scale:M}),N=r("H2",{scale:M}),F=r("H3",{scale:M}),O=r("H4",{scale:M}),e=c,n={carbon:[e*0,e*1.25,e*0],h1:[e*1.125,e*1,e*0],h2:[e*-1.125,e*1,e*0],h3:[e*0,e*1,e*1],h4:[e*0,e*1.625,e*-1]},R={bond1:[e*.625,e*1.125,e*0],bond2:[e*-.625,e*1.125,e*0],bond3:[e*0,e*1.25,e*.5],bond4:[e*0,e*1.25,e*-.5]};a.position.set(...n.carbon);l.position.set(...n.h1);h.position.set(...n.h2);p.position.set(...n.h3);b.position.set(...n.h4);I.position.set(...n.carbon);P.position.set(...n.h1);N.position.set(...n.h2);F.position.set(...n.h3);O.position.set(...n.h4);u.position.set(...R.bond1);m.position.set(...R.bond2);f.position.set(...R.bond3);S.position.set(...R.bond4);const Se=new re(100*1e3,100*1e3),$=new y({color:s.NAMES.black,side:ce}),v=new o(Se,$);v.rotation.x=Math.PI/2;v.position.y=-c*1.7;const E=new de;E.add(a,l,h,p,b,u,m,f,S,I,P,N,F,O);pe.add(E,v);J.shadowMap.enabled=!0;J.shadowMap.type=le;t.color=new s(s.NAMES.green);const ve=K.height/2,ge=-K.width/2;t.position.set(ge*1.5,ve*2,-100);t.visible=!0;t.intensity=100;t.castShadow=!0;v.receiveShadow=!0;v.castShadow=!1;a.castShadow=!0;l.castShadow=!0;h.castShadow=!0;p.castShadow=!0;b.castShadow=!0;u.castShadow=!0;m.castShadow=!0;f.castShadow=!0;S.castShadow=!0;a.receiveShadow=!1;l.receiveShadow=!1;h.receiveShadow=!1;p.receiveShadow=!1;b.receiveShadow=!1;u.receiveShadow=!1;m.receiveShadow=!1;f.receiveShadow=!1;S.receiveShadow=!1;t.shadow.camera.near=1;t.shadow.camera.far=5e3;t.shadow.camera.left=-1e3;t.shadow.camera.right=1e3;t.shadow.camera.top=1e3;t.shadow.camera.bottom=-1e3;Q.position.set(300,1e3,200);Q.lookAt(a.position);const C=i=>{const{bond:_,carbon:te,hydrogen:oe}=i,k=te.position,q=oe.position,U=new W().subVectors(q,k).normalize(),ne=k.distanceTo(q)-(D+X),ae=D+ne/2;_.position.copy(k).add(U.clone().multiplyScalar(ae)),_.quaternion.setFromUnitVectors(new W(0,1,0),U)};C({bond:u,carbon:a,hydrogen:l});C({bond:m,carbon:a,hydrogen:h});C({bond:f,carbon:a,hydrogen:p});C({bond:S,carbon:a,hydrogen:b});let L=!0,T=.01,V="y",j=1;const z=document.createElement("div");z.classList.add("mb-4");z.innerHTML=`
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
            <button id="resetRotation" class="bg-blue-500 text-white p-2 rounded-md text-sm">Reset Rotation</button>
        </div>
    </div>
    `;ue.appendChild(z);const g=document.getElementById("rotate"),G=document.getElementById("rotationSpeed"),H=document.getElementById("rotationAxis"),B=document.getElementById("rotationDirection");g.checked=L;G.value=T.toString();H.value=V;B.value=j.toString();g.addEventListener("change",()=>{L=g.checked});G.addEventListener("input",()=>{T=parseFloat(G.value)});H.addEventListener("change",()=>{V=H.value});B.addEventListener("change",()=>{j=parseInt(B.value)});const ye=()=>{L&&(E.rotation[V]+=T*j)},Ae=()=>{L=!1,g.checked=!1,E.rotation.set(0,0,0)},xe=document.getElementById("resetRotation");xe.addEventListener("click",Ae);const Me=[I,P,N,F,O],Re=[Y,d,w,$],ee=()=>{requestAnimationFrame(ee),ye(),Me.forEach(i=>{i.visible=be()}),Re.forEach(i=>{i.wireframe=we()}),he()};ee();me({title:"Scene Options",description:"These options are specified for this scene:",points:["Rotate: Start/Stop the rotation of the mesh.","Rotation Speed: Adjust the speed of rotation. Default is 0.01.","Rotation Axis: Change the axis of rotation, the shape will rotate around this axis.","Rotation Direction: Change the direction of rotation. Default is clockwise.","Reset Rotation: Stop the rotation and reset the shape's rotation to the last state before rotation started."]});
//# sourceMappingURL=index-DFn4kf5v.js.map
