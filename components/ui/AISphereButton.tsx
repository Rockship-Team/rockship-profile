"use client";

import { cn } from "@/lib/utils";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
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
        !isSpeaking && "animate-pulse"
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

// Mini AISphere for button - optimized for small size
const AISphereSmall: React.FC<{ isSpeaking?: boolean; audioLevel?: number }> = ({
  isSpeaking,
  audioLevel = 0,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const baseScale = useRef(1);
  const smoothedLevel = useRef(0);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        colorLeft: { value: new THREE.Color("#d8b4fe") },
        colorRight: { value: new THREE.Color("#67e8f9") },
        time: { value: 0 },
        hoverStrength: { value: 0 },
      },
      vertexShader: `
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
          vNormal = normalize(normalMatrix * normal);

          // Zero-Gravity Liquid movement logic
          float slowTime = time * 0.2;
          float flowTime = time * 0.5;

          // Layer 1: Large-scale global morphing
          float baseNoise = snoise(position * 0.2 + vec3(slowTime));

          // Layer 2: Medium-scale billowy undulations
          float blobNoise = snoise(position * 0.5 + vec3(flowTime + baseNoise * 0.5));

          // Combine layers
          float liquidBase = baseNoise * 0.4 + blobNoise * 0.2;

          // Displacement calculation
          float displacement = liquidBase;

          // Hovering intensifies the movement
          displacement += blobNoise * 0.15 * hoverStrength;
          displacement += hoverStrength * 0.08;

          vec3 newPos = position + normal * displacement;
          vPosition = newPos;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorLeft;
        uniform vec3 colorRight;
        uniform float time;
        uniform float hoverStrength;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          float mixFactor = smoothstep(-0.8, 0.8, vNormal.x);
          vec3 baseColor = mix(colorLeft, colorRight, mixFactor);

          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          float facingRatio = dot(vNormal, viewDir);

          // Deep, soft glowing center
          float centerGlow = smoothstep(0.3, 1.0, facingRatio);

          // Soften the color transitions on hover
          float hoverGlow = hoverStrength * 0.15;
          vec3 finalColor = mix(baseColor, vec3(1.0, 1.0, 1.0), (centerGlow + hoverGlow) * 0.75);

          finalColor *= (1.0 + hoverStrength * 0.1);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  // Dispose material on unmount
  React.useEffect(() => {
    return () => {
      shaderMaterial.dispose();
    };
  }, [shaderMaterial]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    shaderMaterial.uniforms.time.value = time;
    shaderMaterial.uniforms.hoverStrength.value = THREE.MathUtils.lerp(
      shaderMaterial.uniforms.hoverStrength.value,
      hovered ? 1.0 : 0.0,
      0.1,
    );

    // Gentle rotation
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Audio-reactive pulsing effect when speaking
    if (isSpeaking) {
      // Smooth the audio level for natural movement
      smoothedLevel.current = THREE.MathUtils.lerp(
        smoothedLevel.current,
        audioLevel,
        0.25
      );
      // Scale based on audio level: base 1.0, max 1.25
      const targetScale = 1 + smoothedLevel.current * 0.25;
      baseScale.current = THREE.MathUtils.lerp(baseScale.current, targetScale, 0.3);
    } else {
      smoothedLevel.current = THREE.MathUtils.lerp(smoothedLevel.current, 0, 0.1);
      baseScale.current = THREE.MathUtils.lerp(baseScale.current, 1, 0.1);
    }
    meshRef.current.scale.setScalar(baseScale.current);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[1.8, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
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
        "relative rounded-full overflow-hidden transition-transform duration-300",
        "hover:scale-110 active:scale-95",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label="Open chat"
    >
      {showFallback ? (
        <FallbackSphere size={size} isSpeaking={isSpeaking} audioLevel={audioLevel} />
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
            <AISphereSmall isSpeaking={isSpeaking} audioLevel={audioLevel} />
          </Suspense>
        </Canvas>
      )}
    </button>
  );
};

export default AISphereButton;
