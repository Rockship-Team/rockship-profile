"use client";

import { cn } from "@/lib/utils";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Check WebGL support
const checkWebGLSupport = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

// Fallback button when WebGL is not available
const FallbackSphere: React.FC<{
  size: number;
  isSpeaking?: boolean;
  audioLevel?: number;
}> = ({ size, isSpeaking, audioLevel = 0 }) => {
  const scale = isSpeaking ? 1 + audioLevel * 0.2 : 1;
  const glowIntensity = isSpeaking ? 0.5 + audioLevel * 0.5 : 0.5;

  return (
    <div
      className={cn(
        "w-full h-full rounded-full bg-gradient-to-br from-purple-300 via-cyan-200 to-cyan-400 transition-transform duration-75",
        !isSpeaking && "animate-pulse",
      )}
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(135deg, #d8b4fe 0%, #a5f3fc 50%, #67e8f9 100%)",
        transform: `scale(${scale})`,
        boxShadow: `0 0 ${20 + audioLevel * 20}px rgba(103, 232, 249, ${glowIntensity}), inset 0 0 30px rgba(216, 180, 254, ${0.3 + audioLevel * 0.3})`,
      }}
    />
  );
};

const RocketLogic: React.FC<{
  isSpeaking?: boolean;
  audioLevel?: number;
}> = ({ isSpeaking, audioLevel = 0 }) => {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const baseScale = useRef(0.7);
  const smoothedLevel = useRef(0);

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

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;

    // Idle animation: simple float & rotate
    // Center the rocket visually by offsetting Y by -0.1
    group.current.position.y = -0.1 + Math.sin(time * 1.5) * 0.05;
    group.current.rotation.y += 0.008;
    // Base tilt + slight wobble (PI/10 is about 18 degrees)
    group.current.rotation.z = Math.sin(time * 1.2) * 0.03 + Math.PI / 10;

    // Audio reactive scale
    if (isSpeaking) {
      smoothedLevel.current = THREE.MathUtils.lerp(
        smoothedLevel.current,
        audioLevel,
        0.25,
      );
      const targetScale = 0.7 + smoothedLevel.current * 0.15;
      baseScale.current = THREE.MathUtils.lerp(
        baseScale.current,
        targetScale,
        0.3,
      );
    } else {
      smoothedLevel.current = THREE.MathUtils.lerp(
        smoothedLevel.current,
        0,
        0.1,
      );
      baseScale.current = THREE.MathUtils.lerp(baseScale.current, 0.7, 0.1);
    }

    // Slight hover scale effect
    const hoverScale = hovered ? 0.75 : baseScale.current;
    if (!isSpeaking) {
      baseScale.current = THREE.MathUtils.lerp(
        baseScale.current,
        hoverScale,
        0.1,
      );
    }

    group.current.scale.setScalar(baseScale.current);
  });

  return (
    <group
      ref={group}
      rotation={[0, 0, Math.PI / 10]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
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

      {/* Light for engine */}
      <pointLight
        position={[0, -2.5, 0]}
        color="#f43f5e"
        distance={3}
        intensity={2}
      />
    </group>
  );
};

interface AISphereButtonProps {
  onClick?: () => void;
  className?: string;
  size?: number;
  isSpeaking?: boolean;
  audioLevel?: number; // 0-1 audio amplitude for syncing with speech
}

export const AISphereButton: React.FC<AISphereButtonProps> = ({
  onClick,
  className,
  size = 128,
  isSpeaking = false,
  audioLevel = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setWebGLSupported(checkWebGLSupport());
  }, []);

  // Show fallback while checking or if WebGL is not supported or if there's an error
  const showFallback = webGLSupported === null || !webGLSupported || hasError;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-full transition-transform duration-300",
        "hover:scale-110 active:scale-95",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label="Open chat"
    >
      {showFallback ? (
        <FallbackSphere
          size={size}
          isSpeaking={isSpeaking}
          audioLevel={audioLevel}
        />
      ) : (
        /* 3D Sphere Canvas */
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            preserveDrawingBuffer: false,
          }}
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: "transparent" }}
          onCreated={() => setHasError(false)}
          onError={() => setHasError(true)}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <RocketLogic isSpeaking={isSpeaking} audioLevel={audioLevel} />
          </Suspense>
        </Canvas>
      )}
    </button>
  );
};

export default AISphereButton;
