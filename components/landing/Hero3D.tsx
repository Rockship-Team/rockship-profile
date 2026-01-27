"use client";

import { Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Performance quality settings
type QualityLevel = "low" | "medium" | "high";

interface PerformanceConfig {
  level: QualityLevel;
  sphereSegments: number;
  neuralCount: number;
  connectionDistance: number;
  starCount: number;
  pixelRatioCap: number;
  frameThrottle: number;
}

const QUALITY_SETTINGS: Record<QualityLevel, PerformanceConfig> = {
  // Mobile - heavily optimized for phone GPUs
  low: {
    level: "low",
    sphereSegments: 16, // Very low poly for mobile
    neuralCount: 0, // Disabled on mobile
    connectionDistance: 0,
    starCount: 0, // Disabled on mobile
    pixelRatioCap: 1.0, // Strict 1x scale
    frameThrottle: 3, // Aggressive throttling (~20fps)
  },
  // Tablet / low-end desktop
  medium: {
    level: "medium",
    sphereSegments: 48,
    neuralCount: 35,
    connectionDistance: 6.0,
    starCount: 500,
    pixelRatioCap: 1.5,
    frameThrottle: 1,
  },
  // Desktop - full quality
  high: {
    level: "high",
    sphereSegments: 64,
    neuralCount: 60,
    connectionDistance: 8.0,
    starCount: 1200,
    pixelRatioCap: 2,
    frameThrottle: 1,
  },
};

// Detect device capabilities and viewport
// Only use screen width to determine mobile vs desktop
const usePerformanceConfig = (): PerformanceConfig => {
  const [config, setConfig] = useState<PerformanceConfig>(
    QUALITY_SETTINGS.high,
  );
  const [quality, setQuality] = useState<QualityLevel>("high");

  React.useEffect(() => {
    const detectQuality = () => {
      const width = window.innerWidth;

      // Simple detection: only screen width matters
      // Mobile: < 768px → low quality
      // Tablet: 768-1024px → medium quality
      // Desktop: > 1024px → high quality
      let autoQuality: QualityLevel;
      if (width < 768) {
        autoQuality = "low";
      } else if (width < 1024) {
        autoQuality = "medium";
      } else {
        autoQuality = "high";
      }

      setQuality(autoQuality);
      setConfig(QUALITY_SETTINGS[autoQuality]);
    };

    detectQuality();
    window.addEventListener("resize", detectQuality);

    // Listen for quality toggle from keyboard (Shift+Q)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "Q") {
        const qualities: QualityLevel[] = ["low", "medium", "high"];
        setQuality((prev) => {
          const currentIndex = qualities.indexOf(prev);
          const nextQuality = qualities[(currentIndex + 1) % 3];
          setConfig(QUALITY_SETTINGS[nextQuality]);
          console.log(`Quality changed to: ${nextQuality}`);
          return nextQuality;
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("resize", detectQuality);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
const NeuralNetwork = ({
  count = 80,
  color = "#6366f1",
  connectionDistance = 5.0,
}) => {
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
    const maxDistSq = connectionDistance * connectionDistance;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x1 = positions[ix];
      const y1 = positions[ix + 1];
      const z1 = positions[ix + 2];

      for (let j = i + 1; j < count; j++) {
        const jx = j * 3;
        const x2 = positions[jx];
        const y2 = positions[jx + 1];
        const z2 = positions[jx + 2];

        const dy = y1 - y2;
        const dz = z1 - z2;

        // 1. Direct connection
        const dx = x1 - x2;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < maxDistSq) {
          linePos.push(x1, y1, z1, x2, y2, z2);
        }

        // 2. Wrap right connection (p1 connects to p2 shifted right)
        const dxRight = x1 - (x2 + width);
        const distSqRight = dxRight * dxRight + dy * dy + dz * dz;
        if (distSqRight < maxDistSq) {
          linePos.push(x1, y1, z1, x2 + width, y2, z2);
        }

        // 3. Wrap left connection (p1 connects to p2 shifted left)
        const dxLeft = x1 - (x2 - width);
        const distSqLeft = dxLeft * dxLeft + dy * dy + dz * dz;
        if (distSqLeft < maxDistSq) {
          linePos.push(x1, y1, z1, x2 - width, y2, z2);
        }
      }
    }
    return new Float32Array(linePos);
  }, [points, count, connectionDistance, width]);

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
        gl_PointSize = 8.0 * scale * uPixelRatio * (10.0 / -mvPosition.z);
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
    [color, gl],
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
      0.1,
    );
    containerRef.current.rotation.y = THREE.MathUtils.lerp(
      containerRef.current.rotation.y,
      xMouse * 0.1, // Reduced Y-rotation range since we have scanning now
      0.1,
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

const SmokeSystem = () => {
  const { scene } = useThree();
  const maxParticles = 500;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Particle state
  const particleData = useRef(
    Array.from({ length: maxParticles }, () => ({
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: 1,
      scale: 1,
      rotation: Math.random() * Math.PI,
    })),
  );

  const nextIdx = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    // Attach spawn function to scene for RocketLogic to use
    (scene as any).spawnParticle = (
      pos: THREE.Vector3,
      dir: THREE.Vector3,
      scale: number,
    ) => {
      const idx = nextIdx.current;
      const data = particleData.current[idx];

      // Spawn at position
      data.position.copy(pos);

      // Velocity: Direction + Random spread
      data.velocity.copy(dir).multiplyScalar(2 + Math.random() * 1.5);
      data.velocity.x += (Math.random() - 0.5) * 0.5;
      data.velocity.y += (Math.random() - 0.5) * 0.5;
      data.velocity.z += (Math.random() - 0.5) * 0.5;

      data.life = 0.8 + Math.random() * 0.4; // Random life ~1s
      data.maxLife = data.life;
      data.scale = scale;
      data.rotation = Math.random() * Math.PI * 2;

      nextIdx.current = (nextIdx.current + 1) % maxParticles;
    };

    return () => {
      delete (scene as any).spawnParticle;
    };
  }, [scene]);

  useFrame((_state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // safe delta
    const dt = Math.min(delta, 0.1);

    particleData.current.forEach((data, i) => {
      if (data.life > 0) {
        data.life -= dt;

        // Move
        data.position.addScaledVector(data.velocity, dt);

        // Drag (slow down)
        data.velocity.multiplyScalar(0.95);

        // Scale Effect: Grow -> Fade/Shrink
        const lifeRatio = 1 - data.life / data.maxLife;
        // Start small, grow fast, then stay big/fade
        const currentScale = data.scale * (0.5 + lifeRatio * 2.0);

        // Opacity/Shrink fade out
        // We simulate fade out by shrinking rapidly at the end
        const finalScale =
          data.life < 0.2 ? currentScale * (data.life / 0.2) : currentScale;

        dummy.position.copy(data.position);
        dummy.scale.setScalar(Math.max(0, finalScale));
        dummy.rotation.set(0, 0, data.rotation);
        dummy.updateMatrix();

        mesh.setMatrixAt(i, dummy.matrix);
      } else {
        // Hide dead particles
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, maxParticles]}>
      {/* Low-poly sphere (Icosahedron) for toon smoke look */}
      <icosahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial
        color="#e2e8f0"
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

const RocketLogic = () => {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const { viewport } = useThree();

  // Materials
  const matBodyMain = useMemo(
    () => new THREE.MeshToonMaterial({ color: 0xe2e8f0 }),
    [],
  );
  const matBodyDark = useMemo(
    () => new THREE.MeshToonMaterial({ color: 0x1e293b }),
    [],
  );
  const matAccent = useMemo(
    () => new THREE.MeshToonMaterial({ color: 0x6366f1 }),
    [],
  );
  const matGlow = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0x0ea5e9 }),
    [],
  );
  const matEngine = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.2,
      }),
    [],
  );

  // Geometry
  const finShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.8, -1.0);
    shape.lineTo(0.8, -1.8);
    shape.lineTo(0, -1.2);
    return shape;
  }, []);
  const finExtrudeSettings = useMemo(
    () => ({ depth: 0.05, bevelEnabled: false }),
    [],
  );

  // Logic Constants
  // Responsive Position: On narrow screens (< 12 width), center the rocket higher up
  // Responsive Position: On narrow screens (< 12 width), center the rocket higher up
  const isMobile = viewport.width < 12;

  // Auto-fly Effect for Mobile
  useEffect(() => {
    if (!isMobile) return;

    // Function to trigger a single flight
    const triggerFlight = () => {
      setHover(true);
      // Reset hover flag shortly after ensuring flight started
      // This prevents instant re-looping, allowing a pause
      setTimeout(() => setHover(false), 1000);
    };

    // Start first flight after 1s delay
    const startTimer = setTimeout(triggerFlight, 1000);

    // Continue flying every 7 seconds (approx 5.5s flight + 1.5s pause)
    const loopTimer = setInterval(triggerFlight, 7000);

    return () => {
      clearTimeout(startTimer);
      clearInterval(loopTimer);
    };
  }, [isMobile]);

  const HOME_POS = useMemo(
    () =>
      isMobile
        ? new THREE.Vector3(2.5, -0.5, 0.5) // Moved up further as requested
        : new THREE.Vector3(3.5, 0, 0),
    [isMobile],
  );

  const flightPath = useMemo(() => {
    // Mobile Path: Tighter simple loop in visible range
    if (isMobile) {
      const points = [
        HOME_POS.clone(),
        new THREE.Vector3(0, 2, 1), // Up higher
        new THREE.Vector3(-2, 0, 0), // Mid-left
        new THREE.Vector3(0, -2, 0), // Bottom center (higher than before)
        new THREE.Vector3(2, -1, 1), // Rightish return
        HOME_POS.clone(),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      curve.closed = false;
      curve.tension = 0.5;
      return curve;
    }

    // Default Desktop Path
    const points = [
      HOME_POS.clone(),
      new THREE.Vector3(1, 4, 2),
      new THREE.Vector3(-4, 3, 5),
      new THREE.Vector3(-8, 0, 0),
      new THREE.Vector3(-4, -4, -4),
      new THREE.Vector3(4, -3, -6),
      new THREE.Vector3(7, -1, -2),
      HOME_POS.clone(),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    curve.closed = false;
    curve.tension = 0.5;
    return curve;
  }, [HOME_POS, isMobile]);

  // State Refs
  const state = useRef({
    isFlying: false,
    progress: 0,
    time: 0,
  });

  useFrame((r3fState) => {
    if (!group.current) return;
    const { clock, scene } = r3fState;
    const delta = 0.02; // Fixed step approximation from original code
    state.current.time += delta;

    // Logic: If hovered and not already flying, start flight
    if (hovered && !state.current.isFlying) {
      state.current.isFlying = true;
      state.current.progress = 0;
    }

    const { isFlying, progress, time } = state.current;

    // Spawn Helper
    const spawn = (scene as any).spawnParticle;

    if (isFlying) {
      state.current.progress += 0.003; // Flight speed
      if (state.current.progress > 1) {
        state.current.progress = 1;
        state.current.isFlying = false;
        group.current.position.copy(HOME_POS);
        group.current.rotation.set(0, 0, Math.PI / 6);
      } else {
        const currentPos = flightPath.getPointAt(state.current.progress);
        const nextPos = flightPath.getPointAt(
          Math.min(state.current.progress + 0.01, 1),
        );

        group.current.position.copy(currentPos);
        group.current.lookAt(nextPos);
        group.current.rotateX(Math.PI / 2);

        // Banking
        const turnFactor = (currentPos.x - nextPos.x) * 0.8;
        group.current.rotateZ(turnFactor);

        // Exhaust
        if (spawn) {
          const enginePos = new THREE.Vector3(0, -2.0, 0);
          enginePos.applyMatrix4(group.current.matrixWorld);
          const thrust = new THREE.Vector3(0, -1, 0).applyQuaternion(
            group.current.quaternion,
          );
          for (let k = 0; k < 4; k++) spawn(enginePos, thrust, 0.4);
        }
      }
    } else {
      // Idle
      group.current.position.copy(HOME_POS);
      group.current.position.y += Math.sin(time * 2) * 0.2;
      group.current.rotation.set(0, 0, Math.PI / 6);
      group.current.rotation.z += Math.sin(time * 1.5) * 0.05;
      group.current.rotation.y += 0.005;

      // Idle particles
      if (Math.random() > 0.8 && spawn) {
        const enginePos = new THREE.Vector3(0, -2.0, 0);
        enginePos.applyMatrix4(group.current.matrixWorld);
        const thrust = new THREE.Vector3(0, -1, 0).applyQuaternion(
          group.current.quaternion,
        );
        spawn(enginePos, thrust, 0.1);
      }
    }
  });

  return (
    <group
      ref={group}
      // Initial position from HOME_POS, but animation loop takes over
      position={HOME_POS}
      rotation={[0, 0, Math.PI / 6]}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
        setHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        setHover(false);
      }}
    >
      {/* Hitbox */}
      <mesh visible={false}>
        <cylinderGeometry args={[1.5, 1.5, 5, 8]} />
        <meshBasicMaterial />
      </mesh>

      {/* 1. Nose Cone */}
      <mesh position={[0, 2.0, 0]} material={matAccent}>
        <coneGeometry args={[0.5, 1.5, 32]} />
      </mesh>

      {/* 2. Main Fuselage */}
      <mesh position={[0, 0, 0]} material={matBodyMain}>
        <cylinderGeometry args={[0.5, 0.6, 2.5, 32]} />
      </mesh>

      {/* 3. Cockpit */}
      <group position={[0, 0.5, 0.3]}>
        <mesh material={matBodyDark}>
          <boxGeometry args={[0.6, 0.8, 0.5]} />
        </mesh>
        <mesh position={[0, 0.1, 0.26]} material={matGlow}>
          <boxGeometry args={[0.5, 0.3, 0.1]} />
        </mesh>
      </group>

      {/* 4. Intakes */}
      <mesh position={[-0.55, 0, 0]} material={matBodyDark}>
        <capsuleGeometry args={[0.2, 1.0, 4, 8]} />
      </mesh>
      <mesh position={[0.55, 0, 0]} material={matBodyDark}>
        <capsuleGeometry args={[0.2, 1.0, 4, 8]} />
      </mesh>

      {/* 5. Fins */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (Math.PI / 2) * i, 0]}>
          <group position={[0, -0.2, 0.5]}>
            <mesh material={matAccent} rotation={[0, -Math.PI / 2, 0]}>
              <extrudeGeometry args={[finShape, finExtrudeSettings]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* 6. Engine Block */}
      <mesh position={[0, -1.5, 0]} material={matBodyDark}>
        <cylinderGeometry args={[0.6, 0.5, 0.5, 8]} />
      </mesh>

      {/* 7. Nozzle */}
      <mesh
        position={[0, -1.9, 0]}
        rotation={[Math.PI, 0, 0]}
        material={matEngine}
      >
        <coneGeometry args={[0.4, 0.5, 16, 1, true]} />
      </mesh>

      {/* Light */}
      <pointLight
        position={[0, -2.5, 0]}
        color="#f43f5e"
        distance={5}
        intensity={2}
      />
    </group>
  );
};

const SceneContent = ({ config }: { config: PerformanceConfig }) => {
  const isMobile = config.level === "low";

  return (
    <>
      {/* Light Setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Background - Skip on mobile for performance */}
      {!isMobile && (
        <NeuralNetwork
          count={config.neuralCount}
          color="#818cf8"
          connectionDistance={config.connectionDistance}
        />
      )}

      {/* Foreground Hero Blob - Always show */}
      <RocketLogic />
      <SmokeSystem />

      {/* Environment - Skip Stars on mobile for performance */}
      {!isMobile && (
        <Stars
          radius={100}
          depth={50}
          count={config.starCount}
          factor={8}
          saturation={0}
          fade
          speed={1}
        />
      )}
      <fog attach="fog" args={["#02040a", 10, 50]} />
    </>
  );
};

export const Hero3D: React.FC = () => {
  const config = usePerformanceConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Visibility-based rendering - pause when not in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true);
        }
      },
      { threshold: 0.05, rootMargin: "100px" },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded]);

  // Delay canvas ready state for smoother transition
  useEffect(() => {
    if (hasLoaded) {
      // Small delay to let WebGL context initialize properly
      const timer = setTimeout(() => setCanvasReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [hasLoaded]);

  // Don't render heavy 3D content until first visible
  const shouldRender = hasLoaded;

  return (
    <div ref={containerRef} className="w-full h-full">
      {shouldRender && (
        <Canvas
          dpr={[1, config.pixelRatioCap]}
          frameloop={isVisible && canvasReady ? "always" : "demand"} // Start with demand, then always
          gl={{
            antialias: config.pixelRatioCap > 1,
            alpha: true,
            powerPreference: "high-performance",
            // Additional GPU optimizations
            stencil: false,
            depth: true,
            // Reduce context attributes for faster initialization
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
          }}
          camera={{ position: [0, 0, 12], fov: 45 }}
          onCreated={({ gl }) => {
            // Optimize WebGL context
            gl.setClearColor(0x000000, 0);
            // Mark canvas as ready after WebGL context is created
            requestAnimationFrame(() => setCanvasReady(true));
          }}
        >
          <Suspense fallback={null}>
            <SceneContent config={config} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};
