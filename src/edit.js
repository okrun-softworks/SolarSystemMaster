  // pluto
  const plutoGeo = new THREE.SphereGeometry(24.397, 30, 30, 6);
  const plutoMat = new THREE.MeshLambertMaterial({
    map: textureLoader.load("resources/wrappers/plutoTexture.png") 
  });
  pluto = new THREE.Mesh(plutoGeo, plutoMat);
  pluto.rotation.x = Math.PI * 0.002;
  plutoObj = new THREE.Object3D();
  plutoObj.add(pluto);
  scene.add(plutoObj);
  pluto.position.set(73759.3, 0, 0); 