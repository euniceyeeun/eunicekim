import { useEffect, useRef, useState } from "react";
import "./VideoBg.css";
import type { Project } from "../data/projects";

type IndexMaskState = "idle" | "opening" | "open" | "closing";

const INDEX_PAUSE_TIME_SECONDS = 2.5;

type VideoBgProps = {
  indexMaskKey: number;
  indexMaskState: IndexMaskState;
  projects: Project[];
  selectedProject: Project;
  selectedProjectIndex: number;
  onPreviousProject: () => void;
  onNextProject: () => void;
  onIndexClick: () => void;
  onIndexMaskAnimationEnd: () => void;
};

function VideoBg({
  indexMaskKey,
  indexMaskState,
  projects,
  selectedProject,
  selectedProjectIndex,
  onPreviousProject,
  onNextProject,
  onIndexClick,
  onIndexMaskAnimationEnd,
}: VideoBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [indexImageVisibleKey, setIndexImageVisibleKey] = useState(0);
  const isIndexMaskVisible = indexMaskState !== "idle";
  const isIndexImageVisible = indexMaskState === "open" || (indexMaskState === "opening" && indexImageVisibleKey === indexMaskKey);
  const shouldShowIndexImage = Boolean(selectedProject.indexImageSrc && !selectedProject.usePausedVideoPreview && isIndexImageVisible);
  const backgroundVideoSrc = projects.find((project) => project.backgroundVideoSrc)?.backgroundVideoSrc;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playVideo = () => {
      void video.play().catch(() => {
        // Autoplay can be interrupted by the browser while React is updating state.
      });
    };

    const pauseAtIndexFrame = () => {
      if (video.currentTime >= INDEX_PAUSE_TIME_SECONDS) {
        video.pause();
        video.currentTime = INDEX_PAUSE_TIME_SECONDS;
        setIndexImageVisibleKey(indexMaskKey);
        return;
      }

      animationFrameId = window.requestAnimationFrame(pauseAtIndexFrame);
    };

    let animationFrameId = 0;

    if (indexMaskState === "open") {
      video.pause();
      video.currentTime = INDEX_PAUSE_TIME_SECONDS;
    } else if (indexMaskState === "opening") {
      if (video.currentTime >= INDEX_PAUSE_TIME_SECONDS) {
        video.currentTime = 0;
      }

      playVideo();
      animationFrameId = window.requestAnimationFrame(pauseAtIndexFrame);
    } else {
      playVideo();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [indexMaskKey, indexMaskState]);

  return (
    <div id="video-bg" className={isIndexMaskVisible ? `is-index-mask-visible is-index-mask-${indexMaskState}` : ""}>
      <div id="index-controls" key={`index-controls-${indexMaskKey}`}>
        <button className="index-label index-label-left" type="button" onClick={onPreviousProject}>Left</button>
        <button className="index-label index-label-right" type="button" onClick={onNextProject}>Right</button>
        <div id="project-index-meta">
          <div id="project-index-label">{selectedProject.label}</div>
          <ol id="project-index-count" aria-label="Projects">
            {projects.map((project, projectIndex) => (
              <li key={project.id} className={projectIndex === selectedProjectIndex ? "is-active" : ""}>
                {projectIndex + 1}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div id="video-mask" onAnimationEnd={onIndexMaskAnimationEnd}>
        <button id="project-index-link" type="button" onClick={onIndexClick} aria-label="Return to home video">
          {backgroundVideoSrc && (
            <video id="home-bg-video" ref={videoRef} autoPlay muted loop playsInline>
              <source src={backgroundVideoSrc} type="video/mp4" />
            </video>
          )}
          {selectedProject.indexImageSrc && (
            <img className={shouldShowIndexImage ? "is-visible" : ""} src={selectedProject.indexImageSrc} alt="" />
          )}
        </button>
      </div>
    </div>
  );
}

export default VideoBg;
