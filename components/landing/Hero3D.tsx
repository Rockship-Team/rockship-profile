"use client";

import { Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";

// --- Logic for Neural Network Background ---
const NeuralNetwork = ({ count = 100, color = "#6366f1" }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 20;
      // FIX: Push points deeper into background (Z: -20 to -10)
      // This ensures they definitely render behind the main object (Z ~ 0 + radius)
      const z = -10 - Math.random() * 15;
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  const connections = useMemo(() => {
    const linePos = [];
    const positions = points;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];
        const dist = Math.sqrt(
          (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2
        );
        if (dist < 4.5) {
          // Increased connection distance for background
          linePos.push(x1, y1, z1);
          linePos.push(x2, y2, z2);
        }
      }
    }
    return new Float32Array(linePos);
  }, [points, count]);

  const groupRef = useRef<THREE.Group>(null);

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Limit delta to avoid huge jumps after tab switching
    const dt = Math.min(delta, 0.1);
    timeRef.current += dt;

    const x = state.pointer.x * 0.5;
    const y = state.pointer.y * 0.5;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      y * 0.1,
      0.1
    );

    // Use local accumulated time instead of state.clock.elapsedTime
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * 0.1 + timeRef.current * 0.02,
      0.1
    );
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color={color}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
};

// --- AI Core Sphere Object (Refined Liquid Blob) ---
const AISphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const { viewport } = useThree();

  const isDesktop = viewport.width > 8;
  const positionX = isDesktop ? 3.5 : 0;
  const positionY = isDesktop ? 0 : -2.5; // Move deeply down on mobile so it's below text
  const scale = isDesktop ? 1 : 0.55; // Much smaller on mobile to be subtle

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        colorLeft: { value: new THREE.Color("#d8b4fe") },
        colorRight: { value: new THREE.Color("#67e8f9") },
        time: { value: 0 },
        hoverStrength: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        uniform float hoverStrength;

        // Simplex Noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 = v - i + dot(i, C.xxx) ;
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute( permute( permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          float moveSpeed = time * 0.2; // Slower organic move
          float noise = snoise(position * 0.7 + vec3(moveSpeed));
          
          float displacement = noise * 0.4;
          displacement += hoverStrength * 0.15;
          
          vec3 newPos = position + normal * displacement;
          vPosition = newPos;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorLeft;
        uniform vec3 colorRight;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          float mixFactor = smoothstep(-0.8, 0.8, vNormal.x);
          vec3 baseColor = mix(colorLeft, colorRight, mixFactor);
          
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          float facingRatio = dot(vNormal, viewDir);
          
          // Whitish glowing center
          float centerGlow = smoothstep(0.4, 1.0, facingRatio);
          vec3 finalColor = mix(baseColor, vec3(1.0, 1.0, 1.0), centerGlow * 0.9);
          
          finalColor *= 1.1; // Boost brightness

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      // Removed transparent: true to ensure depth occlusion hides background stars/dots
    });
  }, []);

  const rotationTimeRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const { pointer } = state;

    // Cap delta to prevent spinning glitch on tab switch
    const dt = Math.min(delta, 0.1);
    rotationTimeRef.current += dt;

    // Movement intensity
    const moveIntensity = 0.5; // Sensitivity to mouse movement
    const floatIntensity = 0.15; // Vertical floating amplitude

    shaderMaterial.uniforms.time.value = time;
    shaderMaterial.uniforms.hoverStrength.value = THREE.MathUtils.lerp(
      shaderMaterial.uniforms.hoverStrength.value,
      hovered ? 1.0 : 0.0,
      0.1
    );

    // Calculate proximity to the object's base position to limit influence
    const anchor = new THREE.Vector3(positionX, positionY, 0);
    anchor.project(state.camera); // Project world position to NDC
    const dist = Math.hypot(pointer.x - anchor.x, pointer.y - anchor.y);
    const proximity = 1.0 - THREE.MathUtils.smoothstep(0.0, 0.8, dist); // Radius approx 0.8 NDC

    // Calculate target position combining base position, floating, and mouse sway
    // Apply proximity factor so it only moves when mouse is near
    const targetX = positionX + pointer.x * 2 * moveIntensity * proximity; // Move on X axis
    const targetY =
      positionY +
      Math.sin(time * 0.4) * floatIntensity +
      pointer.y * 1.5 * moveIntensity * proximity; // Move on Y axis

    // Smoothly interpolate position (Flying effect)
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.05
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.05
    );

    // Dynamic rotation dependent on mouse
    // Base rotation + mouse influence
    // Use manually accumulated time (rotationTimeRef) to avoid jumps
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      rotationTimeRef.current * 0.15 + pointer.x * 0.5,
      0.05
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      Math.sin(time * 0.2) * 0.1 - pointer.y * 0.3,
      0.05
    );
  });

  return (
    <mesh
      ref={meshRef}
      scale={scale}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
        setHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        setHover(false);
      }}
    >
      <sphereGeometry args={[2.5, 128, 128]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

const SceneContent = () => {
  const { scene } = useThree();

  return (
    <>
      {/* Light Setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Background (Pushed to Z < -5) */}
      <NeuralNetwork count={150} color="#818cf8" />

      {/* Foreground Hero Blob */}
      <AISphere />

      {/* Environment */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <fog attach="fog" args={["#02040a", 10, 50]} />
    </>
  );
};

export const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 12], fov: 45 }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};
