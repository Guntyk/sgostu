import { angleToRadians } from "../../helpers/angleToRadians";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

export default function Logo({ rotation, loading }) {
  const { nodes, materials } = useGLTF("/logo.gltf");
  const logoModel = useRef();
  const modelTimeline = gsap.timeline({ repeat: 0, repeatDelay: 1 });

  useEffect(() => {
    if (loading) {
      modelTimeline.to(logoModel.current.position, {
        y: 0.5,
        duration: 2,
        ease: "Power2.easeOut",
      });
      modelTimeline.to(
        logoModel.current.rotation,
        {
          y: angleToRadians(270),
          duration: 2,
          ease: "Power2.easeOut",
        },
        "-=2"
      );
      modelTimeline.to(
        logoModel.current.position,
        {
          x: 2,
          y: 0,
          z: 2.5,
          duration: 2,
          ease: "Power2.easeInOut",
        },
        "+=4"
      );
      modelTimeline.to(
        logoModel.current.rotation,
        {
          y: angleToRadians(600),
          duration: 2,
          ease: "Power2.easeInOut",
        },
        "-=2"
      );
    }
  }, [loading]);

  return (
    <>
      <group
        ref={logoModel}
        rotation={rotation}
        dispose={null}
        position={[0, -5, 0]}
      >
        <mesh
          geometry={nodes.Curve003.geometry}
          material={materials["SVGMat.003"]}
          position={[0.05, -0.99, 0.98]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={17.29}
        />
        <mesh
          className="bg"
          geometry={nodes.Cylinder002.geometry}
          position={[-0.04, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.77, 0.05, 0.77]}
        >
          <meshLambertMaterial color={"#ffff00"} />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/logo.gltf");
