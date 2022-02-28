    //MilkyWayBoxMotion
  var milkyWayBoxMotionDistance = 186000000;    
  var milkyWayBoxMotion = new THREE.Geometry();
  
  for (var i = 0; i < 100; i++) {
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

  scene.add(milkyWayBoxMotionParticles); 