import * as THREE from 'three';
import {
  OrbitControls
} from './lib/three/OrbitControls.js';
import {
  GLTFLoader
} from './lib/three/GLTFLoader.js';

export class Product {
  constructor(canvasId, url) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 1;
    this.nearPlane = 1;
    this.farPlane = 10;
    this.canvasId = canvasId;
    this.container = document.querySelector(`#${canvasId}`).parentNode;
    this.url = url;

    this.width = undefined;
    this.height = undefined;

    // NOTE: Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;

    this.loadedModel = undefined;

    this.initialize();
    this.animate();
  }

  initialize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.width / this.height,
      1,
      100
    );

    this.camera.position.z = 48;
    this.camera.position.y = 50;

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });

    this.renderer.setSize(this.width, this.height);
    // this.renderer.shadowMap.enabled = true;

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.enableRotate = false;
    // this.controls.minPolarAngle = Math.PI/2;
    // this.controls.maxPolarAngle = Math.PI/2;

    const glftLoader = new GLTFLoader();

    glftLoader.load('../model/0.gltf', (gltfScene) => {
      this.loadedModel = gltfScene;

      let tex = new THREE.TextureLoader().load(this.url);
      tex.flipY = false;
      this.loadedModel.scene.children[0].children[1].material.map = tex

      this.loadedModel.scene.children[0].children[1].material.alphaTest = 1;
      this.loadedModel.scene.children[0].children[1].material.transparent = true;

      gltfScene.scene.position.y = -.8;
      gltfScene.scene.position.x = -.25;      
      gltfScene.scene.rotation.x = 5.5;
      console.log(gltfScene.scene.position.y);
      console.log(gltfScene.scene.position.x);
      gltfScene.scene.scale.set(8, 8, 8);
      this.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (this.loadedModel) {
        this.loadedModel.scene.rotation.y += 0.008;
      }
      requestAnimationFrame(animate);
    };
    animate();


    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.copy(this.camera.localToWorld(new THREE.Vector3(-1, 1, 0)));
    this.camera.add(this.directionalLight);

    this.scene.add(this.camera);


    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render() {
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
}