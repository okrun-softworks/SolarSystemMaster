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
  
var milkyWayBoxMotion1ZParticles = new THREE.PointCloud(milkyWayBoxMotion1Z, 
  new THREE.PointCloudMaterial({color: 0xffffff}));
  
milkyWayBoxMotion1ZParticles.boundingSphere = 50;