let scene, camera, renderer, light;
let background, sun;
var controls;

init();
animate();

function init() {
  // create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  //camera
  camera = new THREE.PerspectiveCamera(
    7,
    window.innerWidth / window.innerHeight,
    5,
    20000000000
    );
  camera.position.x = 0
  camera.position.y = 0 //0
  camera.position.z = 20000000
  camera.rotation.y = 45;
      
  //object rotate function
  function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
    object.rotateX(THREE.Math.degToRad(degreeX));
    object.rotateY(THREE.Math.degToRad(degreeY));
    object.rotateZ(THREE.Math.degToRad(degreeZ));
  }
  
  //texture loader
  const textureLoader = new THREE.TextureLoader();
    
  // starfield geometry spec
  // const starfieldGeo = new THREE.SphereGeometry(875, 30, 30 );
  // const starfieldMat = new THREE.MeshBasicMaterial({ 
  //   side: THREE.BackSide,
  //   emissive: 0xffffff, 
  //   emissiveIntensity: 0.01,
  //   map: textureLoader.load("resources/starBox/starBoxMaster.png", 
  //     function (starfieldMat) {
  //       starfieldMat.wrapS = starfieldMat.wrapT = THREE.RepeatWrapping;
  //       starfieldMat.offset.set( 0, 1 );
  //       starfieldMat.repeat.set( 80, 80 );
  //     })
  // });
  // background = new THREE.Mesh(starfieldGeo, starfieldMat);
  // background.rotateY(45);
  // background.castShadow = false;
  // background.receiveShadow = false;
  // scene.add(background);

  //create starfield
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
 
  var particles = new THREE.PointCloud(star, 
    new THREE.PointCloudMaterial({color: 0xffffff}));

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
  
  var milkyWayBoxParticles = new THREE.PointCloud(milkyWayBox, 
    new THREE.PointCloudMaterial({color: 0x7E6F89}));

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
  
  var milkyWayBoxVarBgParticles = new THREE.PointCloud(milkyWayBoxVarBg, 
    new THREE.PointCloudMaterial({color: 0x537AC5}));

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
  
  var milkyWayBoxVarSgParticles = new THREE.PointCloud(milkyWayBoxVarSg, 
    new THREE.PointCloudMaterial({color: 0xA50C0C}));

  milkyWayBoxVarSgParticles.boundingSphere = 50;

  scene.add(milkyWayBoxVarSgParticles); 

    //MilkyWayBoxMotion
  var milkyWayBoxMotionDistance = 186000000;    
  var milkyWayBoxMotion = new THREE.Geometry();
  
  for (var i = 0; i < 10; i++) {
    var milkyWayBoxMotionVertex = new THREE.Vector3();

    var milkyWayBoxMotionTheta = THREE.Math.randFloatSpread(360); 
    var milkyWayBoxMotionPhi = THREE.Math.randFloatSpread(360);

    milkyWayBoxMotionVertex.x = (milkyWayBoxMotionDistance * Math.sin(milkyWayBoxMotionTheta) * Math.cos(milkyWayBoxMotionPhi));
    milkyWayBoxMotionVertex.y = milkyWayBoxMotionDistance * Math.sin(milkyWayBoxMotionTheta) * Math.sin(milkyWayBoxMotionPhi) / 6;
    milkyWayBoxMotionVertex.z = milkyWayBoxMotionDistance * Math.cos(milkyWayBoxMotionTheta) - 250000;

    milkyWayBoxMotion.vertices.push(milkyWayBoxMotionVertex);
  }
  
  var milkyWayBoxMotionParticles = new THREE.PointCloud(milkyWayBoxMotion, 
    new THREE.PointCloudMaterial({color: 0xffffff}));

  milkyWayBoxMotionParticles.boundingSphere = 50;

  //MilkyWayCenterBand
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
  
  var milkyWayParticles = new THREE.PointCloud(milkyWay, 
    new THREE.PointCloudMaterial({color: 0xC5C0D5}));

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
 
  var milkyWayArm1Particles = new THREE.PointCloud(milkyWayArm1, 
    new THREE.PointCloudMaterial({color: 0xffffff}));

  milkyWayArm1Particles.boundingSphere = 50;

  scene.add(milkyWayArm1Particles);
  milkyWayArm1Particles.position.set(-60000000, 200000, 18000000);
  milkyWayArm1Particles.rotation.y = 0.45;

  var milkyWayArm2Distance = 186000000;    
  var milkyWayArm2 = new THREE.Geometry();

  //MilkyWayArm2 Right
  for (var i = 0; i < 4000; i++) {
    var milkyWayArm2Vertex = new THREE.Vector3();

    var milkyWayArm2Theta = THREE.Math.randFloatSpread(6.2); 
    var milkyWayArm2Phi = THREE.Math.randFloatSpread(0.1);

    milkyWayArm2Vertex.x = (milkyWayArm2Distance * Math.sin(milkyWayArm2Theta) * Math.cos(milkyWayArm2Phi)) / 1.2;
    milkyWayArm2Vertex.y = milkyWayArm2Distance * Math.sin(milkyWayArm2Theta) * Math.sin(milkyWayArm2Phi) / 2;
    milkyWayArm2Vertex.z = milkyWayArm2Distance * Math.cos(milkyWayArm2Theta) - 250000;
    
    milkyWayArm2.vertices.push(milkyWayArm2Vertex);
  }
 
  var milkyWayArm2Particles = new THREE.PointCloud(milkyWayArm2, 
    new THREE.PointCloudMaterial({color: 0xB3AFCB}));

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

  var milkyWayCoreParticles = new THREE.PointCloud(milkyWayCore, 
    new THREE.PointCloudMaterial({color: 0xB3AFCB}));

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
 
  var milkyWayCoreOuterParticles = new THREE.PointCloud(milkyWayCoreOuter, 
    new THREE.PointCloudMaterial({color: 0x7E6F89}));

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
  
   var eventHorizonFogParticles = new THREE.PointCloud(eventHorizonFog, 
    new THREE.PointCloudMaterial({color: 0x8D7078}));

   eventHorizonFogParticles.boundingSphere = 50;
 
   scene.add(eventHorizonFogParticles);
   eventHorizonFogParticles.position.set (0, 200000, 125000000);
   eventHorizonFogParticles.rotation.y = 0;

    //EventHorizonHalo
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
   
  var eventHorizonHaloParticles = new THREE.PointCloud(eventHorizonHalo, 
    new THREE.PointCloudMaterial({color: 0x62667B}));

  eventHorizonHaloParticles.boundingSphere = 50;

  scene.add(eventHorizonHaloParticles);
  eventHorizonHaloParticles.position.set (0, 200, 197000000);
  eventHorizonHaloParticles.rotation.y = 0;

 //EventHorizon
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
  
   var eventHorizonParticles = new THREE.PointCloud(eventHorizon, 
    new THREE.PointCloudMaterial({color: 0xBAB6D1}));

   eventHorizonParticles.boundingSphere = 50;
 
   scene.add(eventHorizonParticles);
   eventHorizonParticles.position.set (0, 20, 195000000);

  //sun
  const sunGeo = new THREE.SphereGeometry(0.696342, 30, 30, 6);
  const sunMat = new THREE.MeshLambertMaterial({
    emissive: 0xFF9444, 
    emissiveIntensity: 0.87,  
    map: textureLoader.load("resources/wrappers/sunTexture.png",
    function (sunMat) {
      sunMat.wrapS = sunMat.wrapT = THREE.RepeatWrapping;
      sunMat.offset.set( 0, 0 );
      sunMat.repeat.set( 1, 1 );
    }),
    normalMap: textureLoader.load("resources/wrappers/sunTexture.png")
  });
  sun = new THREE.Mesh(sunGeo, sunMat);
  sun.transparent = true;
  sun.position.set(0, 0, 0);
  sun.rotation.x = Math.PI * 0.002;
  sun.castShadow = false;
  sun.receiveShadow = false;
  scene.add(sun);

  const sunHaloGeo = new THREE.SphereGeometry(0.69, 30, 30, 6);
  const sunHaloMat = new THREE.MeshLambertMaterial({
    emissive: 0xFF9444, 
    emissiveIntensity: 0.9,  
    map: textureLoader.load("resources/wrappers/sunTexture.png",
    function (sunHaloMat) {
      sunHaloMat.wrapS = sunMat.wrapT = THREE.RepeatWrapping;
      sunHaloMat.offset.set( 1, 1 );
      sunHaloMat.repeat.set( 5, 5 );
    }),
    normalMap: textureLoader.load("resources/wrappers/sunTexture.png")
  });
  sunHalo = new THREE.Mesh(sunHaloGeo, sunHaloMat);
  sunHalo.material.transparent = true;
  sunHalo.material.opacity = 0.15;
  sunHalo.position.set(0, 0, 0);
  sunHalo.rotation.x = Math.PI * 5;
  sunHalo.castShadow = false;
  sunHalo.receiveShadow = false;
  scene.add(sunHalo);

  const sunCoronaGeo = new THREE.SphereGeometry(0.701, 30, 30, 6);
  const sunCoronaMat = new THREE.MeshLambertMaterial({
    emissive: 0xFF9444, 
    emissiveIntensity: 0.5,  
    map: textureLoader.load("resources/wrappers/sunTexture.png",
    function (sunHaloMat) {
      sunCoronaMat.wrapS = sunMat.wrapT = THREE.RepeatWrapping;
      sunCoronaMat.offset.set( 1, 1 );
      sunCoronaMat.repeat.set( 5, 5 );
    }),
    normalMap: textureLoader.load("resources/wrappers/sunTexture.png")
  });
  sunCorona = new THREE.Mesh(sunCoronaGeo, sunCoronaMat);
  sunCorona.material.transparent = true;
  sunCorona.material.opacity = 0.5;
  sunCorona.position.set(0, 0, 0);
  sunCorona.rotation.x = Math.PI * 5;
  sunCorona.castShadow = false;
  sunCorona.receiveShadow = false;
  scene.add(sunCorona);
  sun.add(milkyWayBoxMotionParticles); 
  sunCorona.add(milkyWayBoxMotionParticles); 

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  //lighting + shadow
  scene.add(new THREE.AmbientLight(0xFAF8E0, 1));
  light = new THREE.DirectionalLight(0xfdfdfd, 0, 0);
  light.position.set(200, -50, 190);
  light.castShadow = true;
  scene.add(light);
  
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //orbit controls
  controls = new THREE.OrbitControls (camera);
  controls.addEventListener( 'change', renderer );
  controls.minPolarAngle = Math.PI * 0.25;
  controls.maxPolarAngle =  Math.PI * 0.78;
  controls.minDistance = 4;
  controls.maxDistance = 1500000000;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
  
function animate() {
  sun.rotation.y += 0.00050;
  sunHalo.rotation.y += 0.00070;
  sunCorona.rotation.z += 0.00070;
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}

window.addEventListener('resize', onWindowResize, false);