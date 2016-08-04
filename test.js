

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var views, scene, renderer;

var mesh, group1, group2, group3, light;

var mouseX = 0, mouseY = 0;

var windowWidth, windowHeight;

var views = [
    {
        left: 0,
        bottom: 0,
        width: 0.5,
        height: 1.0,
        background: new THREE.Color().setRGB( 0.5, 0.5, 0.7 ),
        eye: [ 0, 300, 1800 ],
        up: [ 0, 1, 0 ],
        fov: 30,
        updateCamera: function ( camera, scene, mouseX, mouseY ) {
            camera.position.x += mouseX * 0.05;
            camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
            camera.lookAt( scene.position );
        }
    },
    {
        left: 0.5,
        bottom: 0,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color().setRGB( 0.7, 0.5, 0.5 ),
        eye: [ 0, 1800, 0 ],
        up: [ 0, 0, 1 ],
        fov: 45,
        updateCamera: function ( camera, scene, mouseX, mouseY ) {
            camera.position.x -= mouseX * 0.05;
            camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
            camera.lookAt( camera.position.clone().setY( 0 ) );
        }
    },
    {
        left: 0.5,
        bottom: 0.5,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color().setRGB( 0.5, 0.7, 0.7 ),
        eye: [ 1400, 800, 1400 ],
        up: [ 0, 1, 0 ],
        fov: 60,
        updateCamera: function ( camera, scene, mouseX, mouseY ) {
            camera.position.y -= mouseX * 0.05;
            camera.position.y = Math.max( Math.min( camera.position.y, 1600 ), -1600 );
            camera.lookAt( scene.position );
        }
    }
];

init();
animate();

function init() {

    container = document.getElementById( 'container' );

    for (var ii =  0; ii < views.length; ++ii ) {

        var view = views[ii];
        camera = new THREE.PerspectiveCamera( view.fov, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.x = view.eye[ 0 ];
        camera.position.y = view.eye[ 1 ];
        camera.position.z = view.eye[ 2 ];
        camera.up.x = view.up[ 0 ];
        camera.up.y = view.up[ 1 ];
        camera.up.z = view.up[ 2 ];
        view.camera = camera;
    }

    scene = new THREE.Scene();

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 );
    scene.add( light );

    // shadow

    var canvas = document.createElement( 'canvas' );
    canvas.width = 128;
    canvas.height = 128;

    var context = canvas.getContext( '2d' );
    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0.1, 'rgba(0,0,0,0.15)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,0)' );

    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );

    var shadowTexture = new THREE.CanvasTexture( canvas );

    var shadowMaterial = new THREE.MeshBasicMaterial( { map: shadowTexture, transparent: true } );
    var shadowGeo = new THREE.PlaneBufferGeometry( 300, 300, 1, 1 );

    mesh = new THREE.Mesh( shadowGeo, shadowMaterial );
    mesh.position.y = - 250;
    mesh.rotation.x = - Math. PI / 2;
    scene.add( mesh );

    mesh = new THREE.Mesh( shadowGeo, shadowMaterial );
    mesh.position.x = - 400;
    mesh.position.y = - 250;
    mesh.rotation.x = - Math. PI / 2;
    scene.add( mesh );

    mesh = new THREE.Mesh( shadowGeo, shadowMaterial );
    mesh.position.x = 400;
    mesh.position.y = - 250;
    mesh.rotation.x = - Math. PI / 2;
    scene.add( mesh );

    var faceIndices = [ 'a', 'b', 'c' ];

    var color, f, f2, f3, p, vertexIndex,

        radius = 200,

        geometry  = new THREE.IcosahedronGeometry( radius, 1 ),
        geometry2 = new THREE.IcosahedronGeometry( radius, 1 ),
        geometry3 = new THREE.IcosahedronGeometry( radius, 1 );

    for ( var i = 0; i < geometry.faces.length; i ++ ) {

        f  = geometry.faces[ i ];
        f2 = geometry2.faces[ i ];
        f3 = geometry3.faces[ i ];

        for( var j = 0; j < 3; j++ ) {

            vertexIndex = f[ faceIndices[ j ] ];

            p = geometry.vertices[ vertexIndex ];

            color = new THREE.Color( 0xffffff );
            color.setHSL( ( p.y / radius + 1 ) / 2, 1.0, 0.5 );

            f.vertexColors[ j ] = color;

            color = new THREE.Color( 0xffffff );
            color.setHSL( 0.0, ( p.y / radius + 1 ) / 2, 0.5 );

            f2.vertexColors[ j ] = color;

            color = new THREE.Color( 0xffffff );
            color.setHSL( 0.125 * vertexIndex/geometry.vertices.length, 1.0, 0.5 );

            f3.vertexColors[ j ] = color;

        }

    }


    var materials = [

        new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 0 } ),
        new THREE.MeshBasicMaterial( { color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true } )

    ];

    group1 = THREE.SceneUtils.createMultiMaterialObject( geometry, materials );
    group1.position.x = -400;
    group1.rotation.x = -1.87;
    scene.add( group1 );

    group2 = THREE.SceneUtils.createMultiMaterialObject( geometry2, materials );
    group2.position.x = 400;
    group2.rotation.x = 0;
    scene.add( group2 );

    group3 = THREE.SceneUtils.createMultiMaterialObject( geometry3, materials );
    group3.position.x = 0;
    group3.rotation.x = 0;
    scene.add( group3 );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowWidth / 2 );
    mouseY = ( event.clientY - windowHeight / 2 );

}

function updateSize() {

    if ( windowWidth != window.innerWidth || windowHeight != window.innerHeight ) {

        windowWidth  = window.innerWidth;
        windowHeight = window.innerHeight;

        renderer.setSize ( windowWidth, windowHeight );

    }

}

function animate() {

    render();
    stats.update();

    requestAnimationFrame( animate );
}

function render() {

    updateSize();

    for ( var ii = 0; ii < views.length; ++ii ) {

        view = views[ii];
        camera = view.camera;

        view.updateCamera( camera, scene, mouseX, mouseY );

        var left   = Math.floor( windowWidth  * view.left );
        var bottom = Math.floor( windowHeight * view.bottom );
        var width  = Math.floor( windowWidth  * view.width );
        var height = Math.floor( windowHeight * view.height );
        renderer.setViewport( left, bottom, width, height );
        renderer.setScissor( left, bottom, width, height );
        renderer.setScissorTest( true );
        renderer.setClearColor( view.background );

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.render( scene, camera );
    }

}

		