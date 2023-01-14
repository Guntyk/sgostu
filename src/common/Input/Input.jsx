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
  const inputClassNames = "input " + inputClassName || "";
  const labelClassNames = "label " + labelClassName || "";
  return (
    <label className={labelClassNames}>
      {labelText}
      <Tag
        {...props}
        className={inputClassNames}
        type={type || "text"}
        placeholder={placeholderText || ""}
      />
    </label>
  );
}
