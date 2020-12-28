import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class ThreeScene extends Component {
  componentDidMount() {
    const width =  window.innerWidth;
    const height =  window.innerHeight;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdddddd);

    //add Camera
    this.camera = new THREE.PerspectiveCamera(40,width/height,1,5000);
    this.camera.rotation.y = 45/180*Math.PI;
    this.camera.position.x = 0;
    this.camera.position.y = 100;
    this.camera.position.z = 0;

    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#FFF");
    this.renderer.setSize(width,height);
    this.mount.appendChild(this.renderer.domElement);

    //Camera Controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    //LIGHTS
    var lights = [];
    lights[0] = new THREE.AmbientLight (0x404040,100);
    lights[1] = new THREE.DirectionalLight(0xffffff,100);
    lights[1].position.set(0,1,0);
    lights[1].castShadow = true;
    lights[2] = new THREE.PointLight(0xc4c4c4,10);
    lights[2].position.set(0,300,500);
    lights[3] = new THREE.PointLight(0xc4c4c4,10);
    lights[3].position.set(500,100,0);
    lights[4] = new THREE.PointLight(0xc4c4c4,10);
    lights[4].position.set(0,100,-500);
    lights[5] = new THREE.PointLight(0xc4c4c4,10);
    lights[5].position.set(-500,300,500);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
    this.scene.add(lights[3]);
    this.scene.add(lights[4]);
    this.scene.add(lights[5]);

    //Simple Box with WireFrame
    this.addModels();

    this.renderScene();
    //start animation
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    // -----Step 3--------
    //Rotate Models
    if (this.cube) this.cube.rotation.y += 0.01;
    if (this.freedomMesh) this.freedomMesh.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  addModels = () => {
    this.loader = new GLTFLoader();
    this.loader.load("/skull/scene.gltf", (gltf) => {
      this.scene.add(gltf.scene);
    });
  };

  render() {
    return (
      <div
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}
export default ThreeScene;
