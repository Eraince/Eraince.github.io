import * as THREE from "../resources/three.module.js";
import { DragControls } from "../resources/examples/jsm/controls/DragControls.js";
function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  var objects = [];

  //fonts loading and creating
  var loader = new THREE.FontLoader();
  loader.load(
    "../resources/examples/fonts/optimer_regular.typeface.json",
    function(font) {
      var geometry1 = new THREE.TextBufferGeometry("Single", {
        font: font,
        size: 50,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });

      var material1 = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        flatShading: true
      });

      var mesh1 = new THREE.Mesh(geometry1, material1);

      mesh1.position.y = -50;
      mesh1.position.x = -450;

      objects.push(mesh1);
      scene.add(mesh1);

      var geometry2 = new THREE.TextBufferGeometry("Truth", {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });

      var material2 = new THREE.MeshPhongMaterial({
        color: 0xffa500,
        flatShading: true
      });

      var mesh2 = new THREE.Mesh(geometry2, material2);

      mesh2.position.y = -100;
      mesh2.position.x = -300;
      mesh2.position.z = 20;
      mesh2.rotation.x = -0.7;

      objects.push(mesh2);
      scene.add(mesh2);

      var geometry3 = new THREE.TextBufferGeometry("?", {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });

      var material3 = new THREE.MeshPhongMaterial({
        color: 0xffa500,
        flatShading: true
      });

      var mesh3 = new THREE.Mesh(geometry3, material3);

      mesh3.position.y = -100;
      mesh3.position.x = -400;
      // mesh3.rotation.y = -90;
      mesh3.position.z = 20;

      objects.push(mesh3);
      scene.add(mesh3);
    }
  );

  //set up scene

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0.4, 0.5, 0.7);
  scene.background = new THREE.Color(1, 1, 1);

  //add a directional light

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  {
    const color = 0x51eff5;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  //add meshes ---------- 1st geo

  var radius1 = 200;

  var geometry1 = new THREE.IcosahedronBufferGeometry(radius1, 1);

  var count = geometry1.attributes.position.count;
  geometry1.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(count * 3), 3)
  );

  var color = new THREE.Color();
  var positions1 = geometry1.attributes.position;

  var colors1 = geometry1.attributes.color;

  for (var i = 0; i < count; i++) {
    var hue1 = ((positions1.getX(i) / radius1 + 1) / 2) * 0.5 + 0.4;
    color.setHSL(hue1, 1, 0.6);
    colors1.setXYZ(i, color.r, color.g, color.b);
  }

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
    vertexColors: THREE.VertexColors,
    shininess: 0
  });

  var wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    transparent: true
  });

  var mesh = new THREE.Mesh(geometry1, material);
  var wireframe = new THREE.Mesh(geometry1, wireframeMaterial);
  mesh.add(wireframe);
  mesh.position.x = 0;
  mesh.rotation.x = -1.87;
  objects.push(mesh);
  scene.add(mesh);
  // --------------------------------------------------------------

  // add 2nd geo

  var radius2 = 200;
  var geometry2 = new THREE.TetrahedronBufferGeometry(radius2);
  var material2 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide
  });

  const hue = Math.random();
  const saturation = 1;
  const luminance = 0.5;
  material2.color.setHSL(hue, saturation, luminance);

  var mesh2 = new THREE.Mesh(geometry2, material2);
  var wireframe2 = new THREE.Mesh(geometry2, wireframeMaterial);
  mesh2.add(wireframe2);
  mesh2.position.x = -150;
  mesh2.position.y = 200;
  mesh2.rotation.x = 90;

  objects.push(mesh2);
  scene.add(mesh2);

  // ----------------------------------

  //add 3rd geo

  const geometry3 = new THREE.BoxBufferGeometry(200, 200, 10);

  var material3 = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide
  });

  material3.color.setHSL(0.16, 1, 0.5);

  var mesh3 = new THREE.Mesh(geometry3, material3);
  var wireframe3 = new THREE.Mesh(geometry3, wireframeMaterial);
  mesh3.add(wireframe3);
  mesh3.position.x = 130;
  mesh3.position.y = 180;
  mesh3.rotation.y = 60;
  mesh3.rotation.x = -60;

  objects.push(mesh3);
  scene.add(mesh3);

  // ---------------------------

  //setup views
  var views = [
    {
      left: 0,
      bottom: 0,
      width: 1,
      height: 1,
      eye: [0, 300, 1800],
      up: [0, 1, 0],
      fov: 30,
      draggable: true,
      updateCamera: function(camera, scene) {
        camera.lookAt(scene.position);
      }
    },
    {
      left: 0,
      bottom: 0,
      width: 0.25,
      height: 0.3,
      eye: [0, -800, 1000],
      up: [0, 0, 1],
      fov: 45,
      updateCamera: function(camera, scene) {
        camera.lookAt(scene.position);
      }
    },
    {
      left: 0.25,
      bottom: 0,
      width: 0.25,
      height: 0.3,
      eye: [-400, 1500, 0],
      up: [0, 0, 1],
      fov: 25,
      updateCamera: function(camera, scene) {
        camera.lookAt(objects[0].position);
      }
    },

    {
      left: 0.5,
      bottom: 0,
      width: 0.25,
      height: 0.3,
      eye: [1400, 800, 1800],
      up: [0, 1, 0],
      fov: 25,
      updateCamera: function(camera, scene) {
        camera.lookAt(scene.position);
      }
    },
    {
      left: 0.75,
      bottom: 0,
      width: 0.25,
      height: 0.3,
      eye: [0, 1800, -300],
      up: [1, 0, -1],
      fov: 50,
      updateCamera: function(camera, scene) {
        camera.lookAt(scene.position);
      }
    },
    {
      left: 0,
      bottom: 0.7,
      width: 0.25,
      height: 0.3,
      eye: [300, -1800, -100],
      up: [0, 0, 1],
      fov: 35,
      updateCamera: function(camera, scene) {
        camera.lookAt(scene.position);
      }
    },
    {
      left: 0.25,
      bottom: 0.7,
      width: 0.25,
      height: 0.3,
      eye: [1400, 800, 1400],
      up: [0, 1, 0],
      fov: 60,
      updateCamera: function(camera, scene) {
        camera.lookAt(scene.position);
      }
    },
    {
      left: 0.5,
      bottom: 0.7,
      width: 0.25,
      height: 0.3,
      eye: [-1400, 100, 200],
      up: [0, -1, 0],
      fov: 40,
      updateCamera: function(camera, scene) {
        camera.lookAt(scene.position);
      }
    },
    {
      left: 0.75,
      bottom: 0.7,
      width: 0.25,
      height: 0.3,
      eye: [-800, 50, 500],
      up: [0, 1, 0],
      fov: 20,
      updateCamera: function(camera, scene) {
        camera.lookAt(objects[2].position);
      }
    },

    {
      left: 0,
      bottom: 0.3,
      width: 0.25,
      height: 0.4,
      eye: [-300, 450, 400],
      up: [1, 1, 0],
      fov: 40,
      updateCamera: function(camera, scene) {
        var singlePosition = new THREE.Vector3(-300, -450, 0);
        camera.lookAt(singlePosition);
      }
    },
    {
      left: 0.75,
      bottom: 0.3,
      width: 0.25,
      height: 0.4,
      eye: [800, 1500, 0],
      up: [0, 1, 0],
      fov: 35,
      updateCamera: function(camera, scene) {
        camera.lookAt(scene.position);
      }
    }
  ];

  //config view

  for (var i = 0; i < views.length; i++) {
    var view = views[i];
    var camera = new THREE.PerspectiveCamera(
      view.fov,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.fromArray(view.eye);
    camera.up.fromArray(view.up);
    view.camera = camera;

    if (view.draggable) {
      const dragControl = new DragControls(
        objects,
        camera,
        renderer.domElement
      );
      dragControl.addEventListener("dragstart", function(event) {
        event.object.material.emissive.set(0xaaaaaa);
      });

      dragControl.addEventListener("dragend", function(event) {
        event.object.material.emissive.set(0x000000);
      });
    }
  }

  //add animation loop

  function render() {
    const canvas = renderer.domElement;
    const windowWidth = canvas.clientWidth;
    const windowHeight = canvas.clientHeight;

    for (var ii = 0; ii < views.length; ++ii) {
      var view = views[ii];
      var camera = view.camera;
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      view.updateCamera(camera, scene);

      var left = Math.floor(windowWidth * view.left);
      var bottom = Math.floor(windowHeight * view.bottom);
      var width = Math.floor(windowWidth * view.width);
      var height = Math.floor(windowHeight * view.height);

      renderer.setViewport(left, bottom, width, height);
      renderer.setScissor(left, bottom, width, height);
      renderer.setScissorTest(true);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
    }
    objects[0].rotation.y += 0.005;
    objects[0].rotation.x += 0.005;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // responsive resize of canvas

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
document.querySelector("button").addEventListener("click", () => {
  document.querySelector("#float").style.display = "none";
});
main();
