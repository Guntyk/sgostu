import "./Input.css";

export default function Input({
  labelText,
  placeholderText,
  inputClassName,
  labelClassName,
  type,
  textarea,
  ...props
}) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="form-control">
      <Tag
        {...props}
        className={`input ${inputClassName || ""}`}
        type={type || "text"}
        placeholder={placeholderText || ""}
      />
      <label className={`label ${labelClassName || ""}`}>{labelText}</label>
    </div>
  );
}
