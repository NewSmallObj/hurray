"use client";

import { useSize, useThrottleEffect } from "ahooks";
import { useEffect, useRef } from "react";
import * as THREE from "three";
// 导入轨道控制器

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export const useThree = () => {
  
  const renderer = useRef<THREE.WebGLRenderer>()
  const size = useSize(() => document.querySelector('#three'))
  const scene = new THREE.Scene();
  
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 材质
  const cube = new THREE.Mesh(geometry, material); // 网格模型
  
  const camera = new THREE.PerspectiveCamera(
    45, // 视角
    size?.width! / size?.height!, // 宽高比
    0.1, // 近裁剪面
    1000 // 远裁剪面 
  );
  const axesHelper = new THREE.AxesHelper(5); // 辅助坐标系
  const controls = useRef<any>()
 

  const init = ()=>{
    renderer.current = new THREE.WebGLRenderer();
    renderer.current.setSize(size?.width!, size?.height!);
    document.querySelector('#three')?.appendChild(renderer.current.domElement)

    controls.current = new OrbitControls(camera, renderer.current!.domElement);
    controls.current.enableDamping = true; // 阻尼
    controls.current.dampingFactor = 0.05; // 阻尼惯性
    controls.current.autoRotate = true; // 自动旋转
    
    scene.add(cube);
    scene.add(axesHelper);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 2;
    
    camera.lookAt(0, 0, 0);
    
    animate()
  }

  const animate = () => {
    requestAnimationFrame(animate);
    controls.current.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.current!.render(scene, camera);
  };

  return {
    animate,
    init
  }
}