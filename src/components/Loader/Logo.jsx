import { angleToRadians } from "../../helpers/angleToRadians";
import React, { useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

export default function Logo({ rotation, loading }) {
  const modelTimeline = gsap.timeline({ repeat: 0, repeatDelay: 1 });
  const { nodes, materials } = useGLTF("/logo.gltf");
  const logoModel = useRef();

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
          y: angleToRadians(-120),
          duration: 2,
          ease: "Power2.easeInOut",
          onComplete: foo,
        },
        "-=2"
      );
    }
  }, [loading]);

  function foo() {
    gsap.to(logoModel.current.position, {
      x: 6,
      y: 2,
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "+=250px",
        scrub: 1,
      },
    });
    gsap.fromTo(
      logoModel.current.position,
      { x: 6, y: 2 },
      {
        x: 2,
        y: 0,
        z: 2.5,
        scrollTrigger: {
          trigger: ".feedback",
          start: "bottom bottom",
          end: "+=150px",
          scrub: 1,
        },
      }
    );
  }

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
