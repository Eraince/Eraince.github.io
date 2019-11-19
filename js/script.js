import * as THREE from "../resources/three.module.js";
import { OrbitControls } from "../resources/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "../resources/examples/jsm/loaders/OBJLoader2.js";
import { MTLLoader } from "../resources/examples/jsm/loaders/MTLLoader.js";
import { MtlObjBridge } from "../resources/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";
import { DragControls } from "../resources/examples/jsm/controls/DragControls.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });
  // canvas.appendChild(renderer.domElement);

  // set up camera
  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 50);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  //set up scene

  const scene = new THREE.Scene();

  //add a ambient light

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);

    scene.add(light);
  }

  {
    const skyLoader = new THREE.CubeTextureLoader();
    const texture = skyLoader.load([
      "../skybox/BrightMorning01_RT.png",
      "../skybox/BrightMorning01_LF.png",
      "../skybox/BrightMorning01_UP.png",
      "../skybox/BrightMorning01_DN.png",
      "../skybox/BrightMorning01_FR.png",
      "../skybox/BrightMorning01_BK.png"
    ]);
    scene.background = texture;
  }

  {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader2();
    mtlLoader.load("../obj.mtl", mtlParseResult => {
      const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);
      objLoader.load("../tinker.obj", root => {
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        root.applyQuaternion(quaternion);

        console.log(root.scale);
        scene.add(root);
      });
    });
  }

  //add shapes

  const planeSize = 40;
  const loader = new THREE.TextureLoader();
  const texture = loader.load("resources/images/checker.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -0.5;
  scene.add(mesh);

  // -----------------------------------------

  const objects = [];

  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    objects.push(mesh);
    scene.add(mesh);
  }

  {
    const torusRadius = 3;
    const tubeRadius = 1.5;
    const radialSegments = 8;
    const tubularSegments = 24;
    const torusGeo = new THREE.TorusBufferGeometry(
      torusRadius,
      tubeRadius,
      radialSegments,
      tubularSegments
    );
    const torusMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(torusGeo, torusMat);
    mesh.position.set(torusRadius + 10, torusRadius + 2, 0);
    objects.push(mesh);
    scene.add(mesh);
  }

  {
    const radiusTop = 4;
    const radiusBottom = 4;
    const height = 8;
    const radialSegments = 12;
    const cylinderGeo = new THREE.CylinderBufferGeometry(
      radiusTop,
      radiusBottom,
      height,
      radialSegments
    );
    const cylinderMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    mesh.position.set(-10, 10, 0);
    objects.push(mesh);
    scene.add(mesh);
  }

  {
    const radius = 7;
    const geometry = new THREE.TetrahedronBufferGeometry(radius);
    const octMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(geometry, octMat);
    mesh.position.set(-20, 10, 0);
    objects.push(mesh);
    scene.add(mesh);
  }
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereBufferGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    objects.push(mesh);
    scene.add(mesh);
  }
  // ----------------------------------------------------------------------

  const dragControl = new DragControls(objects, camera, renderer.domElement);
  console.log(dragControl);
  dragControl.addEventListener("dragstart", function(event) {
    event.object.material.emissive.set(0xaaaaaa);
  });

  dragControl.addEventListener("dragend", function(event) {
    event.object.material.emissive.set(0x000000);
  });

  //add animation loop

  function render(time) {
    time *= 0.001;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  //responsive resize of canvas

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width != width || canvas.height != height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
}

main();
