import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
    alpha: true,// to have transparent background
    antialias: true // to have smooth edges
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new THREE.TextureLoader();

var geometry = new THREE.PlaneGeometry(5, 3, 50, 30);
var material = new THREE.MeshBasicMaterial({
    // color: 0xff0000,
    map:loader.load('flag.jpg')
});
var flag = new THREE.Mesh(geometry, material);
scene.add(flag);

flag.rotation.set(-0.1, 0, 0);

camera.position.z = 5;

const clock = new THREE.Clock();

function animate() {

    const t = clock.getElapsedTime()
    for (var i = 0; i < geometry.attributes.position.count; i++) {
        var x = geometry.attributes.position.getX(i);
        var y = geometry.attributes.position.getY(i);

        const waveX1 = Math.sin(x * 1 + t * 1) * 0.5;
        const waveX2 = Math.sin(x * 3 + t * 2) * 0.25;
        const waveY1 = Math.sin(y * 5 + t * 0.75) * 0.1;
        const multi = (x + 2.5) / 3

        // Modify the z-coordinate of the vertex using a single formula
        geometry.attributes.position.setZ(i, (waveX1 + waveX2 + waveY1)* multi);
    }

    // Update the geometry
    geometry.attributes.position.needsUpdate = true;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", function (){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight);
})