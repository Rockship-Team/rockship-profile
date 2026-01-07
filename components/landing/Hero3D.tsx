"use client";

import { Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Performance quality settings
type QualityLevel = 'low' | 'medium' | 'high';

interface PerformanceConfig {
  sphereSegments: number;
  neuralCount: number;
  connectionDistance: number;
  starCount: number;
  pixelRatioCap: number;
  frameThrottle: number;
}

const QUALITY_SETTINGS: Record<QualityLevel, PerformanceConfig> = {
  low: {
    sphereSegments: 32,
    neuralCount: 40,
    connectionDistance: 4.5,
    starCount: 1000,
    pixelRatioCap: 1.5,
    frameThrottle: 3
  },
  medium: {
    sphereSegments: 64,
    neuralCount: 80,
    connectionDistance: 5.0,
    starCount: 2000,
    pixelRatioCap: 2,
    frameThrottle: 2
  },
  high: {
    sphereSegments: 128,
    neuralCount: 120,
    connectionDistance: 5.5,
    starCount: 3000,
    pixelRatioCap: 2,
    frameThrottle: 1
  }
};

// Detect device capabilities and viewport
const usePerformanceConfig = (): PerformanceConfig => {
  const [config, setConfig] = useState<PerformanceConfig>(QUALITY_SETTINGS.high);
  const [quality, setQuality] = useState<QualityLevel>('high');

  React.useEffect(() => {
    // Detect viewport width
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    // Auto-select quality based on device
    let autoQuality: QualityLevel = 'high';
    if (isMobile || isLowEnd) {
      autoQuality = 'low';
    } else if (window.innerWidth >= 1920 && !isLowEnd) {
      autoQuality = 'high';
    }

    setQuality(autoQuality);
    setConfig(QUALITY_SETTINGS[autoQuality]);

    // Listen for quality toggle from keyboard (Shift+Q)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'Q') {
        const qualities: QualityLevel[] = ['low', 'medium', 'high'];
        const currentIndex = qualities.indexOf(quality);
        const nextQuality = qualities[(currentIndex + 1) % 3];
        setQuality(nextQuality);
        setConfig(QUALITY_SETTINGS[nextQuality]);
        console.log(`Quality changed to: ${nextQuality}`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [quality]);

  return config;
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-[#02040a]">
    <div className="text-white/50 text-sm">Loading 3D scene...</div>
  </div>
);

// --- Reusable Layer for the looping effect ---
const NetworkLayer = ({ points, connections, material }: any) => {
  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <primitive object={material} attach="material" />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={material.uniforms.uColor.value}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

// --- Logic for Neural Network Background ---
const NeuralNetwork = ({ count = 80, color = "#6366f1", connectionDistance = 5.0 }) => {
  const { gl } = useThree();
  const width = 70; // Width of one seamless tile

  // Generate points within the width range for seamless tiling
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread X across the full width [-width/2, width/2]
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * 24; // Increased Y height
      // Deep Z range
      const z = -10 - Math.random() * 15;
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count, width]);

  const connections = useMemo(() => {
    const linePos = [];
    const positions = points;
    const maxDistSq = connectionDistance * connectionDistance; // Compare squared distances for performance

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x1 = positions[ix];
      const y1 = positions[ix + 1];
      const z1 = positions[ix + 2];

      for (let j = i + 1; j < count; j++) {
        const jx = j * 3;
        const dx = x1 - positions[jx];
        const dy = y1 - positions[jx + 1];
        const dz = z1 - positions[jx + 2];

        // Use squared distance to avoid expensive sqrt
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistSq) {
          linePos.push(x1, y1, z1);
          linePos.push(positions[jx], positions[jx + 1], positions[jx + 2]);
        }
      }
    }
    return new Float32Array(linePos);
  }, [points, count, connectionDistance]);

  const containerRef = useRef<THREE.Group>(null);
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const frameCountRef = useRef(0);

  // Custom Shader for Glowing, Pulsing Dots
  const dotMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uTime: { value: 0 },
          uPixelRatio: { value: gl.getPixelRatio() },
        },
        vertexShader: `
      uniform float uTime;
      uniform float uPixelRatio;
      varying vec3 vPosition;

      void main() {
        vPosition = position;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Pulse modulation based on position and time
        float noise = sin(uTime * 2.0 + position.x * 0.5 + position.y * 0.5);
        float scale = 1.0 + 0.4 * noise;

        // Size attenuation
        gl_PointSize = 12.0 * scale * uPixelRatio * (10.0 / -mvPosition.z);
      }
    `,
        fragmentShader: `
      uniform vec3 uColor;

      void main() {
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        if (dist > 0.5) discard;
        float glow = 1.0 - smoothstep(0.05, 0.5, dist);
        float alpha = glow * 1.0;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color, gl]
  );

  // Clean up shader material on unmount to prevent WebGL memory leaks
  React.useEffect(() => {
    return () => {
      dotMaterial.dispose();
    };
  }, [dotMaterial]);

  useFrame((state, delta) => {
    if (!containerRef.current || !group1Ref.current || !group2Ref.current)
      return;

    // Frame throttling for mobile
    frameCountRef.current += 1;
    const isMobile = window.innerWidth < 768;
    const throttleAmount = isMobile ? 2 : 1;

    if (frameCountRef.current % throttleAmount !== 0) {
      return; // Skip frame for throttling
    }

    // Pulse time
    dotMaterial.uniforms.uTime.value = state.clock.elapsedTime;

    const dt = Math.min(delta, 0.1);
    timeRef.current += dt;

    // 1. Mouse Interaction (Tilt/Pan) on the CONTAINER
    const xMouse = state.pointer.x * 0.5;
    const yMouse = state.pointer.y * 0.5;

    containerRef.current.rotation.x = THREE.MathUtils.lerp(
      containerRef.current.rotation.x,
      yMouse * 0.1,
      0.1
    );
    containerRef.current.rotation.y = THREE.MathUtils.lerp(
      containerRef.current.rotation.y,
      xMouse * 0.1, // Reduced Y-rotation range since we have scanning now
      0.1
    );

    // 2. Infinite Scroll Animation (Right to Left)
    const speed = 1.0;
    // Moving Left: decrease X.
    // Modulo ensures it stays within [0, -width] range relative to loop
    // We add an offset to center the initial view if needed, but simple scrolling is fine.
    const scrollPos = (state.clock.elapsedTime * speed) % width;

    // Group 1: Moves left. When it hits -width, it effectively wraps because of how we pair it with Group 2.
    // Actually, simple standard carousel logic:
    // Move frame of reference:
    group1Ref.current.position.x = -scrollPos;
    group2Ref.current.position.x = -scrollPos + width;
  });

  return (
    <group ref={containerRef}>
      {/* Render two copies for seamless loop */}
      <group ref={group1Ref}>
        <NetworkLayer
          points={points}
          connections={connections}
          material={dotMaterial}
        />
      </group>
      <group ref={group2Ref}>
        <NetworkLayer
          points={points}
          connections={connections}
          material={dotMaterial}
        />
      </group>
    </group>
  );
};

// --- AI Core Sphere Object (Refined Liquid Blob) ---
const AISphere = ({ config }: { config: PerformanceConfig }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const { viewport } = useThree();

  const isDesktop = viewport.width > 8;
  const positionX = isDesktop ? 3.5 : 0;
  const positionY = isDesktop ? 0 : -2.5; // Move deeply down on mobile so it's below text
  const scale = isDesktop ? 1 : 0.55; // Much smaller on mobile to be subtle

  // Dynamic sphere segments based on quality setting
  const sphereSegments = config.sphereSegments;

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

  // Dispose material on unmount to prevent GPU memory leak
  React.useEffect(() => {
    return () => {
      shaderMaterial.dispose();
    };
  }, [shaderMaterial]);

  const rotationTimeRef = useRef(0);

  // Reusable vector to avoid garbage collection churn in useFrame
  const anchorVec = useMemo(() => new THREE.Vector3(), []);

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
    // Use reusable vector and reset it every frame
    anchorVec.set(positionX, positionY, 0);
    anchorVec.project(state.camera); // Project world position to NDC

    const dist = Math.hypot(pointer.x - anchorVec.x, pointer.y - anchorVec.y);
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
      <sphereGeometry args={[2.5, sphereSegments, sphereSegments]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

const SceneContent = ({ config }: { config: PerformanceConfig }) => {
  const { scene } = useThree();

  return (
    <>
      {/* Light Setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Background (Pushed to Z < -5) */}
      <NeuralNetwork
        count={config.neuralCount}
        color="#818cf8"
        connectionDistance={config.connectionDistance}
      />

      {/* Foreground Hero Blob */}
      <AISphere config={config} />

      {/* Environment */}
      <Stars
        radius={100}
        depth={50}
        count={config.starCount}
        factor={8}
        saturation={0}
        fade
        speed={1}
      />
      <fog attach="fog" args={["#02040a", 10, 50]} />
    </>
  );
};

export const Hero3D: React.FC = () => {
  const config = usePerformanceConfig();

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, config.pixelRatioCap]}
        gl={{
          antialias: config.pixelRatioCap > 1,
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 12], fov: 45 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneContent config={config} />
        </Suspense>
      </Canvas>
    </div>
  );
};
