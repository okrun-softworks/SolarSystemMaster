var saturnRing2Distance = 1050;
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