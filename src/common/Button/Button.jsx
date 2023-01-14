import "./Button.css";

export default function Button({ className, buttonText, type, ...props }) {
  const buttonClass = "btn " + className || "";
  return (
    <button className={buttonClass} type={type || "button"} {...props}>
      {buttonText}
    </button>
  );
}
