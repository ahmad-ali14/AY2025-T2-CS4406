import{c as K,P as x,e as p,T as L,g as C,M as m,h as v,i as G,f as d}from"./createBaseScene-BlpiD6vZ.js";const S="#ffffaa",{scene:b,render:A,shouldShowWireframe:D,canvas:s,renderer:y,directionalLight:a,camera:P}=K({sceneTitle:"Unit 3: Bouncing Torus Knot",cameraZ:1e3,showAxes:!1,showGrid:!1,showLabels:!1,showWireframe:!1,useOrbitControls:!1,useAmbientLight:!1,useDirectionalLight:!0,usePointLight:!1,defaultLightColor:S});y.shadowMap.enabled=!0;y.shadowMap.type=x;a.color=new p(S);const T=s.height/2,q=-s.width/2;a.position.set(q,T,1);a.visible=!0;a.intensity=P.position.z*1.5;a.castShadow=!0;a.lookAt(0,0,0);const e={radius:35,tube:10,tubularSegments:100,radialSegments:16,p:2,q:3},B=new L(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q),i=new C({color:16711935,wireframe:D()}),t=new m(B,i);t.position.set(0,0,0);t.castShadow=!0;t.receiveShadow=!1;b.add(t);let h=1,u=1,E=5,I=5,w=.01,f=1;const l=()=>{const o=d.randInt(0,255),n=d.randInt(0,255),r=d.randInt(0,255);return new p(`rgb(${o}, ${n}, ${r})`)},W=new v(window.innerWidth,window.innerHeight,32,32),$=new G({color:16777215}),c=new m(W,$);c.receiveShadow=!0;c.castShadow=!1;c.position.set(0,0,1);b.add(c);const M=()=>{const o=2*(e.radius+e.tube),n={top:-(s.height/2-o),bottom:s.height/2-o,left:-(s.width/2-o),right:s.width/2-o},r=t.position.x,g=t.position.y;r>=n.right&&(h=-1,i.color=l()),r<=n.left&&(h=1,i.color=l()),g>=n.bottom&&(u=-1,i.color=l()),g<=n.top&&(u=1,i.color=l()),t.rotation.x+=w*f,t.rotation.y+=w*f,t.rotation.z+=w*f,t.position.x+=E*h,t.position.y+=I*u,A(),requestAnimationFrame(M)};M();
//# sourceMappingURL=index-rM0Of8y-.js.map
