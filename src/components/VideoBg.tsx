import "./VideoBg.css";
import type { Project } from "../data/projects";

type IndexMaskState = "idle" | "opening" | "open" | "closing";

type VideoBgProps = {
  indexMaskState: IndexMaskState;
  backgroundVideoSrc: string;
  selectedProject: Project | null;
  isIndexContentVisible: boolean;
  onIndexMaskAnimationEnd: () => void;
};

function VideoBg({
  indexMaskState,
  backgroundVideoSrc,
  selectedProject,
  isIndexContentVisible,
  onIndexMaskAnimationEnd,
}: VideoBgProps) {
  const isIndexMaskVisible = indexMaskState !== "idle";
  const isIndexImageVisible = indexMaskState === "open";
  const shouldShowIndexImage = Boolean(selectedProject?.indexImageSrc && isIndexImageVisible && isIndexContentVisible);

  return (
    <div id="video-bg" className={isIndexMaskVisible ? `is-index-mask-visible is-index-mask-${indexMaskState}` : ""}>
      <div id="video-mask" onAnimationEnd={onIndexMaskAnimationEnd}>
        <div id="project-index-link">
          {backgroundVideoSrc && (
            <video id="home-bg-video" autoPlay muted loop playsInline>
              <source src={backgroundVideoSrc} type="video/mp4" />
            </video>
          )}
          {selectedProject?.indexImageSrc && (
            <img className={shouldShowIndexImage ? "is-visible" : ""} src={selectedProject.indexImageSrc} alt="" />
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoBg;
