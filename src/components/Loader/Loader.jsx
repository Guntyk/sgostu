import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-sec">
      <div className="loader-wrapper">
        <span className="text">СГ</span>
        <span className="text">СТУ</span>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}
