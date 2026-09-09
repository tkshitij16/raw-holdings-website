'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const blocks = [
  [-4.8, -2.6, 0.8, 1.3, 1.2],
  [-3.6, -1.5, 1.1, 2.2, 0.9],
  [-2.1, -2.9, 1.4, 1.6, 1.1],
  [-0.5, -1.8, 0.8, 2.8, 0.8],
  [1.1, -2.8, 1.2, 1.9, 1.4],
  [2.5, -1.4, 0.9, 3.3, 0.9],
  [3.9, -2.5, 1.3, 2.4, 1.2],
  [5.1, -1.1, 0.8, 1.6, 0.8],
] as const;

export function HeroMapScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

    const world = new THREE.Group();
    scene.add(world);

    const grid = new THREE.GridHelper(18, 36, 0xb18a50, 0xa6aaa7);
    const gridMaterials = Array.isArray(grid.material)
      ? grid.material
      : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.22;
      material.depthWrite = false;
    });
    grid.position.y = -1.55;
    world.add(grid);

    const blockMaterial = new THREE.LineBasicMaterial({
      color: 0xd7d2c8,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });

    blocks.forEach(([x, z, width, height, depth]) => {
      const geometry = new THREE.EdgesGeometry(
        new THREE.BoxGeometry(width, height, depth),
      );
      const block = new THREE.LineSegments(geometry, blockMaterial);
      block.position.set(x, -1.55 + height / 2, z);
      world.add(block);
    });

    const routeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, -1.38, 1.4),
      new THREE.Vector3(-3.4, -1.22, 0.6),
      new THREE.Vector3(-0.8, -0.72, -0.2),
      new THREE.Vector3(2.2, 0.05, -1.15),
      new THREE.Vector3(5.5, 0.7, -2.2),
    ]);
    const route = new THREE.Mesh(
      new THREE.TubeGeometry(routeCurve, 72, 0.035, 6, false),
      new THREE.MeshBasicMaterial({ color: 0xc79b58 }),
    );
    world.add(route);

    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xd4ae6d });
    [0, 0.26, 0.53, 0.78, 1].forEach((position) => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 16, 12),
        markerMaterial,
      );
      marker.position.copy(routeCurve.getPoint(position));
      world.add(marker);
    });

    let scrollTarget = 0;
    let scrollCurrent = 0;
    let frame = 0;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const updateScroll = () => {
      const heroHeight = canvas.closest('.hero')?.clientHeight ?? innerHeight;
      scrollTarget = reduceMotion
        ? 0
        : THREE.MathUtils.clamp(scrollY / Math.max(heroHeight, 1), 0, 1);
    };

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };

    const render = () => {
      scrollCurrent = THREE.MathUtils.lerp(scrollCurrent, scrollTarget, 0.065);
      camera.position.set(
        -1.7 + scrollCurrent * 3,
        3.5 - scrollCurrent * 1.45,
        9.2 - scrollCurrent * 3.8,
      );
      camera.lookAt(0.4 + scrollCurrent, -0.35, -1.2);
      world.rotation.y = -0.12 + scrollCurrent * 0.3;
      world.rotation.z = scrollCurrent * -0.035;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('scroll', updateScroll, { passive: true });
    resize();
    updateScroll();
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', updateScroll);
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.LineSegments
        ) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      gridMaterials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-scene" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
