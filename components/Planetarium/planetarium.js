let scene, camera, renderer, light;

clock = new THREE.Clock();

// import * as LensflareJs from 'src/Lensflare.js';

init();
animate();

function init() {
  // create scene
  scene = new THREE.Scene();
  clock = new THREE.Clock();

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
  camera.position.z += 150000;
  
  // object rotate function
  function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  
    object.rotateX(THREE.Math.degToRad(degreeX));
    object.rotateY(THREE.Math.degToRad(degreeY));
    object.rotateZ(THREE.Math.degToRad(degreeZ));
  
  }
  
  // texture loader
  const textureLoader = new THREE.TextureLoader();

  // Display Table

  // plane
  const planeGeo = new THREE.PlaneGeometry(300000, 18000);
  const planeMat = new THREE.MeshBasicMaterial({  
  
    color: 0x898794
    
  });
  plane = new THREE.Mesh(planeGeo, planeMat);
  plane.position.y += -1300
  plane.rotation.x += 30
  
  // background effects

  // MilkyWayBox
  var milkyWayBoxDistance = 18600000000;    
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

  // Planets and Satellites

  // sunCore0
  const sunCore0Geo = new THREE.SphereGeometry(1352.6, 30, 30, 6);
  const sunCore0Mat = new THREE.MeshBasicMaterial({ color: 0xffffff
    });
  
  sunCore0 = new THREE.Mesh(sunCore0Geo, sunCore0Mat);
  sunCore0.material.transparent = true;
  // sunCore0.material.opacity = 1;
  sunCore0.position.set(0, 0, 0);
  sunCore0.rotation.x = Math.PI * 0.002;
  scene.add(sunCore0); 

  // sun
  const sunGeo = new THREE.SphereGeometry(6763.418, 128, 128, 6, 5);
  const sunMat = new THREE.MeshBasicMaterial({ 
  
    map: textureLoader.load("../../resources/wrappers/sunBaseTexture.png",
  
    function (sunMat) {
      sunMat.wrapS = sunMat.wrapT = THREE.RepeatWrapping;
      sunMat.offset.set( 0, 0 );
      sunMat.repeat.set( 1, 1 );
      
    }),
  
  });
  
  sun = new THREE.Mesh(sunGeo, sunMat);
  sun.material.side = THREE.DoubleSide;
  sun.position.set(0, 0, 0);
  sun.rotation.x = Math.PI * 0.002;
  sun.castShadow = false;
  sun.receiveShadow = false;
  sunCore0.add(sun);

  // sun halo
  const sunHaloGeo = new THREE.SphereGeometry(6885, 30, 30, 6, 6);
  const sunHaloMat = new THREE.MeshBasicMaterial({ 
  
    map: textureLoader.load("../../resources/wrappers/sunBaseTexture.png")
  
  });
  
  sunHalo = new THREE.Mesh(sunHaloGeo, sunHaloMat);
  sunHalo.material.side = THREE.DoubleSide;
  sunHalo.material.transparent = true;
  sunHalo.material.opacity = 0.2;
  sunHalo.position.set(0, 0, 0);
  sunHalo.rotation.y = Math.PI * 5;
  sunHalo.castShadow = false;
  sunHalo.receiveShadow = false;
  sunCore0.add(sunHalo);
  
  // mercury
  const mercuryGeo = new THREE.SphereGeometry(24.397, 30, 30, 6);
  const mercuryMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/mercuryTexture.png") 
  
  });
  
  mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
  mercury.rotation.x = Math.PI * 0.002;
  mercuryObj = new THREE.Object3D();
  mercuryObj.add(mercury);
  scene.add(mercuryObj);
  mercury.position.set(0, -7000, 0);
  mercury.rotation.y = Math.PI * 2.31;

   // venus
  const venusGeo = new THREE.SphereGeometry(60.518, 30, 30, 6);
  const venusMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/venusTexture.png") 
  
  });
  
  venus = new THREE.Mesh(venusGeo, venusMat);
  venus.rotation.x = Math.PI * 0.002;
  venusObj = new THREE.Object3D();
  venusObj.add(venus);
  scene.add(venusObj);
  venus.position.set(2700, -6350, 0); 

  // earth
  const earthGeo = new THREE.SphereGeometry(63.710, 30, 30, 6);
  const earthMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/earthTexture.png") 
  
  });
  
  earth = new THREE.Mesh(earthGeo, earthMat);
  earth.rotation.x = Math.PI * 0.002;
  earthObj = new THREE.Object3D();
  earthObj.add(earth);
  scene.add(earthObj);
  earth.position.set(5000, -4790, 0); 

  // // moon
  // const moonGeo = new THREE.SphereGeometry(0.017374, 30, 30, 6);
  // const moonMat = new THREE.MeshLambertMaterial({
  
  //   map: textureLoader.load("../../resources/wrappers/moonTexture.png") 
  
  // });
  
  // moon = new THREE.Mesh(moonGeo, moonMat);
  // moon.rotation.x = Math.PI * 0.002;
  // moonObj = new THREE.Object3D();
  // moonObj.add(moon);
  // earth.add(moonObj);
  // moon.position.set(4.054, 0, 0); 

  // // mars
  const marsGeo = new THREE.SphereGeometry(33.895, 30, 30, 6);
  const marsMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/marsTexture.png") 
  
  });
  
  mars = new THREE.Mesh(marsGeo, marsMat);
  mars.rotation.x = Math.PI * 0.002;
  marsObj = new THREE.Object3D();
  marsObj.add(mars);
  scene.add(marsObj);
  mars.position.set(6400, -2600, 0); 

  // // saturnRing0
  const asteroidBeltCoreGeo = new THREE.SphereGeometry(20, 30, 30, 6);
  const asteroidBeltCoreMat = new THREE.MeshLambertMaterial({
  
    color: 0x000000
  
  });
  
  asteroidBeltCore = new THREE.Mesh(asteroidBeltCoreGeo, asteroidBeltCoreMat);
  asteroidBeltCore.rotation.x = Math.PI * 0.002;
  asteroidBeltCoreObj = new THREE.Object3D();
  asteroidBeltCoreObj.add(asteroidBeltCore);
  scene.add(asteroidBeltCoreObj);
  asteroidBeltCore.position.set(6950, 0, 0); 

  // asteroidBelt1
  // var asteroidBelt1Distance = 4350;    
  // var asteroidBelt1 = new THREE.TorusGeometry();
 
  //   for (var i = 0; i < 1000; i++) {
      
  //     var asteroidBelt1Vertex = new THREE.Vector3();

  //     var asteroidBelt1Theta = THREE.Math.randFloatSpread(360); 
  //     var asteroidBelt1Phi = THREE.Math.randFloatSpread(1.2);

  //     asteroidBelt1Vertex.x = (asteroidBelt1Distance * Math.sin(asteroidBelt1Theta) * Math.cos(asteroidBelt1Phi));
  //     asteroidBelt1Vertex.y = asteroidBelt1Distance * Math.sin(asteroidBelt1Theta) * Math.sin(asteroidBelt1Phi) / 28;
  //     asteroidBelt1Vertex.z = asteroidBelt1Distance * Math.cos(asteroidBelt1Theta);

  //     asteroidBelt1.vertices.push(asteroidBelt1Vertex);
    
  //   }

  // var asteroidBelt1Particles = new THREE.Points(asteroidBelt1, 
  // new THREE.PointsMaterial({color: 0x525567}));
    
  // asteroidBelt1Particles.boundingSphere = 50;
    
  // sunCore1.add(asteroidBelt1Particles);
  // asteroidBelt1Particles.position.set (0, 0, 0);
  // asteroidBelt1Particles.rotation.y = 90;

  // jupiter
  const jupiterGeo = new THREE.SphereGeometry(699.11, 30, 30, 6);
  const jupiterMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/jupiterTexture.png") 
  
  });
  
  jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
  jupiter.rotation.z = Math.PI * 0.06;
  jupiterObj = new THREE.Object3D();
  jupiterObj.add(jupiter);
  scene.add(jupiterObj);
  jupiter.position.set(7150, 2700, 0); 
  //JUPITER HAS RINGS

  // // saturn
  const saturnGeo = new THREE.SphereGeometry(602.68, 30, 30, 6);
  const saturnMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/saturnTexture.png") 
  
  });
  
  saturn = new THREE.Mesh(saturnGeo, saturnMat);
  saturn.rotation.x = Math.PI * 0.12;
  saturnObj = new THREE.Object3D();
  saturnObj.add(saturn);
  scene.add(saturnObj);
  saturn.position.set(5400, 5200, 0);
  
  // saturnRing0
  var saturnRing0Distance = 1000;
  var saturnRing0 = new THREE.RingGeometry();
 
    for (var i = 0; i < 10000; i++) {
    
      var saturnRing0Vertex = new THREE.Vector3();

      var saturnRing0Theta = THREE.Math.randFloatSpread(360); 
      var saturnRing0Phi = THREE.Math.randFloatSpread(0.01);

      saturnRing0Vertex.x = (saturnRing0Distance * Math.sin(saturnRing0Theta) * Math.cos(saturnRing0Phi));
      saturnRing0Vertex.y = saturnRing0Distance * Math.sin(saturnRing0Theta) * Math.sin(saturnRing0Phi);
      saturnRing0Vertex.z = saturnRing0Distance * Math.cos(saturnRing0Theta);

      saturnRing0.vertices.push(saturnRing0Vertex);
    
    }
    var saturnRing1Distance = 1050;
    var saturnRing1 = new THREE.RingGeometry();
    
      for (var i = 0; i < 10000; i++) {
      
        var saturnRing1Vertex = new THREE.Vector3();
    
        var saturnRing1Theta = THREE.Math.randFloatSpread(360); 
        var saturnRing1Phi = THREE.Math.randFloatSpread(0.01);
    
        saturnRing1Vertex.x = (saturnRing1Distance * Math.sin(saturnRing1Theta) * Math.cos(saturnRing1Phi));
        saturnRing1Vertex.y = saturnRing1Distance * Math.sin(saturnRing1Theta) * Math.sin(saturnRing1Phi);
        saturnRing1Vertex.z = saturnRing1Distance * Math.cos(saturnRing1Theta);
    
        saturnRing1.vertices.push(saturnRing1Vertex);
      
      }
      
      var saturnRing2Distance = 1250;
      var saturnRing2 = new THREE.RingGeometry();

        for (var i = 0; i < 10000; i++) {
  
          var saturnRing2Vertex = new THREE.Vector3();

          var saturnRing2Theta = THREE.Math.randFloatSpread(360); 
          var saturnRing2Phi = THREE.Math.randFloatSpread(0.01);

          saturnRing2Vertex.x = (saturnRing2Distance * Math.sin(saturnRing2Theta) * Math.cos(saturnRing2Phi));
          saturnRing2Vertex.y = saturnRing2Distance * Math.sin(saturnRing2Theta) * Math.sin(saturnRing2Phi);
          saturnRing2Vertex.z = saturnRing2Distance * Math.cos(saturnRing2Theta);

         saturnRing2.vertices.push(saturnRing2Vertex);
  
        }

  var saturnRing0Particles = new THREE.Points(saturnRing0, 
  new THREE.PointsMaterial({color: 0x525567}));
  var saturnRing1Particles = new THREE.Points(saturnRing1, 
  new THREE.PointsMaterial({color: 0x525567}));
  var saturnRing2Particles = new THREE.Points(saturnRing2, 
  new THREE.PointsMaterial({color: 0x525567}));
    
  saturnRing0Particles.boundingSphere = 50;
  saturn.add(saturnRing0Particles);
  saturnRing1Particles.boundingSphere = 50;
  saturn.add(saturnRing1Particles);
  saturnRing2Particles.boundingSphere = 50;
  saturn.add(saturnRing2Particles);

  // // uranus
  const uranusGeo = new THREE.SphereGeometry(253.62, 30, 30, 6);
  const uranusMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/uranusTexture.png") 
  
  });
  
  uranus = new THREE.Mesh(uranusGeo, uranusMat);
  uranus.rotation.x = Math.PI * 0.002;
  uranusObj = new THREE.Object3D();
  uranusObj.add(uranus);
  scene.add(uranusObj);
  uranus.position.set(2820, 6590, 0);

  // // neptune
  const neptuneGeo = new THREE.SphereGeometry(246.22, 30, 30, 6);
  const neptuneMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/neptuneTexture.png") 
  
  });
  
  neptune = new THREE.Mesh(neptuneGeo, neptuneMat);
  neptune.rotation.x = Math.PI * 0.002;
  neptuneObj = new THREE.Object3D();
  neptuneObj.add(neptune);
  scene.add(neptuneObj);
  neptune.position.set(0, 7150, 0);
  
  // // pluto
  const plutoGeo = new THREE.SphereGeometry(11.883, 30, 30, 6);
  const plutoMat = new THREE.MeshLambertMaterial({
  
    map: textureLoader.load("../../resources/wrappers/plutoTexture.png") 
  
  });
  
  pluto = new THREE.Mesh(plutoGeo, plutoMat);
  pluto.rotation.x = Math.PI * 0.002;
  plutoObj = new THREE.Object3D();
  plutoObj.add(pluto);
  scene.add(plutoObj);
  pluto.position.set(-2450, 6500, 0); 
  

  // sunCore0.add(milkyWayBoxMotion0YParticles);
  
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // lighting + shadow
  scene.add(new THREE.AmbientLight(0xFAF8E0, 0.5));
  light = new THREE.PointLight(0xfdfdfd, 0.78, 0, 0, 20);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  scene.add(light);
  
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}
// sunCoreView tween.js animation handler
sunTarget = sun;
var sunBtn = document.getElementById('sunCoreView');
sunBtn.onclick = function(){

  var tweenSunTarget = new TWEEN.Tween(sunTarget.rotation)
    .to({ x: 0, y: 2, z: 0 }, 8000)
    .start();

  var tweenSunCamera = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: 0, z: 150000 }, 8000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

// planetDiameter tween.js animation handler
sunTarget = sun;
var sunBtn = document.getElementById('sunDiameter');
sunBtn.onclick = function(){

  var tweenSunTarget = new TWEEN.Tween(sunTarget.position)
    .to({ x: 0, y: 0, z: 0 }, 2000)
    .start();

  var tweenSunCamera = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: 0, z: 150000 }, 2000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

mercuryTarget = mercury;
var mercuryBtn = document.getElementById('mercuryDiameter');
mercuryBtn.onclick = function(){

  var tweenMercuryTarget = new TWEEN.Tween(mercuryTarget.position)
    .to({ x: 0, y: -7000, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenMercuryCamera = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: -7000, z: 420 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

venusTarget = venus;
var venusBtn = document.getElementById('venusDiameter');
venusBtn.onclick = function(){

  var tweenvenusTarget = new TWEEN.Tween(venusTarget.position)
    .to({ x: 2700, y: -6350, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenvenusCamera = new TWEEN.Tween(camera.position)
    .to({ x: 2700, y: -6350, z: 1100 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

earthTarget = earth;
var earthBtn = document.getElementById('earthDiameter');
earthBtn.onclick = function(){

  var tweenearthTarget = new TWEEN.Tween(earthTarget.position)
    .to({ x: 5000, y: -4790, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenearthCamera = new TWEEN.Tween(camera.position)
    .to({ x: 5000, y: -4790, z: 1100 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

marsTarget = mars;
var marsBtn = document.getElementById('marsDiameter');
marsBtn.onclick = function(){

  var tweenmarsTarget = new TWEEN.Tween(marsTarget.position)
    .to({ x: 6400, y: -2600, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenmarsCamera = new TWEEN.Tween(camera.position)
    .to({ x: 6400, y: -2600, z: 1100 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

asteroidBeltCoreTarget = asteroidBeltCore;
var asteroidBeltCoreBtn = document.getElementById('asteroidDiameter');
asteroidBeltCoreBtn.onclick = function(){

  var tweenasteroidBeltCoreTarget = new TWEEN.Tween(asteroidBeltCoreTarget.position)
    .to({ x: 0, y: -7000, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenasteroidBeltCoreCamera = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: -7000, z: 420 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

jupiterTarget = jupiter;
var jupiterBtn = document.getElementById('jupiterDiameter');
jupiterBtn.onclick = function(){

  var tweenjupiterTarget = new TWEEN.Tween(jupiterTarget.position)
    .to({ x: 7150, y: 2700, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenjupiterCamera = new TWEEN.Tween(camera.position)
    .to({ x: 7150, y: 2700, z: 13000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

saturnTarget = saturn;
var saturnBtn = document.getElementById('saturnDiameter');
saturnBtn.onclick = function(){

  var tweensaturnTarget = new TWEEN.Tween(saturnTarget.position)
    .to({ x: 5400, y: 5200, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweensaturnCamera = new TWEEN.Tween(camera.position)
    .to({ x: 5400, y: 5200, z: 13000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

uranusTarget = uranus;
var uranusBtn = document.getElementById('uranusDiameter');
uranusBtn.onclick = function(){

  var tweenuranusTarget = new TWEEN.Tween(uranusTarget.position)
    .to({ x: 2820, y: 6590, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenuranusCamera = new TWEEN.Tween(camera.position)
    .to({ x: 2820, y: 6590, z: 4700 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

neptuneTarget = neptune;0, 7150, 0
var neptuneBtn = document.getElementById('neptuneDiameter');
neptuneBtn.onclick = function(){

  var tweenneptuneTarget = new TWEEN.Tween(neptuneTarget.position)
    .to({ x: 0, y: 7150, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenneptuneCamera = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: 7150, z: 4700 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

plutoTarget = pluto;
var plutoBtn = document.getElementById('plutoDiameter');
plutoBtn.onclick = function(){

  var tweenplutoTarget = new TWEEN.Tween(plutoTarget.position)
    .to({ x: -2450, y: 6500, z: 0 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenplutoCamera = new TWEEN.Tween(camera.position)
    .to({ x: -2450, y: 6500, z: 325 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

// planetOrbit tween.js animation handler
sunTarget = sun;
var sunBtn = document.getElementById('sunDiameter');
sunBtn.onclick = function(){

  var tweenSunTarget = new TWEEN.Tween(sunTarget.position)
    .to({ x: 0, y: 0, z: 0 }, 4000)
    .start();

  var tweenSunCamera = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: 0, z: 150000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

mercuryTarget = mercury;
var sunBtn = document.getElementById('mercuryOrbit');
sunBtn.onclick = function(){

  var tweenMercuryTarget = new TWEEN.Tween(mercuryTarget.position)
    .to({ x: 0, y: 0, z: 56270000 }, 8002)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenMercuryCamera = new TWEEN.Tween(camera.position)
    .to({ x: -25, y: 0, z: 56271500 }, 8000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

venusTarget = venus;
var venusBtn = document.getElementById('venusOrbit');
venusBtn.onclick = function(){

  var tweenVenusTarget = new TWEEN.Tween(venusTarget.position)
    .to({ x: 0, y: 0, z: 105100000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenVenusCamera = new TWEEN.Tween(camera.position)
    .to({ x: -65, y: 0, z: 105102700 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

earthTarget = earth;
var earthBtn = document.getElementById('earthOrbit');
earthBtn.onclick = function(){

  var tweenEarthTarget = new TWEEN.Tween(earthTarget.position)
    .to({ x: 0, y: 0, z: 145400000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenEarthCamera = new TWEEN.Tween(camera.position)
    .to({ x: -65, y: 0, z: 145402700 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

marsTarget = mars;
var marsBtn = document.getElementById('marsOrbit');
marsBtn.onclick = function(){

  var tweenMarsTarget = new TWEEN.Tween(marsTarget.position)
    .to({ x: 0, y: 0, z: 221500000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenMarsCamera = new TWEEN.Tween(camera.position)
    .to({ x: -36, y: 0, z: 221501500 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

asteroidTarget = asteroidBeltCore;
var asteroidBtn = document.getElementById('asteroidOrbit');
asteroidBtn.onclick = function(){

  var tweenAsteroidTarget = new TWEEN.Tween(asteroidTarget.position)
    .to({ x: 0, y: 0, z: 402100000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenAsteroidCamera = new TWEEN.Tween(camera.position)
    .to({ x: -80, y: 0, z: 402400000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

jupiterTarget = jupiter;
var jupiterBtn = document.getElementById('jupiterOrbit');
jupiterBtn.onclick = function(){

  var tweenJupiterTarget = new TWEEN.Tween(jupiterTarget.position)
    .to({ x: 0, y: 0, z: 756600000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenJupiterCamera = new TWEEN.Tween(camera.position)
    .to({ x: -730, y: 0, z: 756625000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

saturnTarget = saturn;
var saturnBtn = document.getElementById('saturnOrbit');
saturnBtn.onclick = function(){

  var tweenSaturnTarget = new TWEEN.Tween(saturnTarget.position)
    .to({ x: 0, y: 0, z: 1393000000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenSaturnCamera = new TWEEN.Tween(camera.position)
    .to({ x: -660, y: 0, z: 1393025000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

uranusTarget = uranus;
var uranusBtn = document.getElementById('uranusOrbit');
uranusBtn.onclick = function(){

  var tweenUranusTarget = new TWEEN.Tween(uranusTarget.position)
    .to({ x: 0, y: 0, z: 2796000000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenUranusCamera = new TWEEN.Tween(camera.position)
    .to({ x: -260, y: 0, z: 2796010000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

neptuneTarget = neptune;
var neptuneBtn = document.getElementById('neptuneOrbit');
neptuneBtn.onclick = function(){

  var tweenNeptuneTarget = new TWEEN.Tween(neptuneTarget.position)
    .to({ x: 0, y: 0, z: 4376000000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenNeptuneCamera = new TWEEN.Tween(camera.position)
    .to({ x: -250, y: 0, z: 4376010000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

plutoTarget = pluto;
var plutoBtn = document.getElementById('plutoOrbit');
plutoBtn.onclick = function(){

  var tweenPlutoTarget = new TWEEN.Tween(plutoTarget.position)
    .to({ x: 0, y: 0, z: 5708000000 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  var tweenPlutoCamera = new TWEEN.Tween(camera.position)
    .to({ x: -12, y: 0, z: 5708000500 }, 4000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  animate();
};

// window update function
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
  TWEEN.update()
  sunCore0.rotation.y += 0.0000009;
  sun.rotation.y += 0.000004;
  sunHalo.rotation.y += 0.00002;
  mercury.rotation.y += 0.0004
  venus.rotation.y += 0.0004
  earth.rotation.y += 0.0004
  mars.rotation.y += 0.0004
  asteroidBeltCore.rotation.y += 0.0004
  jupiter.rotation.y += 0.0004
  saturn.rotation.y += 0.0004
  uranus.rotation.y += 0.0004
  neptune.rotation.y += 0.0004
  pluto.rotation.y += 0.0004

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', onWindowResize, false);