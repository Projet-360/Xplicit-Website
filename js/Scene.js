import * as THREE from 'three';
import {
  OrbitControls
} from './lib/three/OrbitControls.js';
import {
  GLTFLoader
} from './lib/three/GLTFLoader.js';

export class Scene {
  constructor(canvasId, url) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    this.url = url;

    // NOTE: Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;

    this.loadedModel = undefined;
    this.filetarget = undefined;

    this.fileLoader = document.querySelector('#fileLoader')
    this.holder = document.getElementById('holder');
    this.fileLoader.addEventListener("change", (e) => {
      e.preventDefault();
      this.filetarget = e.target.files[0];
      this.convertImage(this.filetarget);
    });

    this.initialize();
    this.animate();
    this.setupDragDrop()


    this.holder.addEventListener("drop", (event) => {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged element to the selected drop target
      this.className = '';
      event.preventDefault();

      var file = event.dataTransfer.files[0]
      this.convertImage(file)
    });
  }

  initialize() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
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

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.shadowMap.enabled = true;

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    // this.controls.minPolarAngle = Math.PI/2;
    // this.controls.maxPolarAngle = Math.PI/2;

    
    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);    

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.castShadow = true;
    //this.directionalLight.position.set(0, 32, 64);
    this.directionalLight.position.copy(this.camera.localToWorld(new THREE.Vector3(-1, 1, 0)));
    this.camera.add(this.directionalLight);

    this.scene.add(this.camera);


    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);

    const glftLoader = new GLTFLoader();

    glftLoader.load('../model/0.gltf', (gltfScene) => {
      this.loadedModel = gltfScene;

      let tex = new THREE.TextureLoader().load(this.url);
      tex.flipY = false;

      this.loadedModel.scene.children[0].children[1].material.map = tex

      this.loadedModel.scene.children[0].children[1].material.alphaTest = 1;
      this.loadedModel.scene.children[0].children[1].material.transparent = true;      
      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = -21;
      gltfScene.scene.rotation.z = 6;
      gltfScene.scene.scale.set(300, 300, 300);
      this.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (this.loadedModel) {
        this.loadedModel.scene.rotation.y += 0.008;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    //this.stats.update();
    this.controls.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  convertImage = async (filetarget) => {
    const base64 = await this.convertBase64(filetarget);
    this.handleLoadedImage(base64)
  };

  handleLoadedImage(base64) {
    var tex = new THREE.TextureLoader().load(base64);
    tex.flipY = false;

    this.loadedModel.scene.traverse(function (node) {
      if (node.isMesh) node.material.map = tex;
    });

    this.scene.add(this.loadedModel.scene);
  }

  setupDragDrop = () => {
    // check if filereader is available

      if (typeof window.FileReader === 'undefined') {
        console.error("Filereader not supported");
      }

      this.holder.ondragend = function () {
        this.className = '';
        return false;
      }

      this.holder.ondragover = function () {
        this.className = 'hover';
        return false;
      }

      holder.ondrop = function (e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0],
                reader = new FileReader();
        reader.onload = function (event) {                        
            var texture = new THREE.Texture(image);
            texture.needsUpdate = true;

        };
        reader.readAsDataURL(file);
        return false;
    }
  }
}