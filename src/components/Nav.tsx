import "./Nav.css";
import { NavLink } from "react-router-dom";

type IndexMaskState = "idle" | "opening" | "open" | "closing";

type NavProps = {
  isIndexMaskVisible: boolean;
  indexMaskState: IndexMaskState;
  indexMaskKey: number;
  onIndexClick: () => void;
  isInfoDisabled: boolean;
  onInfoClick: () => void;
};

function Nav({ isIndexMaskVisible, indexMaskState, indexMaskKey, onIndexClick, isInfoDisabled, onInfoClick }: NavProps) {
  return (
      <nav className={`nav-bar${isIndexMaskVisible ? " is-index-mask-visible" : ""}`}>
        <div className="nav-layer nav-layer-base">
          <NavLink to="/" className="nav-item">Eunice Yeeun Kim</NavLink>
          <button className="nav-item-middle nav-button" type="button" onClick={onIndexClick}>Index</button>
          <button className="nav-item nav-button" type="button" disabled={isInfoDisabled} onClick={onInfoClick}>Info</button>
        </div>
        {isIndexMaskVisible && (
          <div className={`nav-layer nav-layer-mask is-index-mask-${indexMaskState}`} key={`nav-mask-${indexMaskKey}`} aria-hidden="true">
            <div className="nav-layer-mask-content">
              <NavLink to="/" className="nav-item">Eunice Yeeun Kim</NavLink>
              <button className="nav-item-middle nav-button" type="button" onClick={onIndexClick}>Index</button>
              <button className="nav-item nav-button" type="button" disabled={isInfoDisabled} onClick={onInfoClick}>Info</button>
            </div>
          </div>
        )}
      </nav>
  );
}

export default Nav;
