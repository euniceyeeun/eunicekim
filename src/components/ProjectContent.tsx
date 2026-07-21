import { useEffect, useRef } from "react";
import "./ProjectContent.css";
import type { Project } from "../data/projects";

type ProjectContentProps = {
  project: Project | null;
  isVisible: boolean;
};

function ProjectContent({ project, isVisible }: ProjectContentProps) {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [project?.id]);

  const renderTextBlock = (block: Extract<Project["content"][number], { type: "text" }>) => {
    if (!block.link) {
      return block.text;
    }

    const [beforeLink, afterLink] = block.text.split(block.link.text);

    return (
      <>
        {beforeLink}
        <a href={block.link.href} target="_blank" rel="noreferrer">
          {block.link.text}
        </a>
        {afterLink}
      </>
    );
  };

  return (
    <section ref={contentRef} className={`project-content${isVisible && project ? " is-visible" : ""}`} aria-live="polite">
      {project && (
        <div className="project-content-inner">
          {project.content.map((block, blockIndex) => {
            if (block.type === "text") {
              return <p key={`${project.id}-text-${blockIndex}`}>{renderTextBlock(block)}</p>;
            }

            if (block.type === "video") {
              return (
                <figure className={`project-content-media project-content-media-${block.size ?? "wide"}`} key={`${project.id}-video-${blockIndex}`}>
                  <video src={block.src} autoPlay loop muted playsInline preload="metadata" />
                </figure>
              );
            }

            return (
              <figure className={`project-content-media project-content-media-${block.size ?? "wide"}`} key={`${project.id}-image-${blockIndex}`}>
                {block.src ? <img src={block.src} alt={block.alt ?? ""} /> : null}
              </figure>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ProjectContent;
