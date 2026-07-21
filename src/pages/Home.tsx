import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import VideoBg from "../components/VideoBg"
import Info from "../components/Info"
import ProjectContent from "../components/ProjectContent";
import { homeBackgroundVideoSrc, projects } from "../data/projects";
import "./Home.css";

type IndexMaskState = "idle" | "opening" | "open" | "closing";
const INFO_FADE_DURATION_MS = 200;
const PROJECT_FADE_DURATION_MS = 200;

function Home() {
    const navigate = useNavigate();
    const { projectSlug } = useParams();
    const routeProjectIndex = projectSlug ? projects.findIndex((project) => project.slug === projectSlug) : -1;
    const selectedProjectIndex = routeProjectIndex === -1 ? null : routeProjectIndex;
    const selectedProject = selectedProjectIndex === null ? null : projects[selectedProjectIndex];
    const [pendingProjectIndex, setPendingProjectIndex] = useState<number | null>(null);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [hasOpenedInfo, setHasOpenedInfo] = useState(false);
    const [shouldAnimateInfo, setShouldAnimateInfo] = useState(false);
    const [shouldPauseInfoAnimation, setShouldPauseInfoAnimation] = useState(false);
    const [isInfoRevealInProgress, setIsInfoRevealInProgress] = useState(false);
    const [isInfoTransitionPending, setIsInfoTransitionPending] = useState(false);
    const [indexMaskKey, setIndexMaskKey] = useState(0);
    const [indexMaskState, setIndexMaskState] = useState<IndexMaskState>(selectedProject ? "open" : "idle");
    const [isIndexTransitionPending, setIsIndexTransitionPending] = useState(false);
    const [isProjectTransitionPending, setIsProjectTransitionPending] = useState(false);
    const [isProjectContentVisible, setIsProjectContentVisible] = useState(Boolean(selectedProject));
    const indexTransitionTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (indexTransitionTimeoutRef.current !== null) {
                window.clearTimeout(indexTransitionTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (projectSlug && routeProjectIndex === -1) {
            navigate("/", { replace: true });
        }
    }, [navigate, projectSlug, routeProjectIndex]);

    const fadeOutInfo = (onFadeEnd?: () => void) => {
        const shouldPreservePartialReveal = isInfoRevealInProgress && shouldAnimateInfo;

        setIsInfoVisible(false);
        setIsInfoRevealInProgress(false);

        if (shouldPreservePartialReveal) {
            setShouldPauseInfoAnimation(true);
        } else {
            setShouldAnimateInfo(false);
        }

        indexTransitionTimeoutRef.current = window.setTimeout(() => {
            setShouldAnimateInfo(false);
            setShouldPauseInfoAnimation(false);
            onFadeEnd?.();
            indexTransitionTimeoutRef.current = null;
        }, INFO_FADE_DURATION_MS);
    };

    const toggleInfo = () => {
        if (isInfoRevealInProgress || isInfoTransitionPending) {
            return;
        }

        const showInfo = () => {
            setIsInfoVisible(true);
            setShouldAnimateInfo(!hasOpenedInfo);
            setShouldPauseInfoAnimation(false);

            if (!hasOpenedInfo) {
                setHasOpenedInfo(true);
                setIsInfoRevealInProgress(true);
            }
        };

        if (!isInfoVisible && isProjectContentVisible) {
            setIsProjectContentVisible(false);
            setIsInfoTransitionPending(true);
            indexTransitionTimeoutRef.current = window.setTimeout(() => {
                showInfo();
                setIsInfoTransitionPending(false);
                indexTransitionTimeoutRef.current = null;
            }, INFO_FADE_DURATION_MS);
            return;
        }

        if (!isInfoVisible) {
            showInfo();
            return;
        }

        fadeOutInfo();
    };

    const startIndexOpening = () => {
        if (selectedProjectIndex === null) {
            setPendingProjectIndex(0);
            navigate(`/${projects[0].slug}`);
            setIsProjectContentVisible(true);
        }

        setIndexMaskKey((currentKey) => currentKey + 1);
        setIndexMaskState("opening");
    };

    const startIndexClosing = () => {
        setIsProjectContentVisible(false);
        navigate("/");
        setIndexMaskKey((currentKey) => currentKey + 1);
        setIndexMaskState("closing");
    };

    const fadeOutInfoBeforeIndexTransition = (startTransition: () => void) => {
        setIsIndexTransitionPending(true);
        fadeOutInfo(() => {
            startTransition();
            setIsIndexTransitionPending(false);
        });
    };

    const toggleIndex = () => {
        if (isIndexTransitionPending) {
            return;
        }

        if (isInfoTransitionPending) {
            if (indexTransitionTimeoutRef.current !== null) {
                window.clearTimeout(indexTransitionTimeoutRef.current);
                indexTransitionTimeoutRef.current = null;
            }

            setIsInfoTransitionPending(false);
            setShouldAnimateInfo(false);
            setShouldPauseInfoAnimation(false);
            setIsProjectContentVisible(Boolean(selectedProject));
            return;
        }

        if (indexMaskState === "idle" || indexMaskState === "closing") {
            if (isInfoVisible) {
                fadeOutInfoBeforeIndexTransition(startIndexOpening);
                return;
            }

            startIndexOpening();
            return;
        }

        if (isInfoVisible) {
            fadeOutInfo(() => setIsProjectContentVisible(Boolean(selectedProject)));
            return;
        }

        startIndexClosing();
    };

    const showProjectContent = (projectIndex: number) => {
        navigate(`/${projects[projectIndex].slug}`);
        setPendingProjectIndex(null);
        setIsProjectContentVisible(false);

        window.requestAnimationFrame(() => {
            setIsProjectContentVisible(true);
        });
    };

    const selectProject = (projectIndex: number) => {
        if (isProjectTransitionPending) {
            return;
        }

        // Update the index immediately so the outgoing project's label never
        // becomes active while Info fades away.
        setPendingProjectIndex(projectIndex);

        if (isInfoVisible) {
            setIsProjectContentVisible(false);
            fadeOutInfo(() => showProjectContent(projectIndex));
            return;
        }

        if (projectIndex === selectedProjectIndex) {
            return;
        }

        if (isProjectContentVisible) {
            setIsProjectTransitionPending(true);
            setIsProjectContentVisible(false);
            indexTransitionTimeoutRef.current = window.setTimeout(() => {
                showProjectContent(projectIndex);
                setIsProjectTransitionPending(false);
                indexTransitionTimeoutRef.current = null;
            }, PROJECT_FADE_DURATION_MS);
            return;
        }

        showProjectContent(projectIndex);
    };

    return (
        <>
        <VideoBg
        indexMaskState={indexMaskState}
        backgroundVideoSrc={homeBackgroundVideoSrc}
        selectedProject={selectedProject}
        isIndexContentVisible={isProjectContentVisible}
        onIndexMaskAnimationEnd={() => {
            setIndexMaskState((currentState) => currentState === "opening" ? "open" : "idle");
        }}
    />
    <div id="home-container">
        <Nav
            isIndexMaskVisible={indexMaskState !== "idle"}
            indexMaskState={indexMaskState}
            indexMaskKey={indexMaskKey}
            projects={projects}
            selectedProjectIndex={pendingProjectIndex ?? selectedProjectIndex}
            isInfoActive={isInfoVisible || isInfoTransitionPending}
            onSelectProject={selectProject}
            onIndexClick={toggleIndex}
            isInfoDisabled={isInfoRevealInProgress || isInfoTransitionPending}
            onInfoClick={toggleInfo}
        />
        <Info
            isIndexMaskVisible={indexMaskState === "opening" || indexMaskState === "open"}
            isVisible={isInfoVisible}
            shouldAnimate={shouldAnimateInfo}
            shouldPauseAnimation={shouldPauseInfoAnimation}
            onInitialRevealEnd={() => {
                setIsInfoRevealInProgress(false);
                setShouldAnimateInfo(false);
                setShouldPauseInfoAnimation(false);
            }}
        />
        <ProjectContent project={selectedProject} isVisible={isProjectContentVisible && indexMaskState === "open"} />
    </div>
    </>
    )
}

export default Home;
