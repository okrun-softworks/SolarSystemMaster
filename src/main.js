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
    70000
    );
  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 14
      
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
  
  function addSphere(){
    for ( var z= -100000; z < 1000; z+=20 ) {
      var geometry   = new THREE.SphereGeometry(2, 1, 1)
      var material = new THREE.MeshBasicMaterial( {color: 0xeeffff} );
      var sphere = new THREE.Mesh(geometry, material)
      sphere.position.x = Math.random() * (10000);
      sphere.position.y = Math.random() * (10000);
      sphere.position.z = Math.random() * (10000);
      sphere.scale.x = sphere.scale.y = 2;
      scene.add( sphere );
    }
  }
  addSphere();
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
  
  //saturn body 
  // const saturnGeo = new THREE.SphereGeometry(3.8820, 32, 18);
  // const saturnMat = new THREE.MeshLambertMaterial({ 
  //   map: textureLoader.load("textures/Saturn.png"),
  //   normalMap: textureLoader.load("textures/saturn_clouds_texture.png")
  // });
  // saturn = new THREE.Mesh(saturnGeo, saturnMat);
  // saturn.transparent = true;
  // saturn.rotation.x = Math.PI * 0.2;
  // saturn.castShadow = true;
  // saturn.receiveShadow = false;
  // scene.add(saturn);
  
  //saturn inner ring
  // const saturnRingGeo = new THREE.RingGeometry(4.5, 5.5, 30, 30);
  // const saturnInRingMat = new THREE.MeshLambertMaterial({ 
  //   side: THREE.DoubleSide, 
  //   map: textureLoader.load("textures/saturn_ring_texture.png") 
  // });
  // saturnInRing = new THREE.Mesh(saturnRingGeo, saturnInRingMat);
  // saturnInRing.transparent = true;
  // rotateObject(saturnInRing, 90, 0, 0);
  // saturnInRing.castShadow = false;
  // saturnInRing.receiveShadow = true;
  // saturn.add(saturnInRing);

  //saturn outer ring
  // const saturnOutRingGeo = new THREE.RingGeometry(5.6, 9, 30, 30);
  // const saturnOutRingMat = new THREE.MeshLambertMaterial({ 
  //   side: THREE.DoubleSide,
  //   map: textureLoader.load("textures/saturn_ring_texture.png")
  // });
  // saturnOutRing = new THREE.Mesh(saturnOutRingGeo, saturnOutRingMat);
  // saturnOutRing.transparent = true;
  // rotateObject(saturnOutRing, 90, 0, 0);
  // saturnOutRing.castShadow = false;
  // saturnOutRing.receiveShadow = true;
  // saturn.add(saturnOutRing);

  //Rhea body
  // const rheaGeo = new THREE.SphereGeometry(0.509, 16, 16);
  // const rheaMat = new THREE.MeshLambertMaterial({ 
  //   map: textureLoader.load("textures/Rhea_texture.png")
  // });
  // rhea = new THREE.Mesh(rheaGeo, rheaMat);
  // rheaObj = new THREE.Object3D();
  // rheaObj.add(rhea);
  // scene.add(rheaObj);
  // rhea.position.x = 19;

  //Iapetus body
  // const iapetusGeo = new THREE.SphereGeometry(0.49, 16, 16);
  // const iapetusMat = new THREE.MeshLambertMaterial({ 
  //   map: textureLoader.load("textures/iapetus_texture.png") 
  // });
  // iapetus = new THREE.Mesh(iapetusGeo, iapetusMat);
  // iapetusObj = new THREE.Object3D();
  // iapetusObj.add(iapetus);
  // scene.add(iapetusObj);
  // iapetus.position.x = 28;

  //Dione body
  // const dioneGeo = new THREE.SphereGeometry(0.37433, 16, 16);
  // const dioneMat = new THREE.MeshLambertMaterial({
  //    map: textureLoader.load("textures/dione_texture.png") 
  // });
  // dione = new THREE.Mesh(dioneGeo, dioneMat);
  // dioneObj = new THREE.Object3D();
  // dioneObj.add(dione);
  // scene.add(dioneObj);
  // dione.position.x = 17.5;

  //Tethys body
  // const tethysGeo = new THREE.SphereGeometry(0.354, 16, 16);
  // const tethysMat = new THREE.MeshLambertMaterial({ 
  //   map: textureLoader.load("textures/tethys_texture.png") 
  // });
  // tethys = new THREE.Mesh(tethysGeo, tethysMat);
  // tethysObj = new THREE.Object3D();
  // tethysObj.add(tethys);
  // scene.add(tethysObj);
  // tethys.position.x = 14.8;

  //Enceladus body
  // const enceladusGeo = new THREE.SphereGeometry(0.168, 16, 16);
  // const enceladusMat = new THREE.MeshLambertMaterial({
  //    map: textureLoader.load("textures/enceladus_texture.png") 
  // });
  // enceladus = new THREE.Mesh(enceladusGeo, enceladusMat);
  // enceladusObj = new THREE.Object3D();
  // enceladusObj.add(enceladus);
  // scene.add(enceladusObj);
  // enceladus.position.x = 12.9;

  //Mimas body
  // const mimasGeo = new THREE.SphereGeometry(0.132, 16, 16);
  // const mimasMat = new THREE.MeshLambertMaterial({
  //   map: textureLoader.load("textures/mimas_texture.png") 
  // });
  // mimas = new THREE.Mesh(mimasGeo, mimasMat);
  // mimasObj = new THREE.Object3D();
  // mimasObj.add(mimas);
  // scene.add(mimasObj);
  // mimas.position.x = 11.1;
  
  //Titan body
  // const titanGeo = new THREE.SphereGeometry(0.716, 16, 16);
  // const titanMat = new THREE.MeshLambertMaterial({
  //   map: textureLoader.load("textures/titan_texture.png") 
  // });
  // titan = new THREE.Mesh(titanGeo, titanMat);
  // titanObj = new THREE.Object3D();
  // titanObj.add(titan);
  // scene.add(titanObj);
  // titan.position.x = 23;

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
  controls.maxDistance = 50000;
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