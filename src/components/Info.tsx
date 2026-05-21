import "./Info.css";

const infoParagraphs = [
  ["Hi! I'm an interdisciplinary designer who enjoys experimenting with video, code, and other digital and tactile mediums. I'm particularly interested in exploring the presence of empathy & the human condition in our digital experiences and interactions."],
  "This site is a collection of some of my studies and creative impulses.",
  ["Other than making things, I like climbing rocks,", "sitting in the sun & learning foreign languages."]
];

type InfoProps = {
  isIndexMaskVisible: boolean;
  isVisible: boolean;
  shouldAnimate: boolean;
  onInitialRevealEnd: () => void;
};

function Info({ isIndexMaskVisible, isVisible, shouldAnimate, onInitialRevealEnd }: InfoProps) {
  const paragraphPause = 0.7;
  const sentencePause = 0.25;
  const totalCharacterCount = infoParagraphs.reduce((total, paragraph) => {
    const lines = Array.isArray(paragraph) ? paragraph : [paragraph];

    return total + lines.reduce((lineTotal, line) => lineTotal + Array.from(line).length, 0);
  }, 0);

  const renderInfoText = () => {
    let characterIndex = 0;
    let sentencePauseCount = 0;

    return infoParagraphs.map((paragraph, paragraphIndex) => (
      <p key={Array.isArray(paragraph) ? paragraph.join(" ") : paragraph}>
        {(Array.isArray(paragraph) ? paragraph : [paragraph]).map((line, lineIndex) => (
          <span className="info-line" key={line}>
            {lineIndex > 0 && <br />}
            {Array.from(line).map((character) => {
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
          </span>
        ))}
      </p>
    ));
  };

  return (
      <div id="info-container" className={`${isVisible ? "is-visible" : ""}${isIndexMaskVisible ? " is-index-mask-visible" : ""}`}>
        <div className={`info-content info-content-base${shouldAnimate ? " is-animated" : ""}`} aria-live="polite">
          {renderInfoText()}
        </div>
      </div>
  );
}

export default Info;
