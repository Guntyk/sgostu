import { angleToRadians } from "../../helpers/angleToRadians";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
// import Logo from "./Logo";
import gsap from "gsap";
import "./Loader.css";

export default function Loader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  useEffect(() => {
    if (loading) {
      const loadingTimeline = gsap.timeline({ repeat: 0, repeatDelay: 1 });
      loadingTimeline.to("#loadingInfo", {
        opacity: 1,
        delay: 2,
      });
      loadingTimeline.to(
        "#loadingThumb",
        {
          width: 130,
          duration: 3,
          delay: 2,
        },
        "-=2"
      );
      loadingTimeline.to("#loadingInfo", {
        opacity: 0,
      });
      loadingTimeline.to(
        ".loader",
        {
          background: "transparent",
          zIndex: 0,
        },
        "+=1"
      );
      loadingTimeline.to(
        ".title-stroke",
        {
          y: 0,
          duration: 0.55,
        },
        "+=0.25"
      );
    }
  }, [loading]);

  return (
    <>
      <div className="loader">
        <Canvas className="canvas">
          <PerspectiveCamera position={[0, 0, 0]} />
          {/* <OrbitControls /> */}
          <ambientLight intensity={0.5} position={[0, 0, 3]} />
          <directionalLight position={[-2, 3, 2]} intensity={0.5} />
          <Suspense>
            {/* <Logo rotation={[0, angleToRadians(90), 0]} loading={loading} /> */}
          </Suspense>
        </Canvas>
        <div
          className={`loading-info ${loading ? "active" : ""}`}
          id="loadingInfo"
        >
          <span className="loading-text">Завантаження</span>
          <span className="loading-background">
            <span
              className={`loading-thumb ${loading ? "active" : ""}`}
              id="loadingThumb"
            ></span>
          </span>
        </div>
      </div>
    </>
  );
}
