"use client";

import { Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// --- Logic for Neural Network Background ---
const NeuralNetwork = ({ count = 100, color = "#6366f1" }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;
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
        if (dist < 3.5) {
          linePos.push(x1, y1, z1);
          linePos.push(x2, y2, z2);
        }
      }
    }
    return new Float32Array(linePos);
  }, [points, count]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Parallax background movement based on mouse
    const x = state.pointer.x * 0.5;
    const y = state.pointer.y * 0.5;

    // Smooth interpolation
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      y * 0.2,
      0.1
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * 0.2 + state.clock.elapsedTime * 0.05,
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
          opacity={0.8}
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
        <lineBasicMaterial color={color} transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
};

// --- Particle System for Exhaust ---
const ExhaustParticles = ({ scene }: { scene: THREE.Scene }) => {
  // Use a ref to store state without triggering re-renders
  const particlesRef = useRef<
    {
      mesh: THREE.Mesh;
      life: number;
      maxLife: number;
      velocity: THREE.Vector3;
    }[]
  >([]);

  const particleGeo = useMemo(() => new THREE.SphereGeometry(1, 8, 8), []);
  const particleMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  // Expose a method to spawn particles
  useEffect(() => {
    (scene as any).spawnParticle = (
      pos: THREE.Vector3,
      dir: THREE.Vector3,
      speed: number
    ) => {
      const mesh = new THREE.Mesh(particleGeo, particleMat.clone());
      mesh.position.copy(pos);
      // Random offset
      mesh.position.add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        )
      );
      mesh.scale.setScalar(0.1 + Math.random() * 0.1);

      scene.add(mesh); // Add directly to scene to handle world space movement independent of rocket

      const maxLife = 0.5 + Math.random() * 0.5;
      const spread = 0.08;
      const velocity = dir.clone().multiplyScalar(speed);
      velocity.x += (Math.random() - 0.5) * spread;
      velocity.y += (Math.random() - 0.5) * spread;
      velocity.z += (Math.random() - 0.5) * spread;

      particlesRef.current.push({ mesh, life: maxLife, maxLife, velocity });
    };

    return () => {
      // Cleanup particles on unmount
      particlesRef.current.forEach((p) => scene.remove(p.mesh));
      particlesRef.current = [];
      delete (scene as any).spawnParticle;
    };
  }, [scene, particleGeo, particleMat]);

  useFrame(() => {
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.life -= 0.02;
      if (p.life <= 0) {
        scene.remove(p.mesh);
        particlesRef.current.splice(i, 1);
      } else {
        p.mesh.position.add(p.velocity);
        p.mesh.scale.setScalar((p.maxLife - p.life) * 2.0);

        const m = p.mesh.material as THREE.MeshBasicMaterial;
        m.opacity = (p.life / p.maxLife) * 0.5;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio > 0.7) m.color.setHex(0x0ea5e9);
        else if (lifeRatio > 0.4) m.color.setHex(0x6366f1);
        else m.color.setHex(0xffffff);
      }
    }
  });

  return null;
};

// --- Rocket Component with Original Logic ---
const RocketLogic = () => {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  // Materials
  const matBodyMain = useMemo(
    () => new THREE.MeshToonMaterial({ color: 0xe2e8f0 }),
    []
  );
  const matBodyDark = useMemo(
    () => new THREE.MeshToonMaterial({ color: 0x1e293b }),
    []
  );
  const matAccent = useMemo(
    () => new THREE.MeshToonMaterial({ color: 0x6366f1 }),
    []
  );
  const matGlow = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0x0ea5e9 }),
    []
  );
  const matEngine = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
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
    []
  );

  // Logic Constants
  const HOME_POS = useMemo(() => new THREE.Vector3(5, 0, 0), []);
  const flightPath = useMemo(() => {
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
  }, [HOME_POS]);

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
          Math.min(state.current.progress + 0.01, 1)
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
            group.current.quaternion
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
          group.current.quaternion
        );
        spawn(enginePos, thrust, 0.1);
      }
    }
  });

  return (
    <group
      ref={group}
      position={[5, 0, 0]}
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

const SceneContent = () => {
  const { scene } = useThree(); // Access scene from context

  return (
    <>
      {/* Environment Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 15]} intensity={1.5} castShadow />
      <spotLight
        position={[-10, 5, 5]}
        intensity={5}
        color="#bad7ff"
        angle={0.5}
      />

      {/* Neural Background - responds to mouse */}
      <NeuralNetwork count={200} color="#6366f1" />

      {/* Particle System Manager */}
      <ExhaustParticles scene={scene} />

      {/* Rocket with Original Logic */}
      <RocketLogic />

      {/* Depth Elements */}
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

// --- Scene Setup ---
export const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 18], fov: 50 }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};
