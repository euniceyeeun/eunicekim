import "./Nav.css";
import type { Project } from "../data/projects";

type IndexMaskState = "idle" | "opening" | "open" | "closing";

type NavProps = {
  isIndexMaskVisible: boolean;
  indexMaskState: IndexMaskState;
  indexMaskKey: number;
  projects: Project[];
  selectedProjectIndex: number | null;
  onSelectProject: (projectIndex: number) => void;
  onIndexClick: () => void;
  isInfoDisabled: boolean;
  onInfoClick: () => void;
};

function Nav({
  isIndexMaskVisible,
  indexMaskState,
  indexMaskKey,
  projects,
  selectedProjectIndex,
  onSelectProject,
  onIndexClick,
  isInfoDisabled,
  onInfoClick,
}: NavProps) {
  const isIndexOpen = indexMaskState === "open";

  const renderHomeButton = () => (
    <button className="nav-item nav-button" type="button" disabled={!isIndexOpen} onClick={onIndexClick}>
      Eunice Yeeun Kim
    </button>
  );

  const renderIndexGroup = () => (
    <div className="nav-index-group">
      <button className="nav-button" type="button" disabled={isIndexOpen} onClick={onIndexClick}>Index</button>
      <ol className="project-index-list" aria-label="Projects">
        {projects.map((project, projectIndex) => (
          <li key={project.id} className={projectIndex === selectedProjectIndex ? "is-active" : ""}>
            <button type="button" onClick={() => onSelectProject(projectIndex)}>
              {project.label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
      <nav className={`nav-bar${isIndexMaskVisible ? ` is-index-mask-visible is-index-mask-${indexMaskState}` : ""}`}>
        <div className="nav-layer nav-layer-base">
          {renderHomeButton()}
          {renderIndexGroup()}
          <button className="nav-item nav-button" type="button" disabled={isInfoDisabled} onClick={onInfoClick}>Info</button>
        </div>
        {isIndexMaskVisible && (
          <div className={`nav-layer-mask is-index-mask-${indexMaskState}`} key={`nav-mask-${indexMaskKey}`} aria-hidden="true">
            <div className="nav-layer-mask-content">
              {renderHomeButton()}
              {renderIndexGroup()}
              <button className="nav-item nav-button" type="button" disabled={isInfoDisabled} onClick={onInfoClick}>Info</button>
            </div>
          </div>
        )}
      </nav>
  );
}

export default Nav;
