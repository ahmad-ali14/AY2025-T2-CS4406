import{B as j,V as C,F as E,c as se,f as O,g as k,D as U,M as J,P as ae}from"./createBaseScene-BkKOSq5h.js";import{c as H}from"./createTextSprite-BXz_AizA.js";class re extends j{constructor(t=(a,r,p)=>p.set(a,r,Math.cos(a)*Math.sin(r)),s=8,n=8){super(),this.type="ParametricGeometry",this.parameters={func:t,slices:s,stacks:n};const a=[],r=[],p=[],g=[],h=1e-5,b=new C,c=new C,l=new C,I=new C,L=new C,M=s+1;for(let u=0;u<=n;u++){const i=u/n;for(let F=0;F<=s;F++){const d=F/s;t(d,i,c),r.push(c.x,c.y,c.z),d-h>=0?(t(d-h,i,l),I.subVectors(c,l)):(t(d+h,i,l),I.subVectors(l,c)),i-h>=0?(t(d,i-h,l),L.subVectors(c,l)):(t(d,i+h,l),L.subVectors(l,c)),b.crossVectors(I,L).normalize(),p.push(b.x,b.y,b.z),g.push(d,i)}}for(let u=0;u<n;u++)for(let i=0;i<s;i++){const F=u*M+i,d=u*M+i+1,ne=(u+1)*M+i+1,V=(u+1)*M+i;a.push(F,d,V),a.push(d,ne,V)}this.setIndex(a),this.setAttribute("position",new E(r,3)),this.setAttribute("normal",new E(p,3)),this.setAttribute("uv",new E(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}let o=1,v=.01;const{camera:W,render:ie,scene:G,shouldShowWireframe:X,sidebar:ce,shouldShowLabels:le,renderer:R,directionalLight:m,canvas:$,addHelpNote:ue}=se({sceneTitle:"Unit 7: Function Graphing",cameraZ:o*15,cameraFov:90,defaultLightColor:"#fff",showAxes:!0,showGrid:!1,useAmbientLight:!0,usePointLight:!1,gridHelperSize:o*10,gridHelperDivisions:o*10*10,showWireframe:!1}),B={top:$.height/2,bottom:-$.height/2,left:-$.width/2,right:$.width/2},de=e=>new Function("x","y",`return ${e}`),pe=e=>(s,n,a)=>{const r=(s-.5)*2*o,p=(n-.5)*2*o,g=e(r,p);a.set(r,p,g)},P=e=>e*100,N=(e,t)=>Math.max(10,Math.floor(2*e/t)),me=new O(P(o),P(o),10,10),z=new k({color:"#84bbfa",side:U,wireframe:!1,opacity:.5}),f=new J(me,z);f.rotation.x=Math.PI/2;f.position.y=-o*5;G.add(f);const fe=new j,he=new k({side:U,flatShading:!1,wireframe:X(),vertexColors:!0}),y=new J(fe,he);G.add(y);const ve=e=>{const t=de(e);if(!o||!v){alert("Please set N and Increment values.");return}const s=new re(pe(t),N(o,v),N(o,v)),n=s.getAttribute("position").array,a=[];for(let r=0;r<n.length;r+=3){const p=n[r],g=n[r+1],h=n[r+2],b=(p+o)/(2*o),c=(g+o)/(2*o),l=(h+o)/(2*o);a.push(b,c,l)}s.setAttribute("color",new E(a,3)),y.geometry.dispose(),y.geometry=s,f.geometry=new O(P(o),P(o),10,10)};m.position.set(B.right,B.top,0);m.intensity=2;R.shadowMap.enabled=!0;R.shadowMap.type=ae;y.castShadow=!0;y.receiveShadow=!1;f.castShadow=!1;f.receiveShadow=!0;const S=2e3;m.castShadow=!0;m.shadow.camera.near=S*0;m.shadow.camera.far=S;m.shadow.camera.left=-S;m.shadow.camera.right=S;m.shadow.camera.top=S;m.shadow.camera.bottom=-S;const Z=[{name:"Hyperbolic Paraboloid",fn:"x ** 2 - y ** 2"},{name:"Parabola",fn:"x ** 2 + y ** 2"},{name:"Deep Parabola",fn:"3 * x ** 2 + 3 * y ** 2"},{name:"Cone",fn:"Math.sqrt(x ** 2 + y ** 2)"}];let x=!0,w=Z[0].fn;const q=document.createElement("div");q.classList.add("mb-4");q.innerHTML=`
   <hr class="border border-b-[#000] mb-2" />
    <h2 class="text-xl font-bold text-center mb-2">Scene Options</h2>
    <div class="flex flex-col space-y-2 text-lg">
        <div>
            <label for="selectFunction" class="font-bold">Select Function: </label>
                ${Z.map(e=>`<label class="flex flex-col py-1">
                                 <div>
                                    <input type="radio" name="selectFunction" 
                                         class="selectFunction"
                                         value="${e.fn}" 
                                         ${e.fn===w?"checked":""} 
                                    />
                                    <span>${e.name}</span> 
                                 </div>
                                 <div class="ml-5">
                                    <code class="block bg-gray-200 text-blue-600 font-mono text-sm p-2 rounded">
                                       z = ${e.fn}
                                    </code>
                                 </div>
                            </label>`).join("")}
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
            <input type="range" id="nInput" min="${.1}" max="3" step="0.1" value="${o}" />
        </div>
        <div class="flex items-center space-x-2">
            <span class="font-bold">Incr:</span>
            <input type="range" id="incrInput" min="${.01}" max="1" step="0.01" value="${v}" />
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
    `;ce.appendChild(q);const K=document.querySelectorAll(".selectFunction"),D=document.querySelector("#customFunction"),ge=document.querySelector("#plotFunction"),Q=document.querySelector("#nInput"),_=document.querySelector("#incrInput"),Y=document.querySelector("#groundColor"),ee=document.querySelector("#groundY");D.value=w;_.value=v.toString();Q.value=o.toString();Y.value="#"+z.color.getHexString().toString();ee.value=f.position.y.toString();K.forEach(e=>{e.addEventListener("change",t=>{const n=t.target.value;w=n,x=!0,D.value=n})});ge.addEventListener("click",()=>{w=D.value,x=!0,K.forEach(e=>{const t=e.getAttribute("value");e.checked=t===w})});Q.addEventListener("input",e=>{setTimeout(()=>{o=parseFloat(e.target.value),x=!0},1500)});_.addEventListener("input",e=>{v=parseFloat(e.target.value),x=!0});Y.addEventListener("input",e=>{const t=e.target.value;z.color.set(t)});ee.addEventListener("input",e=>{const t=parseFloat(e.target.value);f.position.y=t});W.position.set(o*4,o*4,o*4);W.lookAt(0,0,0);const T=3,A=e=>{const t=[],s=H(e.toUpperCase());s.position.set(0,0,0),s.position[e]=T+1,t.push(s);for(let n=0;n<=T;n++){const a=H(n.toString());a.position.set(0,0,0),a.position[e]=n,t.push(a)}return t},te=[...A("x"),...A("y"),...A("z")];te.forEach(e=>G.add(e));const oe=()=>{x&&(ve(w),x=!1),[y.material].forEach(t=>{t.wireframe=X()}),te.forEach(t=>{t.visible=le()}),requestAnimationFrame(oe),ie()};oe();ue({title:"Scene Options",description:"These options are specified for this scene:",points:["Select Function: Choose from the predefined functions to plot.","Custom Function: Enter a custom function to plot. Use Javascript notation.",`N: Set minX, maxX, minY, maxY values for the function. Default is ${o}.`,`Incr: Set the increment value for the loop. Default is ${v}.`,`Ground Color: Set the color of the ground plane. Default is ${Y.value}.`,`Ground Y: Set the Y position of the ground plane. Default is ${f.position.y}.`]});
//# sourceMappingURL=index-DPt-h2bd.js.map
