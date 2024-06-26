import "../styles/desktop.scss";
import "../styles/mobile.scss";
import { useIsMobile } from "../../../hooks/useIsMobile";

const Spheres = () => {
  const isMobile: boolean = useIsMobile();
  return (
    <div className="spheres-container">
      <div className="sphere1" />
      <div className="sphere2" />
      <div className="sphere3" />
      <div className="sphere4" />
      <div className="sphere5" />
      <div className="sphere6" />
    </div>
  );
};

export default Spheres;
