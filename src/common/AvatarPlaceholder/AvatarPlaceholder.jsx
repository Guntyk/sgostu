import "./AvatarPlaceholder.css";

export default function AvatarPlaceholder({ className }) {
  return (
    <svg className={`avatar-svg ${className}`}>
      <circle cx="50%" cy="50%" r="50%" fill="#eee" />
      <circle cx="50%" cy="40%" r="20%" fill="#fff" stroke="#ccc" />
      <circle cx="50%" cy="110%" r="40%" fill="#fff" stroke="#ccc" />
    </svg>
  );
}
