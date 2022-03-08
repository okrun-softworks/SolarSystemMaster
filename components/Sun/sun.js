let scene, camera, renderer, light;
var controls;

clock = new THREE.Clock();

// import * as LensflareJs from 'src/Lensflare.js';

init();
animate();

function init() {
  // create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  // create camera
  camera = new THREE.PerspectiveCamera(
    7,
    window.innerWidth / window.innerHeight,
    5,
    20000000000
    );
  
  //camera position
  camera.position.x += 0;
  camera.position.y += 0;
  camera.position.z += 250;
      
  // object rotate function
  function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  
    object.rotateX(THREE.Math.degToRad(degreeX));
    object.rotateY(THREE.Math.degToRad(degreeY));
    object.rotateZ(THREE.Math.degToRad(degreeZ));
  
  }
  
  // texture loader
  const textureLoader = new THREE.TextureLoader();
  
  // starfield and milkyway
  var starFieldDistance = 22000000;    
  var star = new THREE.Geometry();
  
    for (var i = 0; i < 70; i++) {
    
      var starFieldVertex = new THREE.Vector3();

      var starFieldTheta = THREE.Math.randFloatSpread(360); 
      var starFieldPhi = THREE.Math.randFloatSpread(360);

      starFieldVertex.x = starFieldDistance * Math.sin(starFieldTheta) * Math.cos(starFieldPhi);
      starFieldVertex.y = starFieldDistance * Math.sin(starFieldTheta) * Math.sin(starFieldPhi);
      starFieldVertex.z = starFieldDistance * Math.cos(starFieldTheta);

      star.vertices.push(starFieldVertex);
    
    }
 
  var particles = new THREE.Points(star, 
    new THREE.PointsMaterial({color: 0xffffff}));

  particles.boundingSphere = 50;

  scene.add(particles);

  //MilkyWayBox
  var milkyWayBoxDistance = 186000000;    
  var milkyWayBox = new THREE.Geometry();
  
    for (var i = 0; i < 100000; i++) {
    
      var milkyWayBoxVertex = new THREE.Vector3();

      var milkyWayBoxTheta = THREE.Math.randFloatSpread(360); 
      var milkyWayBoxPhi = THREE.Math.randFloatSpread(360);

      milkyWayBoxVertex.x = (milkyWayBoxDistance * Math.sin(milkyWayBoxTheta) * Math.cos(milkyWayBoxPhi));
      milkyWayBoxVertex.y = milkyWayBoxDistance * Math.sin(milkyWayBoxTheta) * Math.sin(milkyWayBoxPhi) / 6;
      milkyWayBoxVertex.z = milkyWayBoxDistance * Math.cos(milkyWayBoxTheta) - 250000;

      milkyWayBox.vertices.push(milkyWayBoxVertex);
    
    }
  
  var milkyWayBoxParticles = new THREE.Points(milkyWayBox, 
    new THREE.PointsMaterial({color: 0x7E6F89}));

  milkyWayBoxParticles.boundingSphere = 50;

  scene.add(milkyWayBoxParticles); 

  //MilkyWayBox Blue Variables
  var milkyWayBoxVarBgDistance = 186000000;    
  var milkyWayBoxVarBg = new THREE.Geometry();
  
    for (var i = 0; i < 1000; i++) {
    
      var milkyWayBoxVarBgVertex = new THREE.Vector3();

      var milkyWayBoxVarBgTheta = THREE.Math.randFloatSpread(360); 
      var milkyWayBoxVarBgPhi = THREE.Math.randFloatSpread(360);

      milkyWayBoxVarBgVertex.x = (milkyWayBoxVarBgDistance * Math.sin(milkyWayBoxVarBgTheta) * Math.cos(milkyWayBoxVarBgPhi));
      milkyWayBoxVarBgVertex.y = milkyWayBoxVarBgDistance * Math.sin(milkyWayBoxVarBgTheta) * Math.sin(milkyWayBoxVarBgPhi) / 6;
      milkyWayBoxVarBgVertex.z = milkyWayBoxVarBgDistance * Math.cos(milkyWayBoxVarBgTheta) - 250000;

      milkyWayBoxVarBg.vertices.push(milkyWayBoxVarBgVertex);
    
    }
  
  var milkyWayBoxVarBgParticles = new THREE.Points(milkyWayBoxVarBg, 
    new THREE.PointsMaterial({color: 0x537AC5}));

  milkyWayBoxVarBgParticles.boundingSphere = 50;

  scene.add(milkyWayBoxVarBgParticles); 

    //MilkyWayBox Red Variables
  var milkyWayBoxVarSgDistance = 186000000;    
  var milkyWayBoxVarSg = new THREE.Geometry();
  
    for (var i = 0; i < 100; i++) {
    
      var milkyWayBoxVarSgVertex = new THREE.Vector3();

      var milkyWayBoxVarSgTheta = THREE.Math.randFloatSpread(360); 
      var milkyWayBoxVarSgPhi = THREE.Math.randFloatSpread(360);

      milkyWayBoxVarSgVertex.x = (milkyWayBoxVarSgDistance * Math.sin(milkyWayBoxVarSgTheta) * Math.cos(milkyWayBoxVarSgPhi));
      milkyWayBoxVarSgVertex.y = milkyWayBoxVarSgDistance * Math.sin(milkyWayBoxVarSgTheta) * Math.sin(milkyWayBoxVarSgPhi) / 6;
      milkyWayBoxVarSgVertex.z = milkyWayBoxVarSgDistance * Math.cos(milkyWayBoxVarSgTheta) - 250000;

      milkyWayBoxVarSg.vertices.push(milkyWayBoxVarSgVertex);
    
    }
  
  var milkyWayBoxVarSgParticles = new THREE.Points(milkyWayBoxVarSg, 
    new THREE.PointsMaterial({color: 0xA50C0C}));

  milkyWayBoxVarSgParticles.boundingSphere = 50;

  scene.add(milkyWayBoxVarSgParticles); 

  //MilkyWayBoxMotion-0Y
  var milkyWayBoxMotion0YDistance = 186000000;    
  var milkyWayBoxMotion0Y = new THREE.Geometry();
    
    for (var i = 0; i < 100; i++) {
    
      var milkyWayBoxMotion0YVertex = new THREE.Vector3();

      var milkyWayBoxMotion0YTheta = THREE.Math.randFloatSpread(360); 
      var milkyWayBoxMotion0YPhi = THREE.Math.randFloatSpread(360);

      milkyWayBoxMotion0YVertex.x = (milkyWayBoxMotion0YDistance * Math.sin(milkyWayBoxMotion0YTheta) * Math.cos(milkyWayBoxMotion0YPhi));
      milkyWayBoxMotion0YVertex.y = milkyWayBoxMotion0YDistance * Math.sin(milkyWayBoxMotion0YTheta) * Math.sin(milkyWayBoxMotion0YPhi) / 6;
      milkyWayBoxMotion0YVertex.z = milkyWayBoxMotion0YDistance * Math.cos(milkyWayBoxMotion0YTheta) - 250000;

      milkyWayBoxMotion0Y.vertices.push(milkyWayBoxMotion0YVertex);
    
    }
    
  var milkyWayBoxMotion0YParticles = new THREE.Points(milkyWayBoxMotion0Y, 
    new THREE.PointsMaterial({color: 0xffffff}));
    
  milkyWayBoxMotion0YParticles.boundingSphere = 50;

  //milkyWayBoxMotion-1Z
  var milkyWayBoxMotion1ZDistance = 186000000;    
  var milkyWayBoxMotion1Z = new THREE.Geometry();
    
    for (var i = 0; i < 100; i++) {
    
      var milkyWayBoxMotion1ZVertex = new THREE.Vector3();

      var milkyWayBoxMotion1ZTheta = THREE.Math.randFloatSpread(360); 
      var milkyWayBoxMotion1ZPhi = THREE.Math.randFloatSpread(360);

      milkyWayBoxMotion1ZVertex.x = (milkyWayBoxMotion1ZDistance * Math.sin(milkyWayBoxMotion1ZTheta) * Math.cos(milkyWayBoxMotion1ZPhi));
      milkyWayBoxMotion1ZVertex.y = milkyWayBoxMotion1ZDistance * Math.sin(milkyWayBoxMotion1ZTheta) * Math.sin(milkyWayBoxMotion1ZPhi) / 6;
      milkyWayBoxMotion1ZVertex.z = milkyWayBoxMotion1ZDistance * Math.cos(milkyWayBoxMotion1ZTheta) - 250000;

      milkyWayBoxMotion1Z.vertices.push(milkyWayBoxMotion1ZVertex);
    
    }

  var milkyWayBoxMotion1ZParticles = new THREE.Points(milkyWayBoxMotion1Z, 
    new THREE.PointsMaterial({color: 0xffffff}));

  milkyWayBoxMotion1ZParticles.boundingSphere = 50;

  //MilkyWay
  var milkyWayDistance = 186000000;    
  var milkyWay = new THREE.Geometry();
  
    for (var i = 0; i < 5000; i++) {
    
      var milkyWayVertex = new THREE.Vector3();

      var milkyWayTheta = THREE.Math.randFloatSpread(6.1); 
      var milkyWayPhi = THREE.Math.randFloatSpread(0.1);

      milkyWayVertex.x = (milkyWayDistance * Math.sin(milkyWayTheta) * Math.cos(milkyWayPhi)) / 1.2;
      milkyWayVertex.y = milkyWayDistance * Math.sin(milkyWayTheta) * Math.sin(milkyWayPhi) / 6;
      milkyWayVertex.z = milkyWayDistance * Math.cos(milkyWayTheta) - 250000;

      milkyWay.vertices.push(milkyWayVertex);
    
    }
  
  var milkyWayParticles = new THREE.Points(milkyWay, 
    new THREE.PointsMaterial({color: 0xC5C0D5}));

  milkyWayParticles.boundingSphere = 50;

  scene.add(milkyWayParticles);

  //MilkyWayArm1 Left
  var milkyWayArm1Distance = 186000000;    
  var milkyWayArm1 = new THREE.Geometry();
  
    for (var i = 0; i < 4000; i++) {
    
      var milkyWayArm1Vertex = new THREE.Vector3();

      var milkyWayArm1Theta = THREE.Math.randFloatSpread(6.2); 
      var milkyWayArm1Phi = THREE.Math.randFloatSpread(0.1);

      milkyWayArm1Vertex.x = (milkyWayArm1Distance * Math.sin(milkyWayArm1Theta) * Math.cos(milkyWayArm1Phi))/ 1.2;
      milkyWayArm1Vertex.y = milkyWayArm1Distance * Math.sin(milkyWayArm1Theta) * Math.sin(milkyWayArm1Phi) / 2;
      milkyWayArm1Vertex.z = milkyWayArm1Distance * Math.cos(milkyWayArm1Theta) - 250000;

      milkyWayArm1.vertices.push(milkyWayArm1Vertex);
    
    }
 
  var milkyWayArm1Particles = new THREE.Points(milkyWayArm1, 
    new THREE.PointsMaterial({color: 0xffffff}));

  milkyWayArm1Particles.boundingSphere = 50;

  scene.add(milkyWayArm1Particles);
  milkyWayArm1Particles.position.set(-60000000, 200000, 18000000);
  milkyWayArm1Particles.rotation.y = 0.45;

  
  //MilkyWayArm2 Right
  var milkyWayArm2Distance = 186000000;    
  var milkyWayArm2 = new THREE.Geometry();

    for (var i = 0; i < 4000; i++) {
    
      var milkyWayArm2Vertex = new THREE.Vector3();

      var milkyWayArm2Theta = THREE.Math.randFloatSpread(6.2); 
      var milkyWayArm2Phi = THREE.Math.randFloatSpread(0.1);

      milkyWayArm2Vertex.x = (milkyWayArm2Distance * Math.sin(milkyWayArm2Theta) * Math.cos(milkyWayArm2Phi)) / 1.2;
      milkyWayArm2Vertex.y = milkyWayArm2Distance * Math.sin(milkyWayArm2Theta) * Math.sin(milkyWayArm2Phi) / 2;
      milkyWayArm2Vertex.z = milkyWayArm2Distance * Math.cos(milkyWayArm2Theta) - 250000;

      milkyWayArm2.vertices.push(milkyWayArm2Vertex);
    
    }
 
  var milkyWayArm2Particles = new THREE.Points(milkyWayArm2, 
    new THREE.PointsMaterial({color: 0xB3AFCB}));

  milkyWayArm2Particles.boundingSphere = 50;

  scene.add(milkyWayArm2Particles);
  milkyWayArm2Particles.position.set(60000000, 200000, 18000000);
  milkyWayArm2Particles.rotation.y = -0.45;

  //MilkyWayCore
  var milkyWayCoreDistance = 186000000;    
  var milkyWayCore = new THREE.Geometry();
  
    for (var i = 0; i < 2500; i++) {
    
      var milkyWayCoreVertex = new THREE.Vector3();

      var milkyWayCoreTheta = THREE.Math.randFloatSpread(1.4); 
      var milkyWayCorePhi = THREE.Math.randFloatSpread(0.3);

      milkyWayCoreVertex.x = (milkyWayCoreDistance * Math.sin(milkyWayCoreTheta) * Math.cos(milkyWayCorePhi)) / 1.2;
      milkyWayCoreVertex.y = milkyWayCoreDistance * Math.sin(milkyWayCoreTheta) * Math.sin(milkyWayCorePhi) / 6;
      milkyWayCoreVertex.z = milkyWayCoreDistance * Math.cos(milkyWayCoreTheta);

      milkyWayCore.vertices.push(milkyWayCoreVertex);
    
    }

  var milkyWayCoreParticles = new THREE.Points(milkyWayCore, 
    new THREE.PointsMaterial({color: 0xB3AFCB}));

  milkyWayCoreParticles.boundingSphere = 50;

  scene.add(milkyWayCoreParticles);
  milkyWayCoreParticles.position.set (0, 0, 6000000);
  milkyWayCoreParticles.rotation.y = 0;

  //MilkyWayCoreOuter
  var milkyWayCoreOuterDistance = 30000000;    
  var milkyWayCoreOuter = new THREE.Geometry();
  
    for (var i = 0; i < 2500; i++) {
  
      var milkyWayCoreOuterVertex = new THREE.Vector3();

      var milkyWayCoreOuterTheta = THREE.Math.randFloatSpread(6.3); 
      var milkyWayCoreOuterPhi = THREE.Math.randFloatSpread(2.6);

      milkyWayCoreOuterVertex.x = (milkyWayCoreOuterDistance * Math.sin(milkyWayCoreOuterTheta) * Math.cos(milkyWayCoreOuterPhi));
      milkyWayCoreOuterVertex.y = milkyWayCoreOuterDistance * Math.sin(milkyWayCoreOuterTheta) * Math.sin(milkyWayCoreOuterPhi) / 16;
      milkyWayCoreOuterVertex.z = milkyWayCoreOuterDistance * Math.cos(milkyWayCoreOuterTheta) / 8;

      milkyWayCoreOuter.vertices.push(milkyWayCoreOuterVertex);
  
    }
 
  var milkyWayCoreOuterParticles = new THREE.Points(milkyWayCoreOuter, 
    new THREE.PointsMaterial({color: 0x7E6F89}));

  milkyWayCoreOuterParticles.boundingSphere = 50;

  scene.add(milkyWayCoreOuterParticles);
  milkyWayCoreOuterParticles.position.set (0, 200000, 190000000);
  milkyWayCoreOuterParticles.rotation.y = 0;

  //EventHorizonFog
  var eventHorizonFogDistance = 70000000;    
  var eventHorizonFog = new THREE.Geometry();
 
    for (var i = 0; i < 3800; i++) {
  
      var eventHorizonFogVertex = new THREE.Vector3();

      var eventHorizonFogTheta = THREE.Math.randFloatSpread(0.4); 
      var eventHorizonFogPhi = THREE.Math.randFloatSpread(2.9);

      eventHorizonFogVertex.x = (eventHorizonFogDistance * Math.sin(eventHorizonFogTheta) * Math.cos(eventHorizonFogPhi));
      eventHorizonFogVertex.y = eventHorizonFogDistance * Math.sin(eventHorizonFogTheta) * Math.sin(eventHorizonFogPhi) / 7;
      eventHorizonFogVertex.z = eventHorizonFogDistance * Math.cos(eventHorizonFogTheta);

      eventHorizonFog.vertices.push(eventHorizonFogVertex);
  
    }
  
  var eventHorizonFogParticles = new THREE.Points(eventHorizonFog, 
  new THREE.PointsMaterial({color: 0x8D7078}));

  eventHorizonFogParticles.boundingSphere = 50;
 
  scene.add(eventHorizonFogParticles);
  eventHorizonFogParticles.position.set (0, 200000, 125000000);
  eventHorizonFogParticles.rotation.y = 0;

  // EventHorizonHalo
  var eventHorizonHaloDistance = 2500000;    
  var eventHorizonHalo = new THREE.Geometry();
 
    for (var i = 0; i < 1400; i++) {
  
      var eventHorizonHaloVertex = new THREE.Vector3();

      var eventHorizonHaloTheta = THREE.Math.randFloatSpread(360); 
      var eventHorizonHaloPhi = THREE.Math.randFloatSpread(360);

      eventHorizonHaloVertex.x = (eventHorizonHaloDistance * Math.sin(eventHorizonHaloTheta) * Math.cos(eventHorizonHaloPhi));
      eventHorizonHaloVertex.y = eventHorizonHaloDistance * Math.sin(eventHorizonHaloTheta) * Math.sin(eventHorizonHaloPhi) / 2;
      eventHorizonHaloVertex.z = eventHorizonHaloDistance * Math.cos(eventHorizonHaloTheta);

      eventHorizonHalo.vertices.push(eventHorizonHaloVertex);
  
    }
   
  var eventHorizonHaloParticles = new THREE.Points(eventHorizonHalo, 
    new THREE.PointsMaterial({color: 0x62667B}));

  eventHorizonHaloParticles.boundingSphere = 50;

  scene.add(eventHorizonHaloParticles);
  eventHorizonHaloParticles.position.set (0, 200, 197000000);
  eventHorizonHaloParticles.rotation.y = 0;

  // EventHorizon
  var eventHorizonDistance = 2900000;    
  var eventHorizon = new THREE.Geometry();
 
    for (var i = 0; i < 1000; i++) {
  
      var eventHorizonVertex = new THREE.Vector3();

      var eventHorizonTheta = THREE.Math.randFloatSpread(360); 
      var eventHorizonPhi = THREE.Math.randFloatSpread(360);

      eventHorizonVertex.x = (eventHorizonDistance * Math.sin(eventHorizonTheta) * Math.cos(eventHorizonPhi)) / 2.3;
      eventHorizonVertex.y = eventHorizonDistance * Math.sin(eventHorizonTheta) * Math.sin(eventHorizonPhi) / 24;
      eventHorizonVertex.z = eventHorizonDistance * Math.cos(eventHorizonTheta);

      eventHorizon.vertices.push(eventHorizonVertex);
  
    }
  
  var eventHorizonParticles = new THREE.Points(eventHorizon, 
  new THREE.PointsMaterial({color: 0xBAB6D1}));

  eventHorizonParticles.boundingSphere = 50;
 
  scene.add(eventHorizonParticles);
  eventHorizonParticles.position.set (0, 20, 195000000);

  // PLANETS AND ORBITAL BODIES

  // sunCore0
  const sunCore0Geo = new THREE.SphereGeometry(2, 30, 30, 6);
  const sunCore0Mat = new THREE.MeshBasicMaterial({  
  
    map: textureLoader.load("../../resources/wrappers/sunTexture.png",
  
    function (sunCore0Mat) {
      sunCore0Mat.wrapS = sunCore0Mat.wrapT = THREE.RepeatWrapping;
      sunCore0Mat.offset.set( 0, 0 );
      sunCore0Mat.repeat.set( 1, 1 );
  
    }),
  
  });
  
  sunCore0 = new THREE.Mesh(sunCore0Geo, sunCore0Mat);
  sunCore0.material.transparent = true;
  sunCore0.material.opacity = 1;
  sunCore0.position.set(0, 0, 0);
  sunCore0.rotation.x = Math.PI * 0.002;
  scene.add(sunCore0);

  // sunCore1
  const sunCore1Geo = new THREE.SphereGeometry(2.5, 30, 30, 6);
  const sunCore1Mat = new THREE.MeshBasicMaterial({
  
    map: textureLoader.load("../../resources/wrappers/sunTexture.png",
  
    function (sunCore1Mat) {
      sunCore1Mat.wrapS = sunCore1Mat.wrapT = THREE.RepeatWrapping;
      sunCore1Mat.offset.set( 0, 0 );
      sunCore1Mat.repeat.set( 1, 1 );
  
    }),
  
  });
  
  sunCore1 = new THREE.Mesh(sunCore1Geo, sunCore1Mat);
  sunCore1.material.transparent = true;
  sunCore1.material.opacity = 1;
  sunCore1.position.set(0, 0, 0);
  sunCore1.rotation.x = Math.PI * 0.002;
  scene.add(sunCore1);

  // sun
  const sunGeo = new THREE.SphereGeometry(6.96342, 30, 30, 6);
  const sunMat = new THREE.MeshBasicMaterial({ 
  
    map: textureLoader.load("../../resources/wrappers/sunBaseTexture.png",
  
    function (sunMat) {
      sunMat.wrapS = sunMat.wrapT = THREE.RepeatWrapping;
      sunMat.offset.set( 0, 0 );
      sunMat.repeat.set( 1, 1 );
  
    }),
  
  });
  
  sun = new THREE.Mesh(sunGeo, sunMat);
  sun.material.transparent = true;
  sun.material.opacity = 1;
  sun.position.set(0, 0, 0);
  sun.rotation.x = Math.PI * 0.002;
  sun.castShadow = false;
  sun.receiveShadow = false;
  scene.add(sun);

  // sun halo
  const sunHaloGeo = new THREE.SphereGeometry(7.06, 64, 64, 3);
  const sunHaloMat = new THREE.MeshBasicMaterial({ 
  
    map: textureLoader.load("../../resources/wrappers/sunBaseTexture.png",
  
    function (sunHaloMat) {
      sunHaloMat.wrapS = sunMat.wrapT = THREE.RepeatWrapping;
      sunHaloMat.offset.set( 0, 0 );
      sunHaloMat.repeat.set( 1, 1 );
  
    }),
  
  });
  
  sunHalo = new THREE.Mesh(sunHaloGeo, sunHaloMat);
  sunHalo.material.transparent = true;
  sunHalo.material.opacity = 0.85;
  sunHalo.position.set(0, 0, 0);
  sunHalo.rotation.y = Math.PI * 5;
  sunHalo.castShadow = false;
  sunHalo.receiveShadow = false;
  scene.add(sunHalo);

  // sun corona
  const sunCoronaGeo = new THREE.SphereGeometry(7.15, 30, 30, 6);
  const sunCoronaMat = new THREE.MeshBasicMaterial({ 
  
    map: textureLoader.load( "../../resources/wrappers/sunBaseTexture.png")
  
  });
  
  sunCorona = new THREE.Mesh(sunCoronaGeo, sunCoronaMat);
  sunCorona.material.transparent = true;
  sunCorona.material.opacity = 0.45;
  sunCorona.position.set(0, 0, 0);
  sunCorona.rotation.x = Math.PI * 3;
  sunCorona.castShadow = false;
  sunCorona.receiveShadow = false;
  scene.add(sunCorona);

  // sun corona Ex
  const sunCoronaExGeo = new THREE.SphereGeometry(7.25, 30, 30, 6);
  const sunCoronaExMat = new THREE.MeshBasicMaterial({
  
    map: textureLoader.load( "../../resources/wrappers/sunCoronaTexture.png")
  
  });
  
  sunCoronaEx = new THREE.Mesh(sunCoronaExGeo, sunCoronaExMat);
  sunCoronaEx.material.transparent = true;
  sunCoronaEx.material.opacity = 0.15;
  sunCoronaEx.position.set(0, 0, 0);
  sunCoronaEx.rotation.y = Math.PI * 5;
  sunCoronaEx.castShadow = false;
  sunCoronaEx.receiveShadow = false;
  scene.add(sunCoronaEx); 

  // mercury
  const mercuryGeo = new THREE.SphereGeometry(0.024397, 30, 30, 6);
  const mercuryMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/mercuryTexture.png") 
  
  });
  
  mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
  mercury.rotation.x = Math.PI * 0.002;
  mercuryObj = new THREE.Object3D();
  mercuryObj.add(mercury);
  scene.add(mercuryObj);
  mercury.position.set(698.169, 0, 0);
  mercury.rotation.y = Math.PI * 2.31;

  // venus
  const venusGeo = new THREE.SphereGeometry(0.060518, 30, 30, 6);
  const venusMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/venusTexture.png") 
  
  });
  
  venus = new THREE.Mesh(venusGeo, venusMat);
  venus.rotation.x = Math.PI * 0.002;
  venusObj = new THREE.Object3D();
  venusObj.add(venus);
  scene.add(venusObj);
  venus.position.set(1089.39, 0, 0); 

  // earth
  const earthGeo = new THREE.SphereGeometry(0.063710, 30, 30, 6);
  const earthMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/earthTexture.png") 
  
  });
  
  earth = new THREE.Mesh(earthGeo, earthMat);
  earth.rotation.x = Math.PI * 0.002;
  earthObj = new THREE.Object3D();
  earthObj.add(earth);
  scene.add(earthObj);
  earth.position.set(1521, 0, 0); 

  // moon
  const moonGeo = new THREE.SphereGeometry(0.017374, 30, 30, 6);
  const moonMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/moonTexture.png") 
  
  });
  
  moon = new THREE.Mesh(moonGeo, moonMat);
  moon.rotation.x = Math.PI * 0.002;
  moonObj = new THREE.Object3D();
  moonObj.add(moon);
  earth.add(moonObj);
  moon.position.set(4.054, 0, 0); 

  // mars
  const marsGeo = new THREE.SphereGeometry(0.033895, 30, 30, 6);
  const marsMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/marsTexture.png") 
  
  });
  
  mars = new THREE.Mesh(marsGeo, marsMat);
  mars.rotation.x = Math.PI * 0.002;
  marsObj = new THREE.Object3D();
  marsObj.add(mars);
  scene.add(marsObj);
  mars.position.set(2492, 0, 0); 

  // asteroidBelt0
  var asteroidBelt0Distance = 4500;    
  var asteroidBelt0 = new THREE.TorusGeometry();
 
    for (var i = 0; i < 1000; i++) {
    
      var asteroidBelt0Vertex = new THREE.Vector3();

      var asteroidBelt0Theta = THREE.Math.randFloatSpread(360); 
      var asteroidBelt0Phi = THREE.Math.randFloatSpread(1.2);

      asteroidBelt0Vertex.x = (asteroidBelt0Distance * Math.sin(asteroidBelt0Theta) * Math.cos(asteroidBelt0Phi));
      asteroidBelt0Vertex.y = asteroidBelt0Distance * Math.sin(asteroidBelt0Theta) * Math.sin(asteroidBelt0Phi) / 28;
      asteroidBelt0Vertex.z = asteroidBelt0Distance * Math.cos(asteroidBelt0Theta);

      asteroidBelt0.vertices.push(asteroidBelt0Vertex);
    
    }

  var asteroidBelt0Particles = new THREE.Points(asteroidBelt0, 
  new THREE.PointsMaterial({color: 0x525567}));
    
  asteroidBelt0Particles.boundingSphere = 50;
    
  sunCore0.add(asteroidBelt0Particles);
  asteroidBelt0Particles.position.set (0, 0, 0);

  // asteroidBelt1
  var asteroidBelt1Distance = 4350;    
  var asteroidBelt1 = new THREE.TorusGeometry();
 
    for (var i = 0; i < 1000; i++) {
      
      var asteroidBelt1Vertex = new THREE.Vector3();

      var asteroidBelt1Theta = THREE.Math.randFloatSpread(360); 
      var asteroidBelt1Phi = THREE.Math.randFloatSpread(1.2);

      asteroidBelt1Vertex.x = (asteroidBelt1Distance * Math.sin(asteroidBelt1Theta) * Math.cos(asteroidBelt1Phi));
      asteroidBelt1Vertex.y = asteroidBelt1Distance * Math.sin(asteroidBelt1Theta) * Math.sin(asteroidBelt1Phi) / 28;
      asteroidBelt1Vertex.z = asteroidBelt1Distance * Math.cos(asteroidBelt1Theta);

      asteroidBelt1.vertices.push(asteroidBelt1Vertex);
    
    }

  var asteroidBelt1Particles = new THREE.Points(asteroidBelt1, 
  new THREE.PointsMaterial({color: 0x525567}));
    
  asteroidBelt1Particles.boundingSphere = 50;
    
  sunCore1.add(asteroidBelt1Particles);
  asteroidBelt1Particles.position.set (0, 0, 0);
  asteroidBelt1Particles.rotation.y = 90;

  // jupiter
  const jupiterGeo = new THREE.SphereGeometry(0.69911, 30, 30, 6);
  const jupiterMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/jupiterTexture.png") 
  
  });
  
  jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
  jupiter.rotation.x = Math.PI * 0.002;
  jupiterObj = new THREE.Object3D();
  jupiterObj.add(jupiter);
  scene.add(jupiterObj);
  jupiter.position.set(8166.2, 0, 0); 

  // saturn
  const saturnGeo = new THREE.SphereGeometry(0.60268, 30, 30, 6);
  const saturnMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/saturnTexture.png") 
  
  });
  
  saturn = new THREE.Mesh(saturnGeo, saturnMat);
  saturn.rotation.x = Math.PI * 0.002;
  saturnObj = new THREE.Object3D();
  saturnObj.add(saturn);
  scene.add(saturnObj);
  saturn.position.set(15145, 0, 0);

  // uranus
  const uranusGeo = new THREE.SphereGeometry(0.25362, 30, 30, 6);
  const uranusMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/uranusTexture.png") 
  
  });
  
  uranus = new THREE.Mesh(uranusGeo, uranusMat);
  uranus.rotation.x = Math.PI * 0.002;
  uranusObj = new THREE.Object3D();
  uranusObj.add(uranus);
  scene.add(uranusObj);
  uranus.position.set(45400, 0, 0);

  // neptune
  const neptuneGeo = new THREE.SphereGeometry(0.24622, 30, 30, 6);
  const neptuneMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/neptuneTexture.png") 
  
  });
  
  neptune = new THREE.Mesh(neptuneGeo, neptuneMat);
  neptune.rotation.x = Math.PI * 0.002;
  neptuneObj = new THREE.Object3D();
  neptuneObj.add(neptune);
  scene.add(neptuneObj);
  neptune.position.set(30063.9, 0, 0);
  
  // pluto
  const plutoGeo = new THREE.SphereGeometry(0.011883, 30, 30, 6);
  const plutoMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/plutoTexture.png") 
  
  });
  
  pluto = new THREE.Mesh(plutoGeo, plutoMat);
  pluto.rotation.x = Math.PI * 0.002;
  plutoObj = new THREE.Object3D();
  plutoObj.add(pluto);
  scene.add(plutoObj);
  pluto.position.set(73759.3, 0, 0); 
  

  sunCore0.add(milkyWayBoxMotion0YParticles);
  sunCore1.add(milkyWayBoxMotion1ZParticles);
  
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // lighting + shadow
  scene.add(new THREE.AmbientLight(0xFAF8E0, 0.02));
  light = new THREE.PointLight(0xfdfdfd, 0.78, 20000000, 0, 20);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  scene.add(light);
  
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;

  // lens flare
  // const textureFlare1 = textureLoader.load( "resources/lensflare/lensflare1.png" );
  // const textureFlare2 = textureLoader.load( "resources/lensflare/lensflare2.png" );

  // const Lensflare = new THREE.Lensflare();

  // Lensflare.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
  // Lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6 ) );

  // light.add( lensflare );
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // orbit controls
  controls = new THREE.OrbitControls (camera);
  controls.addEventListener( 'change', renderer );
  controls.minPolarAngle = Math.PI * 0.25;
  controls.maxPolarAngle =  Math.PI * 0.78;
  controls.minDistance = 4;
  controls.maxDistance = 1500000000;

}// loop

// controls.target = new THREE.Vector3( 2000000, 20000, 0);
// controls.update();

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  sunCore0.rotation.y += 0.000009;
  sunCore1.rotation.y += 0.0000009;
  sun.rotation.y += 0.0004;
  sunHalo.rotation.y += 0.0002;
  sunCorona.rotation.z += 0.0002;
  mercury.rotation.y += 0.00058646;
  mercuryObj.rotation.y += 0.005;
  venus.rotation.y += -0.00002430226;
  venusObj.rotation.y += 0.005;
  earth.rotation.y += 0.00099726968;
  earthObj.rotation.y += 0.005;
  moon.rotation.y += 0.00027321;
  moonObj.rotation.y += 0.005;
  mars.rotation.y += 0.0001025;
  marsObj.rotation.y += 0.005;
  jupiter.rotation.y += 0.0099250;
  jupiterObj.rotation.y += 0.005;
  saturn.rotation.y += 0.00103338;
  saturnObj.rotation.y += 0.005;
  uranus.rotation.y += 0.00171423;
  uranusObj.rotation.y += 0.005;
  neptune.rotation.y += 0.00160636;
  neptuneObj.rotation.y += 0.005;
  pluto.rotation.y += -0.000638723;
  plutoObj.rotation.y += 0.005;
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();

}

window.addEventListener('resize', onWindowResize, false);