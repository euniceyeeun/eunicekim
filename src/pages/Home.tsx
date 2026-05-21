import { useState } from "react";
import Nav from "../components/Nav";
import VideoBg from "../components/VideoBg"
import Info from "../components/Info"
import { projects } from "../data/projects";
import "./Home.css";

type IndexMaskState = "idle" | "opening" | "open" | "closing";

function Home() {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [hasOpenedInfo, setHasOpenedInfo] = useState(false);
    const [shouldAnimateInfo, setShouldAnimateInfo] = useState(false);
    const [isInfoRevealInProgress, setIsInfoRevealInProgress] = useState(false);
    const [indexMaskKey, setIndexMaskKey] = useState(0);
    const [indexMaskState, setIndexMaskState] = useState<IndexMaskState>("idle");
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    const toggleInfo = () => {
        if (isInfoRevealInProgress) {
            return;
        }

        if (!hasOpenedInfo) {
            setIsInfoVisible(true);
            setHasOpenedInfo(true);
            setShouldAnimateInfo(true);
            setIsInfoRevealInProgress(true);
            return;
        }

        setIsInfoVisible((currentVisibility) => !currentVisibility);
        setShouldAnimateInfo(false);
    };

    const toggleIndex = () => {
        if (indexMaskState === "idle" || indexMaskState === "closing") {
            setIndexMaskKey((currentKey) => currentKey + 1);
            setIndexMaskState("opening");
            return;
        }

        setIndexMaskKey((currentKey) => currentKey + 1);
        setIndexMaskState("closing");
    };

    const showPreviousProject = () => {
        setSelectedProjectIndex((currentIndex) => (currentIndex - 1 + projects.length) % projects.length);
    };

    const showNextProject = () => {
        setSelectedProjectIndex((currentIndex) => (currentIndex + 1) % projects.length);
    };

    const selectedProject = projects[selectedProjectIndex];

    return (
        <>
    <VideoBg
        indexMaskKey={indexMaskKey}
        indexMaskState={indexMaskState}
        projects={projects}
        selectedProject={selectedProject}
        selectedProjectIndex={selectedProjectIndex}
        onPreviousProject={showPreviousProject}
        onNextProject={showNextProject}
        onIndexClick={toggleIndex}
        onIndexMaskAnimationEnd={() => {
            setIndexMaskState((currentState) => currentState === "opening" ? "open" : "idle");
        }}
    />
    <div id="home-container">
        <Nav
            isIndexMaskVisible={indexMaskState !== "idle"}
            indexMaskState={indexMaskState}
            indexMaskKey={indexMaskKey}
            onIndexClick={toggleIndex}
            isInfoDisabled={isInfoRevealInProgress}
            onInfoClick={toggleInfo}
        />
        <Info
            isIndexMaskVisible={indexMaskState === "opening" || indexMaskState === "open"}
            isVisible={isInfoVisible}
            shouldAnimate={shouldAnimateInfo}
            onInitialRevealEnd={() => {
                setIsInfoRevealInProgress(false);
                setShouldAnimateInfo(false);
            }}
        />
    </div>
    </>
    )
}

export default Home;
