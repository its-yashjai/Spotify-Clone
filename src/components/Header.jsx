import { MdChevronLeft, MdChevronRight, MdNotifications, MdPerson } from "react-icons/md";
import "./Header.css";

export default function Header({ scrolled }) {
  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="header__nav">
        <button className="header__nav-btn" aria-label="Go back">
          <MdChevronLeft size={28} />
        </button>
        <button className="header__nav-btn" aria-label="Go forward">
          <MdChevronRight size={28} />
        </button>
      </div>

      <div className="header__right">
        <button className="header__action-btn">
          <MdNotifications size={20} />
        </button>
        <button className="header__upgrade-btn">Explore Premium</button>
        <button className="header__user-btn">
          <div className="header__user-avatar">
            <MdPerson size={20} />
          </div>
          <span>User</span>
        </button>
      </div>
    </header>
  );
}
