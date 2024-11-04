"use client";

import { useSize, useThrottleEffect } from "ahooks";
import { useEffect, useRef } from "react";
import * as THREE from "three";
// 导入轨道控制器

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";

const skill = [
  { name: 'node', postion: { x: 0.41, y: -0.57, z: 1.4 } },
  { name: 'three', postion: { x: 0.41, y: -0.57, z: 1.4 } },
  { name: 'react', postion: { x: 0.41, y: -0.57, z: 1.4 } },
  { name: 'vue', postion: { x: 0.41, y: -0.57, z: 1.4 } },
  { name: 'js', postion: { x: 0.41, y: -0.57, z: 1.4 } },
  { name: 'ts', postion: { x: 0.41, y: -0.57, z: 1.4 } },
  { name: 'mysql', postion: { x: 0.41, y: -0.57, z: 1.4 } },
  { name: 'mongodb', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'git', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'next', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'tailwind', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'less', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'sass', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'nest', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'prisma', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'antd', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'redux', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'element', postion: { x: 0.41, y: -0.57, z: 1.4 }},
  { name: 'vant', postion: { x: 0.41, y: -0.57, z: 1.4 }},
]

export const useThree3 = () => {

  const renderer = useRef<THREE.WebGLRenderer>()
  const size = useSize(() => document.querySelector('#three'))
  const scene = new THREE.Scene();
  const controls = useRef<any>()

  scene.background = null; //new THREE.Color( 0xbfe3dd )

  // const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); // 立方体
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 材质
  // const cube = new THREE.Mesh(geometry, material); // 网格模型

  // 多面体
  const geometry = new THREE.DodecahedronGeometry( 0.2, 0 ); //BoxGeometry(0.15,0.15,0.15) //
  const material = new THREE.MeshStandardMaterial( {
    color: 0x915eff, // new THREE.Color().setHSL( Math.random(), 1, 0.75, THREE.SRGBColorSpace ),
    roughness: 0.5,
    metalness: 0,
    flatShading: true
  });
  const cube = new THREE.Mesh( geometry, material ) 
  cube.position.set(0.41, -0.57, 1.4) // 0.33 0.66 2.62
  const cubeHelper = new THREE.BoxHelper(cube);

  // 环境光
  const ambientLight = new THREE.AmbientLight( 0xffffff ,0.5);
  ambientLight.color = new THREE.Color(0xffffff)
  ambientLight.intensity = 0.5
  
  // 添加平行光
  const light = new THREE.DirectionalLight(0xffffff, 1.62);
  light.castShadow = true 
  const lightHelper = new THREE.DirectionalLightHelper( light, 5 )
  light.position.set(-0.57, 1.89, 4.84);
  
  // 创建一个聚光灯
  const spotLight = new THREE.SpotLight(0xffffff, 1.19);
  spotLight.castShadow = true // 顶部光源开启阴影
  spotLight.position.set(-1.06, 1.4, -0.08); // 设置聚光灯的位置
  spotLight.angle = Math.PI / 1; // 聚光灯的视角
  spotLight.distance = 2.13; // 灯光距离
  spotLight.penumbra = 10; // 聚光灯的半影
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);

  // 点光源
  const ghost1 = new THREE.PointLight('#ff00ff', 2, 0)
  const ghost2 = new THREE.PointLight('#00ffff', 2, 0)
  const ghost3 = new THREE.PointLight('#ffff00', 2, 0)
  ghost1.position.set(0, 1.2, 0)
  ghost2.position.set(0, 1.2, 0)
  ghost3.position.set(0, 1.2, 0)
  const ghost1Helper = new THREE.PointLightHelper(ghost2, 0.2);
  
  // 辅助坐标系
  const axesHelper = new THREE.AxesHelper(5); 

  // 初始化loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  const camera = new THREE.PerspectiveCamera(
    35, // 视角
    size?.width! / size?.height!, // 宽高比
    0.1, // 近裁剪面
    1000 // 远裁剪面 
  );
  

  const init = () => {
    renderer.current = new THREE.WebGLRenderer({
      alpha: true, // 背景透明
      antialias: true, // 抗锯齿
    });
    renderer.current.setSize(size?.width!, size?.height!);
    document.querySelector('#three')?.appendChild(renderer.current.domElement)

    controls.current = new OrbitControls(camera, renderer.current!.domElement);
    controls.current.enableDamping = true; // 阻尼
    controls.current.dampingFactor = 0.05; // 阻尼惯性
    // controls.current.autoRotate = true; // 自动旋转

    gltfLoader.load('/models/programmer/scene.gltf', (gltf: any) => {
      const model = gltf.scene;
      const boundingBox = new THREE.Box3().setFromObject(model);
      const size = boundingBox.getSize(new THREE.Vector3());
      // model.rotation.y = Math.PI / 180 * 300;
      console.log('Model size:', size);

      model.scale.set(0.25, 0.25, 0.25);
      scene.add(model);

    });
    

    scene.add(ambientLight); // 环境光
    scene.add(light); // 平行光
    // scene.add(lightHelper); // 平行光辅助
    // scene.add(spotLight); // 聚光灯
    // scene.add(spotLightHelper); // 聚光灯辅助
    scene.add(ghost1)
    scene.add(ghost2)
    scene.add(ghost3)
    // scene.add(ghost1Helper)
    scene.add(cube);

    scene.add(cubeHelper);

    camera.position.set(-3.23, 2.98, 4.06)
    camera.updateProjectionMatrix()


    const gui = new GUI();
    // 平行光参数
    const folder = gui.addFolder('Light')
    folder.add(light.position, 'x').min(-10).max(10).step(0.01)
    folder.add(light.position, 'y').min(-10).max(10).step(0.01)
    folder.add(light.position, 'z').min(-10).max(10).step(0.01)
    folder.add(light,'intensity').min(0).max(5).step(0.01)
      
    // 环境光参数
    gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
    
    // 聚光灯参数
    const spotgroup = gui.addFolder('Spot-Light');
    spotgroup.add(spotLight.position,'x').min(-10).max(10).step(0.01);
    spotgroup.add(spotLight.position,'y').min(-10).max(10).step(0.01);
    spotgroup.add(spotLight.position,'z').min(-10).max(10).step(0.01);
    spotgroup.add(spotLight,'angle').min(-10).max(Math.PI/2).step(0.01); // 夹角
    spotgroup.add(spotLight,'penumbra').min(-10).max(10).step(0.01); //半影
    spotgroup.add(spotLight,'intensity').min(-10).max(20).step(0.01); //强度
    spotgroup.add(spotLight,'distance').min(-10).max(10).step(0.01); //距离


    // 点光源参数
    const ghostgroup = gui.addFolder('Ghost-Light');
    ghostgroup.add(ghost1.position,'x').min(-10).max(10).step(0.01);
    ghostgroup.add(ghost1.position,'y').min(-10).max(10).step(0.01);
    ghostgroup.add(ghost1.position,'z').min(-10).max(10).step(0.01);

    // 多面体参数
    const cubeHelpergroup = gui.addFolder('Cube-Helper');
    cubeHelpergroup.add(cube.position,'x').min(-10).max(10).step(0.01);
    cubeHelpergroup.add(cube.position,'y').min(-10).max(10).step(0.01);
    cubeHelpergroup.add(cube.position,'z').min(-10).max(10).step(0.01);
    
    // scene.add(axesHelper); // 辅助坐标系
    animate()
    tick()
  }

  

  const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Ghosts
  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.cos(ghost1Angle) * 1.5
  ghost1.position.z = Math.sin(ghost1Angle) * 1.5
  // ghost1.position.y = Math.sin(elapsedTime * 3)

  const ghost2Angle = -elapsedTime * 0.32
  ghost2.position.x = Math.cos(ghost2Angle) * 1.5
  ghost2.position.z = Math.sin(ghost2Angle) * 1.5
  // ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

  const ghost3Angle = -elapsedTime * 0.18
  ghost3.position.x = Math.cos(ghost3Angle) * (3 + Math.sin(elapsedTime * 0.32))
  ghost3.position.z = Math.sin(ghost3Angle) * (3 + Math.sin(elapsedTime * 0.5))
  // ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

  requestAnimationFrame(tick)
}

  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.current!.render(scene, camera);
    controls.current.update();
  };

  return {
    animate,
    init
  }
}