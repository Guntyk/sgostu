import "./Select.css";

export default function Select({ name, classNames, defaultValue }) {
  return (
    <select
      className={`select ${classNames}`}
      name={name}
      defaultValue={defaultValue}
    ></select>
  );
}
