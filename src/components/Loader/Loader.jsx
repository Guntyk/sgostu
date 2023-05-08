import "./Loader.css";

export default function Loader({ className }) {
  const language = window.localStorage.getItem("language");
  return (
    <div className={`loader-sec ${className}`}>
      <div className="loader-wrapper">
        <span className="text">{language === "en" ? "SG" : "СГ"}</span>
        <span className="text">{language === "en" ? "STU" : "СТУ"}</span>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}
