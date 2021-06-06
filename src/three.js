import {
  Scene,
  PerspectiveCamera,
  ReinhardToneMapping,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass";
import { SpotLight } from "three/src/lights/SpotLight";
import { HemisphereLight } from "three/src/lights/HemisphereLight";

let scene, camera, renderer, controls, composer, mesh;

function init() {
  scene = new Scene();
  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 5;

  renderer = new WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth * 0.65, window.innerWidth * 0.4);
  renderer.toneMapping = ReinhardToneMapping;
  renderer.toneMappingExposure = 2;
  renderContainer.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minPolarAngle = Math.PI / 2;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enableZoom = false;

  let light = new SpotLight(0xffffff, 4);
  light.position.set(-50, 50, 50);
  light.castShadow = true;
  light.shadow.bias = -0.0001;
  light.shadow.mapSize.width = 1024 * 4;
  light.shadow.mapSize.height = 1024 * 4;
  scene.add(light);

  const hemiLight = new HemisphereLight(0xffffff, 0x080820, 4);
  scene.add(hemiLight);

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  let msaaRenderPass = new SSAARenderPass(scene, camera);
  msaaRenderPass.unbiased = false;
  msaaRenderPass.sampleLevel = 2;
  composer.addPass(msaaRenderPass);

  new GLTFLoader().load("./model/scene.glb", function (gltf) {
    mesh = gltf.scene.children[0];
    mesh.position.set(0, -1, 0);

    scene.add(mesh);

    animate();
  });
}
function animate() {
  mesh.rotation.z += 0.0005;
  composer.render();
  requestAnimationFrame(animate);
}
init();
