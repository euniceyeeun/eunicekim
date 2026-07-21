import "./Info.css";

const infoParagraphs = [
  "I am an interdisciplinary designer who enjoys experimenting with video, code, and other digital and tactile mediums. I'm particularly interested in exploring the presence of empathy & the human condition in our virtual experiences and interactions.",
  "This site is a collection of some of my creative studies and impulses.",
  "Other than making things, I like climbing rocks, sitting in the sun & learning foreign languages."
];

type InfoProps = {
  isIndexMaskVisible: boolean;
  isVisible: boolean;
  shouldAnimate: boolean;
  shouldPauseAnimation: boolean;
  onInitialRevealEnd: () => void;
};

function Info({ isIndexMaskVisible, isVisible, shouldAnimate, shouldPauseAnimation, onInitialRevealEnd }: InfoProps) {
  const paragraphPause = 0.7;
  const sentencePause = 0.25;
  const totalCharacterCount = infoParagraphs.reduce((total, paragraph) => total + Array.from(paragraph).length, 0);

  const renderInfoText = () => {
    let characterIndex = 0;
    let sentencePauseCount = 0;

    return infoParagraphs.map((paragraph, paragraphIndex) => (
      <p key={paragraph}>
        {Array.from(paragraph).map((character) => {
          const delay = characterIndex * 0.025 + paragraphIndex * paragraphPause + sentencePauseCount * sentencePause;
          const isLastCharacter = characterIndex === totalCharacterCount - 1;
          characterIndex += 1;
          if (/[.!?]/.test(character)) {
            sentencePauseCount += 1;
          }

          return (
            <span
              className="info-character"
              key={`${character}-${characterIndex}`}
              style={{ "--character-delay": `${delay}s` } as React.CSSProperties}
              onAnimationEnd={isLastCharacter ? onInitialRevealEnd : undefined}
            >
              {character}
            </span>
          );
        })}
      </p>
    ));
  };

  return (
      <div id="info-container" className={`${isVisible ? "is-visible" : ""}${isIndexMaskVisible ? " is-index-mask-visible" : ""}`}>
        <div className={`info-content info-content-base${shouldAnimate ? " is-animated" : ""}${shouldPauseAnimation ? " is-animation-paused" : ""}`} aria-live="polite">
          {renderInfoText()}
        </div>
      </div>
  );
}

export default Info;
