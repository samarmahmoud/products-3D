var obj, camera, scene, renderer,stats;
var targetRotationX = 0.5;
var targetRotationOnMouseDownX = 0;
var targetRotationY = 0.2;
var targetRotationOnMouseDownY = 0;
var mouseX = 0, mouseY = 0;

var mouseXOnMouseDown = 0,mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var slowingFactor = 0.25;

var maxRotation = 2 * Math.PI;
var raycaster = new THREE.Raycaster();
 var mouse = new THREE.Vector2();
var modelUrl='/models/Only_Spider_with_Animations_Export.obj';
var materialsUrl='/models/Only_Spider_with_Animations_Export.mtl';
main();

 function main()
 {
    init(modelUrl,materialsUrl);
    animate();
 }
 function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

 function init(modelUrl,materialsUrl) {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 150;
    scene = new THREE.Scene();
	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
		directionalLight.position.set( 1, 1, 1 );
        scene.add( directionalLight );
        obj=new THREE.Mesh();
     //loading model

     var mtlLoader = new THREE.MTLLoader();
     mtlLoader.load(materialsUrl, function (materials) {     
     materials.preload();     
     var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);            
    objLoader.load(modelUrl, function (object) {
    object.position.set(0,150,0);
     obj=object;
     scene.add(obj);
     });
     });
 
    renderer = new THREE.WebGLRenderer({alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    var container = document.getElementById('canvasContainer');
    container.appendChild( renderer.domElement );
 
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    stats=new Stats();
}
function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}
 function render()
 {
  
rotateAroundWorldAxis(obj, new THREE.Vector3(0, 1, 0), targetRotationX);
 rotateAroundWorldAxis(obj, new THREE.Vector3(1, 0, 0), targetRotationY);
 targetRotationY = targetRotationY * (1 - slowingFactor);
  targetRotationX = targetRotationX * (1 - slowingFactor);
   renderer.render(scene, camera);
 }
 
 function rotateAroundObjectAxis(object, axis, radians) {
         var rotationMatrix = new THREE.Matrix4();
                rotationMatrix.makeRotationAxis(axis.normalize(), radians);
                object.matrix.multiply(rotationMatrix);
                object.rotation.setFromRotationMatrix( object.matrix );

  }

function rotateAroundWorldAxis( object, axis, radians ) {
              var rotationMatrix = new THREE.Matrix4();
              rotationMatrix.makeRotationAxis( axis.normalize(), radians );
              rotationMatrix.multiply( object.matrix );                       
              object.matrix = rotationMatrix;
              object.rotation.setFromRotationMatrix( object.matrix );
 }



///mouse handeler

function onDocumentMouseDown( event ) {

    event.preventDefault();
    
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );
    
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDownX = targetRotationX;
    
    mouseYOnMouseDown = event.clientY - windowHalfY;
    targetRotationOnMouseDownY = targetRotationY;
    }
    
    function onDocumentMouseMove( event ) {
    
    mouseX = event.clientX - windowHalfX;
    
    targetRotationX = ( mouseX - mouseXOnMouseDown ) * 0.00025;
    
    mouseY = event.clientY - windowHalfY;
    
    targetRotationY = ( mouseY - mouseYOnMouseDown ) * 0.00025;
    }
    
    function onDocumentMouseUp( event ) {
    
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
    }
    
    function onDocumentMouseOut( event ) {
    
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
    }
    
    